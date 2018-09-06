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

import java.util.Collections;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@SpringBootApplication
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


    @Bean
    public JmsComponent region1(CamelContext camelContext) {
        JmsConnectionFactory jmsConnectionFactory = new JmsConnectionFactory();
        jmsConnectionFactory.setRemoteURI(urlRegion1);
        JmsComponent jmsComponent = new JmsComponent(camelContext);
        jmsComponent.setConnectionFactory(jmsConnectionFactory);
        return jmsComponent;
    }

    @Bean
    public JmsComponent region2(CamelContext camelContext) {
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

				from("direct:notifications-publish-region-1").to("region1:topic:" + notificationsPublishAddress);


                from("direct:notifications-publish-region-2").to("region2:topic:" + notificationsPublishAddress);

                from("region1:topic:" + commandReceiveAddress)
                        .log("${in.body}")
                        .process(new MyProcessor(commandsRegion1));

                from("region2:topic:" + commandReceiveAddress)
                        .log("${in.body}")
                        .process(new MyProcessor(commandsRegion2));

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

        public MyProcessor(List<AccountUpdateCommand> commands) {
            this.commands = commands;
        }

        @Override
        public void process(Exchange exchange) throws Exception {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountUpdateCommand command = objectMapper.readValue(exchange.getIn().getBody().toString(), AccountUpdateCommand.class);
            commands.add(command);
        }
    }
}
