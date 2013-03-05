package com.scorecard.domain;

import java.io.Serializable;

public class Scorecard implements Serializable{

	private static final long serialVersionUID = 1080297265093885570L;

	private String evangelist;
	
	private String month;
	
	private int totalScore;
	
	
	public Scorecard() {
	}
	
	public Scorecard(String evangelist, String month , int totalScore) {
		this.evangelist = evangelist;
		this.month = month;
		this.totalScore = totalScore;
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

	public int getTotalScore() {
		return totalScore;
	}

	public void setTotalScore(int totalScore) {
		this.totalScore = totalScore;
	}

	@Override
	public String toString() {
		return "Scorecard [evangelist=" + evangelist + ", month=" + month
				+ ", totalScore=" + totalScore + "]";
	}
	
	
}
