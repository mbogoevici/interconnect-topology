package com.redhat.fuse.interconnect.partner.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.camel.CamelContext;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.jms.JmsComponent;
import org.apache.camel.model.rest.RestBindingMode;
import org.apache.qpid.jms.JmsConnectionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@SpringBootApplication
@RestController
public class ClientApplication {

    List<AccountNotification> notificationsRegion1 = new CopyOnWriteArrayList<>();
    List<AccountNotification> notificationsGlobalRegion1 = new CopyOnWriteArrayList<>();
    List<AccountNotification> notificationsRegion2 = new CopyOnWriteArrayList<>();
    List<AccountNotification> notificationsGlobalRegion2 = new CopyOnWriteArrayList<>();


    @Value("${connect.url.region1:localhost}")
    String urlRegion1;

    @Value("${connect.url.region2:localhost}")
    String urlRegion2;

    @Value("${notifications.local.consume.address}")
    String notificationsReceiveLocalAddress;

    @Value("${notifications.global.consume.address}")
    String notificationsReceiveGlobalAddress;

    @Value("${commands.local.publish.address}")
    String commandLocalPublishAddress;

    @Value("${commands.global.publish.address}")
    String commandGlobalPublishAddress;

    private SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);

    @GetMapping("/eventStream")
    @ResponseBody SseEmitter eventStream() {
        return sseEmitter;
    }


    @Bean
    public JmsComponent nam(CamelContext camelContext) {
        JmsConnectionFactory jmsConnectionFactory = new JmsConnectionFactory();
        jmsConnectionFactory.setRemoteURI(urlRegion1);
        JmsComponent jmsComponent = new JmsComponent(camelContext);
        jmsComponent.setConnectionFactory(jmsConnectionFactory);
        return jmsComponent;
    }

    @Bean
    public JmsComponent apac(CamelContext camelContext) {
        JmsConnectionFactory jmsConnectionFactory = new JmsConnectionFactory();
        jmsConnectionFactory.setRemoteURI(urlRegion2);
        JmsComponent jmsComponent = new JmsComponent(camelContext);
        jmsComponent.setConnectionFactory(jmsConnectionFactory);
        return jmsComponent;
    }

    @Bean
    public RouteBuilder routeBuilder() {
        return new RouteBuilder() {
            @Override
            public void configure() throws Exception {



                from("nam:topic:acme/account/notifications/local")
                        .log("Local NAM: ${in.body}")
                        .process(new MyProcessor(notificationsRegion1, "acmeLocalNotification", sseEmitter));
                from("direct:commands-publish-region-1").to("nam:topic:acme/account/commands/local");
                from("direct:commands-publish-global-region-1").to("nam:topic:acme/account/commands/local");

                // Region 2
                from("apac:topic:ecomm/account/notifications/local")
                        .log("Local APAC: ${in.body}")
                        .process(new MyProcessor(notificationsRegion2, "ecommLocalNotification", sseEmitter));
                from("direct:commands-publish-region-2").to("apac:topic:ecomm/account/commands/local");
                from("direct:commands-publish-global-region-2").to("apac:topic:ecomm/account/commands/local");

                // Global
                from("nam:topic:acme/account/notifications/global")
                        .log("Global-Region1: ${in.body}")
                        .process(new MyProcessor(notificationsGlobalRegion1, "acmeNotification", sseEmitter));
                from("apac:topic:ecomm/account/notifications/global")
                        .log("Global-Region2: ${in.body}")
                        .process(new MyProcessor(notificationsGlobalRegion2, "ecommNotification", sseEmitter));


                routeBuilder()
                        .restConfiguration("servlet")
                        .bindingMode(RestBindingMode.auto);

                rest("/region1/commands")
                        .post("/local").route().inOnly("direct:commands-publish-region-1").endRest()
                        .post("/global").route().inOnly("direct:commands-publish-global-region-1").endRest();

                rest("/region2/commands")
                        .post("/local").route().inOnly("direct:commands-publish-region-2").endRest()
                        .post("/global").route().inOnly("direct:commands-publish-global-region-2").endRest();

                rest("/region1/notifications")
                        .get("/global").route().setBody().constant(notificationsGlobalRegion1).endRest()
                        .get("/local").route().setBody().constant(notificationsRegion1).endRest();

                rest("/region2/notifications")
                        .get("/global").route().setBody().constant(notificationsGlobalRegion2).endRest()
                        .get("/local").route().setBody().constant(notificationsRegion2).endRest();


            }
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(ClientApplication.class, args);
    }

    private static class MyProcessor implements Processor {

        private final List<AccountNotification> commands;

        private String eventName;

        private SseEmitter emitter;

        public MyProcessor(List<AccountNotification> commands, String eventName, SseEmitter emitter) {
            this.commands = commands;
            this.eventName = eventName;
            this.emitter = emitter;
        }

        @Override
        public void process(Exchange exchange) throws Exception {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountNotification command = objectMapper.readValue(exchange.getIn().getBody().toString(), AccountNotification.class);
            commands.add(command);
            emitter.send(SseEmitter.event().name(eventName).data(command.toString()));
        }
    }
}
