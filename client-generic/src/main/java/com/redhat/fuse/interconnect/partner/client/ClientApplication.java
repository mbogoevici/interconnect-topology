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

    List<AccountNotification> notificationsLocal = new CopyOnWriteArrayList<>();
    List<AccountNotification> notificationsGlobal = new CopyOnWriteArrayList<>();


    @Value("${connect.url:localhost}")
    String connectUrl;

    @Value("${partner.name}")
    String partnerName;

    @Value("${local.region}")
    String localRegion;

    @Value("${remote.region}")
    String remoteRegion;

    @Value("${notifications.local.consume.address}")
    String notificationsReceiveLocalAddress;

    @Value("${notifications.global.consume.address}")
    String notificationsReceiveGlobalAddress;

    @Value("${commands.local.publish.address}")
    String commandLocalPublishAddress;

    @Value("${commands.remote.publish.address}")
    String commandRemotePublishAddress;

    private SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);

    @GetMapping("/eventStream")
    @ResponseBody
    SseEmitter eventStream() {
        return sseEmitter;
    }


    @Bean
    public JmsComponent jms(CamelContext camelContext) {
        JmsConnectionFactory jmsConnectionFactory = new JmsConnectionFactory();
        jmsConnectionFactory.setRemoteURI(connectUrl);
        JmsComponent jmsComponent = new JmsComponent(camelContext);
        jmsComponent.setConnectionFactory(jmsConnectionFactory);
        return jmsComponent;
    }

    @Bean
    public RouteBuilder routeBuilder() {
        return new RouteBuilder() {
            @Override
            public void configure() throws Exception {

                from("jms:topic:" + notificationsReceiveLocalAddress)
                        .log("Local: ${in.body}")
                        .process(new MyProcessor(notificationsLocal, "localNotification", sseEmitter));
                from("direct:commands-publish-local").to("jms:topic:" + commandLocalPublishAddress);
                from("direct:commands-publish-remote").to("jms:topic:" + commandRemotePublishAddress);

                // Global
                from("jms:topic:" + notificationsReceiveGlobalAddress)
                        .log("Global: ${in.body}")
                        .process(new MyProcessor(notificationsGlobal, "globalNotification", sseEmitter));

                routeBuilder()
                        .restConfiguration("servlet")
                        .bindingMode(RestBindingMode.auto);

                rest("/commands")
                        .post("/local").route().inOnly("direct:commands-publish-local").endRest()
                        .post("/remote").route().inOnly("direct:commands-publish-remote").endRest();

                rest("/notifications")
                        .get("/global").route().setBody().constant(notificationsGlobal).endRest()
                        .get("/local").route().setBody().constant(notificationsLocal).endRest();

                rest("/metadata")
                        .get().route().setBody()
                        .constant(new Metadata(partnerName, connectUrl, localRegion, remoteRegion, notificationsReceiveLocalAddress, notificationsReceiveGlobalAddress, commandLocalPublishAddress, commandRemotePublishAddress))
                        .endRest();

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
            command.setConnection(exchange.getFromEndpoint().getEndpointUri());
            emitter.send(SseEmitter.event().name(eventName).data(command.toString()));
        }
    }
}
