package <%=data['java-base-package']%>.domain;

public class KafkaMessage {
	private String topicExchange;
	private String routingKey;

	public KafkaMessage() {
	}

	public KafkaMessage(String topicExchange) {
		this.topicExchange = topicExchange;
	}

	public KafkaMessage(String topicExchange, String routingKey) {
		this.topicExchange = topicExchange;
		this.routingKey = routingKey;
	}

	public String getTopicExchange() {
		return topicExchange;
	}

	public String getRoutingKey() {
		return routingKey;
	}
}
