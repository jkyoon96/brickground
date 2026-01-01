package com.sopoong.brickground.webapp.domain;


import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories
@EnableAutoConfiguration
@EnableTransactionManagement
@ComponentScan
public class VrMallServiceConfiguration {

  @Bean
  public VrMallService vrMallService() {
    return new VrMallService();
  }


}
