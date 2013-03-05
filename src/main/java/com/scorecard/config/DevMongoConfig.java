package com.scorecard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.Mongo;

@Configuration
@Profile("dev")
public class DevMongoConfig implements MongoConfig {

	@Bean
	@Override
	public MongoTemplate mongoTemplate() throws Exception{
		Mongo mongo = new Mongo("localhost", 27017);
		MongoTemplate mongoTemplate = new MongoTemplate(mongo, "scorecard");
		return mongoTemplate;
	}

}
