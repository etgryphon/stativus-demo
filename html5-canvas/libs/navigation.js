/**
  main code for netflix
*/
/*globals Statechart RedFlixUI myStatechart*/
var RedFlixUI = RedFlixUI || window.RedFlixUI || {};
window.RedFlixUI = RedFlixUI;

// Setup code
RedFlixUI.NavUtils = {
  // Positions
  navLeft: 15,
  navWidth: 226,
  navHeight: 50,
  suggestionsTop: 129,
  recent_watchedTop: 199,
  new_releasesTop: 269,
  instant_queueTop: 339,
  
  // Colors
  navNormal: '#3B3530',
  navSelected: '#B1B1B1',
  navEntered: '#757575',
  
  // Text Color
  navNormalTextColor: '#87827F',
  navSelectedTextColor: '#58534F',
  navEnteredTextColor: '#4D4845',
  
  // Functions
  drawButtonNavButton: function(color, top, text, textColor){
    var c, ctx, p;
	  c = this._canvas || window.document.getElementById('nav-canvas');
    if(c){
      ctx = c.getContext('2d');
      // Draw buttons
      ctx.fillStyle =  ctx.strokeStyle = color;
      ctx.clearRect(this.navLeft, top, this.navWidth, this.navHeight);
      ctx.fillRect(this.navLeft, top, this.navWidth, this.navHeight);
      // Draw title
      ctx.fillStyle =  ctx.strokeStyle = textColor || this.navNormalTextColor;
      ctx.font = "bold 18px sans-serif";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(text, this.navLeft+(this.navWidth/2), top+(this.navHeight/2));
    }
	  this._canvas = c;
  }
};

// Statechart code
var myStatechart = myStatechart || window.myStatechart || Statechart.create();
myStatechart.addState('base', {
  initialSubstate: 'suggestions',
  enterState: function(){
	  var util, color;
	  
	  util = RedFlixUI.NavUtils;
	  color = util.navNormal;
	  
	  util.drawButtonNavButton(color, util.suggestionsTop, "Suggestions");
	  util.drawButtonNavButton(color, util.recent_watchedTop, "Recently Watched");
	  util.drawButtonNavButton(color, util.new_releasesTop, "New Releases");
	  util.drawButtonNavButton(color, util.instant_queueTop, "Instant Queue");
	}
});

// Suggestions
myStatechart.addState('suggestions', {
  parentState: 'base',
	// Base Events
	enterState: function(){
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navSelected, util.suggestionsTop, "Suggestions", util.navSelectedTextColor);
	  this.sendEvent('selectContentFor', 'suggestions');	  
	},
	exitState: function(){ 
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navNormal, util.suggestionsTop, "Suggestions");
	},
	keyDown: function(){
    this.goToState('recent_watched');
	},
	keyRight: function(){
    this.goToState('suggestions_entered');
	},
	keyEnter: function(){
    this.goToState('suggestions_entered');
	}
});
myStatechart.addState('suggestions_entered', {
  parentState: 'base',
	// Base Events
	enterState: function(){
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navEntered, util.suggestionsTop, "Suggestions", util.navEnteredTextColor);
	},
	exitState: function(){ 
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navNormal, util.suggestionsTop, "Suggestions");
	},
	exitSelected: function(){
    this.goToState('suggestions');
	}
});

// Recent Watched
myStatechart.addState('recent_watched', {
  parentState: 'base',
	// Base Events
	enterState: function(){
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navSelected, util.recent_watchedTop, "Recently Watched", util.navSelectedTextColor);
	  this.sendEvent('selectContentFor', 'recent_watched');
	},
	exitState: function(){ 
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navNormal, util.recent_watchedTop, "Recently Watched");
	},
	
	keyDown: function(){
    this.goToState('new_releases');
	},
	keyUp: function(){
    this.goToState('suggestions');
	},
	keyRight: function(){
    this.goToState('recent_watched_entered');
	},
	keyEnter: function(){
    this.goToState('recent_watched_entered');
	}
});
myStatechart.addState('recent_watched_entered', {
  parentState: 'base',
	// Base Events
	enterState: function(){
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navEntered, util.recent_watchedTop, "Recently Watched", util.navEnteredTextColor);
	},
	exitState: function(){ 
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navNormal, util.recent_watchedTop, "Recently Watched");
	},
	exitSelected: function(){
    this.goToState('recent_watched');
	}
});

// New Releases
myStatechart.addState('new_releases', {
  parentState: 'base',
	// Base Events
	enterState: function(){
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navSelected, util.new_releasesTop, "New Releases", util.navSelectedTextColor);
	  this.sendEvent('selectContentFor', 'new_releases');
	},
	exitState: function(){ 
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navNormal, util.new_releasesTop, "New Releases");
	},
	
	keyDown: function(){
    this.goToState('instant_queue');
	},
	keyUp: function(){
    this.goToState('recent_watched');
	},
	keyRight: function(){
    this.goToState('new_releases_entered');
	},
	keyEnter: function(){
    this.goToState('new_releases_entered');
	}
});
myStatechart.addState('new_releases_entered', {
  parentState: 'base',
	// Base Events
	enterState: function(){
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navEntered, util.new_releasesTop, "New Releases", util.navEnteredTextColor);
	},
	exitState: function(){ 
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navNormal, util.new_releasesTop, "New Releases");
	},
	exitSelected: function(){
    this.goToState('new_releases');
	}
});

myStatechart.addState('instant_queue', {
  parentState: 'base',
	// Base Events
	enterState: function(){
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navSelected, util.instant_queueTop, "Instant Queue", util.navSelectedTextColor);
	  this.sendEvent('selectContentFor', 'instant_queue');
	},
	exitState: function(){ 
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navNormal, util.instant_queueTop, "Instant Queue");
	},
	
	keyUp: function(){
    this.goToState('new_releases');
	},
	keyRight: function(){
    this.goToState('instant_queue_entered');
	},
	keyEnter: function(){
    this.goToState('instant_queue_entered');
	}
});
myStatechart.addState('instant_queue_entered', {
  parentState: 'base',
	// Base Events
	enterState: function(){
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navEntered, util.instant_queueTop, "Instant Queue", util.navEnteredTextColor);
	},
	exitState: function(){ 
	  var util = RedFlixUI.NavUtils;
	  util.drawButtonNavButton(util.navNormal, util.instant_queueTop, "Instant Queue");
	},
	exitSelected: function(){
    this.goToState('instant_queue');
	}
});
window.myStatechart = myStatechart;