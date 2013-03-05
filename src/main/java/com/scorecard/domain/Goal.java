package com.scorecard.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "goals")
public class Goal {

	@Id
	private String id;
	
	private String evangelist;
	
	private String month;
	
	private String goalDate;
	
	private String type;
	
	private String description;
	
	private int score;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEvangelist() {
		return evangelist;
	}

	public void setEvangelist(String evangelist) {
		this.evangelist = evangelist;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public String getGoalDate() {
		return goalDate;
	}

	public void setGoalDate(String goalDate) {
		this.goalDate = goalDate;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
	public void setScore(int score) {
		this.score = GoalType.toEnum(type).getScore();
	}
	public int getScore() {
		return score;
	}
	
}
