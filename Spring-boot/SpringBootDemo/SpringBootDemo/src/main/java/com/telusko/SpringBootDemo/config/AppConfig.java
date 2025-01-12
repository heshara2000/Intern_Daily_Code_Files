package com.telusko.SpringBootDemo.config;

import com.telusko.Desktop; // Custom Desktop class
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

//import static jdk.jpackage.internal.WixAppImageFragmentBuilder.ShortcutsFolder.Desktop;
@Value()
@Configuration
public class AppConfig {

    @Bean
    @Scope("prototype")
    public Desktop desktop() {
        return new Desktop();  // Returning the custom com.telusko.Desktop object
    }

}
