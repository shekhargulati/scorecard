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
			var tableView = new Scorecard.TableView({collection: goals});
			this.$el.append(tableView.render().el);
		}


	});

	Scorecard.TableView = Backbone.View.extend({
		template : template('table'),
		render : function(){
			this.$el.html(this.template(this));
			this.collection.each(this.renderRow,this);
			return this;
		},
		renderRow : function(row){
			var row = new Scorecard.TableView.Row({model : row});
			this.$('#scoresTable').append(row.render().el);
		}
	});

	Scorecard.TableView.Row = Backbone.View.extend({
		template : template('row'),
		tagName : 'tr',
		events : {
			'click button' : 'deleteGoal'
		},
		render : function(){
			this.$el.html(this.template(this));
			return this;
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
		url : 'api/scorecard'
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
			this.scorecard.each(this.renderRow,this);
			return this;
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

	Scorecard.ShowDetailsView = Backbone.View.extend({
		
		render : function(){
			this.$el.text('In Show Details View..');
			
			return this;
		}
	
	});
	Scorecard.Router = Backbone.Router.extend({
		initialize : function(options){
			this.el = options.el;
		},
		routes : {
			"" : "home",
			'scorecard' : "getScorecard",
			'scorecard/:evangelist/:month' : 'showDetails'
		},

		home : function(){
			var homeView = new Scorecard.HomeView();
			this.el.empty();
			this.el.append(homeView.render().el);
		},

		getScorecard : function(){
			console.log('in getScorecard() ...');
			var scoreCardView = new Scorecard.ScorecardView();
			this.el.empty();
			this.el.append(scoreCardView.render().el);
		},
		
		showDetails : function(){
			console.log('in routers showDetails()...');
			var showDetailsView = new Scorecard.ShowDetailsView();
			this.el.empty();
			this.el.append(showDetailsView.render().el);
		}


	});

	var router = new Scorecard.Router({el : $('#main')});
	Backbone.history.start();

})(jQuery);