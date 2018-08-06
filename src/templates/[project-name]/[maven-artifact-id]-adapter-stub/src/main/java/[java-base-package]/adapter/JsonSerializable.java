package <%=data['java-base-package']%>.adapter;

public interface JsonSerializable {
	default String toJson() {
		return JsonUtil.toJson(this);
	}
}
