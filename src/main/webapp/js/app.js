// app.js

(function(){
	var Scorecard = {};
	window.Scorecard = Scorecard;

	var template = function(name) {
    	return Mustache.compile($('#'+name+'-template').html());
  	};

	Scorecard.Goal = Backbone.Model.extend({

	});

	Scorecard.Goals = Backbone.Collection.extend({
		model : Scorecard.Goal,
		//localStorage : new Store('scores')
		url : 'api/goals'
	});

	Scorecard.HomeView = Backbone.View.extend({
		template : template('stats'),
		initialize : function(){
			this.goals = new Scorecard.Goals();
			this.goals.on('all',this.render,this);
			this.goals.fetch();
		},
		
		render :function(){
			this.$el.html(this.template(this));
			var formView = new Scorecard.Form({collection : this.goals});
			this.$el.append(formView.render().el);
			this.renderGoals(this.goals);
			return this;
		},
		count : function(){
			return this.goals.length;
		},
		renderGoal : function(goal){
			var goalView = new Scorecard.GoalView({model:goal});
			this.$el.append(goalView.render().el);
		},

		renderGoals : function(goals){
			var tableView = new Scorecard.TableView({collection: goals, deleteButton : true});
			this.$el.append(tableView.render().el);
		}


	});

	Scorecard.TableView = Backbone.View.extend({
		template : template('table'),
		initialize : function(options){
			this.deleteButton = options.deleteButton;
		},
	
		render : function(){
			this.$el.html(this.template(this));
			this.collection.each(this.renderRow,this);
			return this;
		},
		renderRow : function(row){
			var row = new Scorecard.TableView.Row({model : row , deleteButton : this.deleteButton});
			this.$('#scoresTable').append(row.render().el);
		},
		showDeleteButton : function(){
			return this.deleteButton;
		}
		
		
	});

	Scorecard.TableView.Row = Backbone.View.extend({
		template : template('row'),
		tagName : 'tr',
		initialize : function(options){
			this.deleteButton = options.deleteButton;
		},
	
		events : {
			'click button' : 'deleteGoal'
		},
		render : function(){
			this.$el.html(this.template(this));
			return this;
		},
		showDeleteButton : function(){
			return this.deleteButton;
		},
		
		deleteGoal : function(){
			this.model.destroy();
			return false;
		},

		evangelist : function(){
			return this.model.get('evangelist');
		},
		month : function(){
			return this.model.get('month');
		},
		goalDate : function(){
			return this.model.get('goalDate');
		},
		type : function(){
			return this.model.get('type');
		},
		description : function(){
			return this.model.get('description');
		},
		score : function(){
			return this.model.get('score');
		}
		
	});

	
	Scorecard.Form = Backbone.View.extend({
		tagName : 'form',
		template : template('form'),
		events : {
			'submit' :'addGoal'
		},
		render : function(){
			this.$el.html(this.template(this));
			return this;
		},
		addGoal : function(event){
			console.log('In addGoal() ...');
			event.preventDefault();
			console.log('evangelist : '+ this.$("#evangelist").val());
			console.log('goalDate : '+ this.$('#goalDate').val());
			console.log('month : '+ this.$("#month").val());
			console.log('type : '+ this.$("#type").val());
			console.log('description : '+ this.$("#description").val());
			this.collection.create({
				evangelist : this.$("#evangelist").val(),
				goalDate : this.$('#goalDate').val(),
				month : this.$("#month").val(),
				type : this.$("#type").val(),
				description : this.$("#description").val()
			});

		}
	});

	Scorecard.ScorecardCollection = Backbone.Collection.extend({
		url : 'api/scoreboard'
	});
	
	Scorecard.ScorecardView = Backbone.View.extend({
		template : template('scorecard'),
		initialize : function(){
			this.scorecard = new Scorecard.ScorecardCollection();
			this.scorecard.on('all',this.render,this);
			this.scorecard.fetch();
		},
		
		render : function(){
			this.$el.html(this.template(this));
			var that = this;
			google.load('visualization', '1',  {'callback':function(){
				that.drawVisualization(that.scorecard,that);
			},'packages':['corechart']});
			
			
			this.scorecard.each(this.renderRow,this);
			return this;
		},
		drawVisualization : function(scores,that) {
			
			var myMap = {}; 
			console.log('Scores length '+scores.length);
			var header = ['Month'];
			scores.each(function(score){
				var month = score.get('month');
				var totalScore = score.get('totalScore');
				var evangelist = score.get('evangelist');
				if(header.indexOf(evangelist) === -1){
					header.push(evangelist);
				}
				
				
				if(month in myMap){
					var scorePerMonthArray = myMap[month];
					scorePerMonthArray.push(totalScore);
					myMap[month] = scorePerMonthArray;
				}else{
					var scoresPerMonthArray = new Array();
					scoresPerMonthArray.push(totalScore);
					myMap[month] = scoresPerMonthArray;
				}
			});
			
			var arrayOfData = [header];
			for(var month in myMap){
				var scoresForMonth = myMap[month];
				//var newArr = [month,scoresForMonth[0],scoresForMonth[1]];
				var newArr = [month];
				for(monthScore in scoresForMonth){
					newArr.push(scoresForMonth[monthScore]);
				}
				arrayOfData.push(newArr);
			}
			var data = google.visualization.arrayToDataTable(arrayOfData);
	        var options = {
	          title: 'Evangelist Scores',
	          vAxis: {title: 'Scores',  titleTextStyle: {color: 'red'}}
	        };

	        var chart = new google.visualization.ColumnChart(that.$('#gviz').get(0));
	        console.log('Chart '+chart);
	        chart.draw(data, options);
	    },
		renderRow : function(model){
			var row = new Scorecard.ScorecardView.Row({model : model});
			this.$('#scorecardTable').append(row.render().el);
		}
		
	});
	
	Scorecard.ScorecardView.Row = Backbone.View.extend({
		template : template('scorecard-row'),
		tagName : 'tr',
		events : {
			'click button' : 'showDetails'
		},
		render : function(){
			this.$el.html(this.template(this));
			return this;
		},
		showDetails : function(){
			console.log('in showDetails() ....');
			router.navigate('scorecard/'+this.model.get('evangelist')+'/'+this.model.get('month'),true);
			
		},
		evangelist : function(){
			return this.model.get('evangelist');
		},
		month : function(){
			return this.model.get('month');
		},
		totalScore : function(){
			return this.model.get('totalScore');
		}
	});

	Scorecard.ScorecardDetails = Backbone.Collection.extend({
		initialize : function(options){
			this.evangelist = options.evangelist;
			this.month = options.month;
		},
		
		url : function(){
			if(!this.month){
				return 'api/scoreboard/'+this.evangelist;
			}
			return 'api/scoreboard/'+this.evangelist+'/'+this.month;
			
			
		}
		
	
	});
	Scorecard.ShowDetailsView = Backbone.View.extend({
		initialize : function(evangelist, month){
			this.evangelist = evangelist;
			this.month = month;
			this.scorecardDetails = new Scorecard.ScorecardDetails({evangelist: evangelist,month : month});
			this.scorecardDetails.on('all',this.render,this);
			this.scorecardDetails.fetch();
		},
	
		render : function() {
			var tableView = new Scorecard.TableView({collection: this.scorecardDetails,deleteButton : false});
			this.$el.html(tableView.render().el);
			var arrayOfData = this.getData(this.scorecardDetails);
			
			return this;
		},
		
		getData : function(goals){
			var myMap = {}; 
			console.log('Goals length '+goals.length);
			goals.each(function(goal){
				var month = goal.get('month');
				var score = goal.get('score');
				if(month in myMap){
					score += myMap[month];
					myMap[month] = score;
				}else{
					myMap[month] = score;
				}
			});
			console.log(myMap);
			var arrayOfData = new Array();
			for(var item in myMap){
				arrayOfData.push([myMap[item],item]);
			}
			return arrayOfData;
			
		}

		
	
	});
	
	Scorecard.Router = Backbone.Router.extend({
		initialize : function(options){
			this.el = options.el;
		},
		routes : {
			"" : "home",
			'scorecard' : "getScorecard",
			'scorecard/:evangelist' : 'showAllGoalsAchievedByEvangelist',
			'scorecard/:evangelist/:month' : 'showAllGoalsAcheivedByEvangelistDuringMonth'
		},

		home : function(){
			var homeView = new Scorecard.HomeView();
			this.el.empty();
			this.el.append(homeView.render().el);
		},

		getScorecard : function(){
			var scoreCardView = new Scorecard.ScorecardView();
			this.el.empty();
			this.el.append(scoreCardView.render().el);
		},
		
		showAllGoalsAcheivedByEvangelistDuringMonth : function(evangelist,month){
			var showDetailsView = new Scorecard.ShowDetailsView(evangelist,month);
			this.el.empty();
			this.el.append(showDetailsView.render().el);
		},
		showAllGoalsAchievedByEvangelist : function(evangelist){
			this.el.empty();
			var showDetailsView = new Scorecard.ShowDetailsView(evangelist,null);
			this.el.append(showDetailsView.render().el);
		}

	});

	var router = new Scorecard.Router({el : $('#main')});
	Backbone.history.start();

		
})(jQuery);