package <%=data['java-base-package']%>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = { "<%=data['java-base-package']%>" })
public class TestApplication {
    public static void main(String args[]) {
        SpringApplication.run(TestApplication.class, args);
    }
}