package <%=data['java-base-package']%>.domain;

import java.io.Serializable;

public class NameValue implements Serializable, JsonSerializable {
	private static final long serialVersionUID = 1L;
	private String name;
	private String value;

	public NameValue(String name, String value) {
		this.name = name;
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public static NameValue fromJson(String json) {
		return JsonUtil.fromJson(json, NameValue.class);
	}
}
