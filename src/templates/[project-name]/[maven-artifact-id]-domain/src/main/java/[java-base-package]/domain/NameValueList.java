package <%=data['java-base-package']%>.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class NameValueList implements Serializable, JsonSerializable {
	private static final long serialVersionUID = 1L;
	private List<NameValue> nameValues;

	public NameValueList() {
		this.nameValues = new ArrayList<>();
	}

	public NameValueList(NameValue nameValue) {
		this();
		this.nameValues.add(nameValue);
	}

	public String getValueOf(String name) {
		return getNameValue(name).getValue();
	}

	public NameValue getNameValue(String name) {
		return this.nameValues.stream().filter(nameValue -> name.equals(nameValue.getName())).findFirst().orElse(null);
	}

	public static NameValueList fromJson(String json) {
		return JsonUtil.fromJson(json, NameValueList.class);
	}
}
