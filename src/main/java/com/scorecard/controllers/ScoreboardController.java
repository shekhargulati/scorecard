package com.scorecard.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.scorecard.domain.Goal;
import com.scorecard.domain.Scorecard;
import com.scorecard.service.ScoreboardService;

@Controller
@RequestMapping("/scoreboard")
public class ScoreboardController {

	@Autowired
	private ScoreboardService scoreboardService;

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<Scorecard> findScorecardPerEvangelistPerMonth() {
		return scoreboardService.findTotalScorePerEvangelist();
	}
	
	@RequestMapping(value="/{evangelist}/{month}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<Goal> fetchGoalsAcheivedByEvangelistDuringTheMonth(@PathVariable("evangelist") String evangelist, @PathVariable("month") String month){
		return scoreboardService.fetchGoalsAcheivedByEvangelistDuringTheMonth(evangelist,month);
	}
	
	
	@RequestMapping(value="/{evangelist}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<Goal> fetchAllGoalsAcheivedByEvangelist(@PathVariable("evangelist") String evangelist){
		return scoreboardService.fetchAllGoalsAcheivedByEvangelist(evangelist);
	}
	
}
