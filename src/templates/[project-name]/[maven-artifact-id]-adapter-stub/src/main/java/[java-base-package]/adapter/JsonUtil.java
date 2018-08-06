package <%=data['java-base-package']%>.adapter;

import java.lang.reflect.Type;

import com.fatboyindustrial.gsonjavatime.Converters;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class JsonUtil {

	private static Gson gson = Converters.registerZonedDateTime(new GsonBuilder()).setPrettyPrinting().create();
	public static String toJson(Object obj) {
		// TODO Auto-generated method stub
		return gson.toJson(obj);
	}

	public static <T> T fromJson(String json, Class<T> classOfT) {
		return gson.fromJson(json, classOfT);
	}

	public static <T> T fromJson(String json, Type typeOfT) {
		return gson.fromJson(json, typeOfT);
	}

}
