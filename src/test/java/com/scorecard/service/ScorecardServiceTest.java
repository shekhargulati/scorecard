package com.scorecard.service;

import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.Mongo;
import com.scorecard.domain.Scorecard;

public class ScorecardServiceTest {

	@Test
	public void find() throws Exception{
		MongoTemplate mongoTemplate = mongoTemplate();
		ScorecardService scorecardService = new ScorecardService();
		scorecardService.mongoTemplate = mongoTemplate;
		List<Scorecard> scorecards = scorecardService.findTotalScorePerEvangelist();
		Assert.assertEquals(2, scorecards.size());
	}

	
	private MongoTemplate mongoTemplate() throws Exception{
		Mongo mongo = new Mongo("localhost", 27017);
		MongoTemplate mongoTemplate = new MongoTemplate(mongo, "scorecard");
		return mongoTemplate;
	}
}
