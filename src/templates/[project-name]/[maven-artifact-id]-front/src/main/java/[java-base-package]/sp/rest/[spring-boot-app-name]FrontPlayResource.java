package <%=data['java-base-package']%>.sp.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class <%=data['spring-boot-app-name']%>FrontPlayResource {
	@Value("${callgate.domain}")
	private String callgateDomain;

	@RequestMapping("/**")
	public String index(Model model) {
		model.addAttribute("callgateDomain", callgateDomain);
		return "index";
	}
}
