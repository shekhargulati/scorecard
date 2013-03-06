package com.scorecard.domain;

public enum Month {

	JANUARY("January", 1), FEBRUARY("February", 2), MARCH("March", 3), APRIL(
			"April", 4), MAY("May", 5), JUNE("June", 6), JULY("July", 7), AUGUST(
			"August", 8), SEPTEMBER("September", 9), OCTOBER("October", 10), NOVEMBER(
			"November", 11), DECEMBER("December", 12);

	private String name;
	private int value;

	private Month(String name, int value) {
		this.name = name;
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public int getValue() {
		return value;
	}

	public static int intValue(String name) {
		Month[] months = values();
		for (Month month : months) {
			if (month.getName().equals(name)) {
				return month.getValue();
			}
		}
		throw new IllegalArgumentException("Month does not exists : " + name);
	}
}
