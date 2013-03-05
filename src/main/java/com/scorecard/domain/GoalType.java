package com.scorecard.domain;

import org.springframework.util.StringUtils;

public enum GoalType {

	BLOG("Blog", 2), MEETUP("Meetup", 2), CONFERENCE("Conference", 4), SCREENCAST(
			"Screencast", 2), SAMPLE_APP("Sample App", 10);

	private final String name;
	private final int score;

	private GoalType(String name, int score) {
		this.name = name;
		this.score = score;
	}

	public static GoalType toEnum(String name){
		GoalType[] values = GoalType.values();
		for (GoalType goalType : values) {
			if(StringUtils.hasLength(name) && name.equals(goalType.name)){
				return goalType;
			}
		}
		return null;
	}
	public String getName() {
		return name;
	}

	public int getScore() {
		return score;
	}
	
}
