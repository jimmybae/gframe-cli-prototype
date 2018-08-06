package <%=data['java-base-package']%>.domain;

public interface JsonSerializable {
	default String toJson() {
		return JsonUtil.toJson(this);
	}
}
