package com.scorecard.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.scorecard.domain.Goal;
import com.scorecard.domain.GoalType;

@Controller
@RequestMapping("/goals")
public class GoalController {

	@Autowired
	private MongoTemplate mongoTemplate;

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<Goal> findAllGoals() {
		List<Goal> allGoals = mongoTemplate.findAll(Goal.class);
		return allGoals;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody Goal findBook(@PathVariable("id") String id) {
		Query query = Query.query(Criteria.where("_id").is(id));
		return mongoTemplate.findOne(query, Goal.class);
	}

	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody Goal addBook(@RequestBody Goal goal) {
		goal.setScore(GoalType.toEnum(goal.getType()).getScore());
		mongoTemplate.save(goal);
		return goal;
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteBook(@PathVariable("id") String id){
		Query query = Query.query(Criteria.where("_id").is(id));
		mongoTemplate.remove(query, Goal.class);
	}
	
}
