package com.redhat.fuse.samples.interconnect.core;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.fuse.samples.interconnect.core.datamodels.canonical.AccountUpdateCommand;
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

import java.util.Collections;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@SpringBootApplication
@RestController
public class CoreComponentApplication {

	List<AccountUpdateCommand> commandsRegion1 = new CopyOnWriteArrayList<>();
	List<AccountUpdateCommand> commandsRegion2 = new CopyOnWriteArrayList<>();

    @Value("${connect.url.region1:localhost}")
    String urlRegion1;

    @Value("${connect.url.region2:localhost}")
    String urlRegion2;

    @Value("${notifications.publish.address}")
    String notificationsPublishAddress;

    @Value("${commands.consume.address}")
    String commandReceiveAddress;

    private SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);

    @GetMapping("/eventStream")
    @ResponseBody
    SseEmitter eventStream() {
        return sseEmitter;
    }


    @Bean
    public JmsComponent nam(CamelContext camelContext) {
        JmsConnectionFactory jmsConnectionFactory = new JmsConnectionFactory();
        jmsConnectionFactory.setRemoteURI(urlRegion1);
        jmsConnectionFactory.setReceiveLocalOnly(true);
        JmsComponent jmsComponent = new JmsComponent(camelContext);
        jmsComponent.setConnectionFactory(jmsConnectionFactory);
        return jmsComponent;
    }

    @Bean
    public JmsComponent apac(CamelContext camelContext) {
        JmsConnectionFactory jmsConnectionFactory = new JmsConnectionFactory();
        jmsConnectionFactory.setRemoteURI(urlRegion2);
        jmsConnectionFactory.setReceiveLocalOnly(true);
        JmsComponent jmsComponent = new JmsComponent(camelContext);
        jmsComponent.setConnectionFactory(jmsConnectionFactory);
        return jmsComponent;
    }

	@Bean
	public RouteBuilder routeBuilder() {
		return new RouteBuilder() {
			@Override
			public void configure() throws Exception {

				from("direct:notifications-publish-region-1").to("nam:topic:" + notificationsPublishAddress);

                from("direct:notifications-publish-region-2").to("apac:topic:" + notificationsPublishAddress);

                from("nam:topic:" + commandReceiveAddress)
                        .log("NAM: ${in.body}")
                        .process(new MyProcessor(commandsRegion1, "namCommand", sseEmitter));

                from("apac:topic:" + commandReceiveAddress)
                        .log("APAC ${in.body}")
                        .process(new MyProcessor(commandsRegion2, "apacCommand", sseEmitter));

				restConfiguration()
						.component("servlet")
						.bindingMode(RestBindingMode.auto);

				rest("/region1/commands")
                        .get().route().setBody().constant(commandsRegion1).endRest();

                rest("/region1/notifications")
                        .post().route().log("${in.body}").inOnly("direct:notifications-publish-region-1").endRest();

                rest("/region2/notifications")
                        .post().route().log("${in.body}").inOnly("direct:notifications-publish-region-2").endRest();

                rest("/region2/commands")
                        .get().route().setBody().constant(commandsRegion2).endRest();

			}
		};
	}


	public static void main(String[] args) {
		SpringApplication.run(CoreComponentApplication.class, args);
	}

    private static class MyProcessor implements Processor {

        private final List<AccountUpdateCommand> commands;

        private String eventName;

        private SseEmitter emitter;

        public MyProcessor(List<AccountUpdateCommand> commands, String eventName, SseEmitter emitter) {
            this.commands = commands;
            this.eventName = eventName;
            this.emitter = emitter;
        }

        @Override
        public void process(Exchange exchange) throws Exception {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountUpdateCommand command = objectMapper.readValue(exchange.getIn().getBody().toString(), AccountUpdateCommand.class);
            command.setConnection(exchange.getFromEndpoint().getEndpointUri());
            commands.add(command);
            emitter.send(SseEmitter.event().name(eventName).data(command.toString()));
        }
    }
}
