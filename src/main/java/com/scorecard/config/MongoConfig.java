package com.scorecard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;

public interface MongoConfig {
	
	@Bean
	public MongoTemplate mongoTemplate() throws Exception;
}
