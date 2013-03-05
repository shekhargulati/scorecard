package com.scorecard.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.mongodb.AggregationOutput;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.scorecard.domain.Goal;
import com.scorecard.domain.Scorecard;

@Service
public class ScorecardService {

	@Autowired
	MongoTemplate mongoTemplate;

	public List<Scorecard> findTotalScorePerEvangelist() {
		final BasicDBObject id = new BasicDBObject("evangelist", "$evangelist")
				.append("month", "$month");
		DBObject groupFields = new BasicDBObject("_id", id);
		groupFields.put("totalScore", new BasicDBObject("$sum", "$score"));
		DBObject group = new BasicDBObject("$group", groupFields);

		AggregationOutput aggregationOutput = mongoTemplate.getDb()
				.getCollection("goals").aggregate(group);
		Iterable<DBObject> results = aggregationOutput.results();

		List<Scorecard> scorecards = new ArrayList<Scorecard>();
		for (DBObject result : results) {
			BasicDBObject _id = (BasicDBObject) result.get("_id");
			Object totalScore = result.get("totalScore");
			scorecards.add(new Scorecard((String) _id.get("evangelist"),
					(String) _id.get("month"), (Integer) totalScore));

		}

		return scorecards;

	}

	public List<Goal> fetchGoalsAcheivedByEvangelistDuringTheMonth(
			String evangelist, String month) {
		Query query = Query.query(Criteria.where("month").is(month)
				.and("evangelist").is(evangelist));
		return mongoTemplate.find(query, Goal.class);
	}

}
