/*globals Statechart RedFlixUI myStatechart*/

var RedFlixUI = RedFlixUI || window.RedFlixUI || {};
window.RedFlixUI = RedFlixUI;

RedFlixUI.BoxArtStore = {
  suggestions: [
    { name: 'Crank 2: High Voltage', img: './images/crank_2.jpg'},
    { name: 'Freak Out', img: './images/freak_out.jpg'},
    { name: 'Blade Runner', img: './images/blade_runner.jpg'},
    { name: 'Gangs of New York', img: './images/gangs_of_new_york.jpg'},
    { name: 'Intacto', img: './images/intacto.jpg'},
    { name: 'Irreversible', img: './images/irreversible.jpg'},
    { name: 'Memento', img: './images/memento.jpg'},
    { name: 'Pulp Fiction', img: './images/pulp_fiction.jpg'}
  ],
  
  recent_watched: [
    { name: 'Shutter Island', img: './images/shutter_island.jpg'},
    { name: 'The Usual Suspects', img: './images/usual_suspects.jpg'}
  ],
  
  new_releases: [
    { name: 'Airplane', img: './images/airplane.jpg'},
    { name: 'Alpha and Omega', img: './images/alpha_and_omega.jpg'},
    { name: 'Cherry', img: './images/cherry.jpg'},
    { name: 'Expendables', img: './images/expendables.jpg'},
    { name: 'Forks and Knives', img: './images/forks_and_knives.jpg'},
    { name: 'Lemon Mouth', img: './images/lemon_mouth.jpg'},
    { name: 'Mooz-Lum', img: './images/mooz-lum.jpg'},
    { name: 'Somebody Help Me: 2', img: './images/somebody_help_me_2.jpg'}
  ],
  
  instant_queue: [
    { name: 'Buried', img: './images/buried.jpg'},
    { name: 'Elle', img: './images/elle.jpg'},
    { name: 'La Soga', img: './images/la_soga.jpg'},
    { name: 'The Hustle', img: './images/the_hustle.jpg'},
    { name: 'Saw: The Final Chapter', img: './images/saw_the_final_chapter.jpg'}
  ]
};

// Setup code
RedFlixUI.ContentUtils = {
  // Area
  contentWidth: '768',
  contentHeight: '518',
  
  // Positions
  titleLeft: 15,
  titleTop: 15,
  gridTop: 75,
  gridLeft: 75,
  gridRight: 20,
  gridBottom: 250,
  boxWidth: 135,
  boxHeight: 192,
  boxHSpace: 30,
  boxVSpace: 30,
  
  // Colors
  titleColor: '#B9B3B2',
  selectedColor: '#B0B0B0',
  
  _imageCache: {},
  
  // Functions
  drawContentTitleAndBoxArt: function(title, boxArt){
    var c, ctx, p, that = this;
	  c = this._canvas || window.document.getElementById('content-canvas');
    if(c){
      ctx = c.getContext('2d');
      ctx.fillStyle =  ctx.strokeStyle = this.titleColor;
      ctx.clearRect(0, 0, this.contentWidth, this.contentHeight);
      ctx.font = "bold 26px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText(title, this.titleLeft, this.titleTop);
      
      // draw box art
  	  boxArt.forEach( function(x, i){
  	    that.drawBoxArtIn(i, x.img); 
  	  });
    }
	  this._canvas = c;
  },
  
  drawBoxArtIn: function(pos, image, selected){
    var c, ctx, p, row, col, vspace, hspace, bw, bh,
        boxArt, start = {x: 0, y: 0}, that = this;
  	c = this._canvas || window.document.getElementById('content-canvas');
    if(c){
      col = pos%4;
  	  row = ~~(pos/4);
      ctx = c.getContext('2d');
      bw = this.boxWidth;
      bh = this.boxHeight;
      start.x = this.gridLeft + col*(bw+this.boxHSpace);
      start.y = this.gridTop + row*(bh+this.boxVSpace);
      
      ctx.clearRect(start.x-10, start.y-10, bw+20, bh+20);
      if (selected){
        ctx.fillStyle = ctx.strokeStyle = this.selectedColor;
        ctx.fillRect(start.x-10, start.y-10, bw+20, bh+20);
      }
      
      boxArt = this._imageCache[image];
      if (boxArt) {
        ctx.drawImage(boxArt, start.x, start.y, bw, bh);
      } 
      else {
        boxArt = new Image();
        boxArt.src = image;
        boxArt.onload = function() {
          ctx.drawImage(boxArt, start.x, start.y, bw, bh);
        };
        this._imageCache[image] = boxArt;
      }
    }
  	this._canvas = c;
  },
  
  moveLeft: function(allBoxArt, pos){
    var ba;
    if (pos > 0 || pos > 4){
	    ba = allBoxArt[pos];
	    this.drawBoxArtIn(pos, ba.img, false);
	    pos -= 1;
	    ba = allBoxArt[pos];
	    this.drawBoxArtIn(pos, ba.img, true);
	  }
	  return pos;
  },
  
  moveRight: function(allBoxArt, pos){
    var ba;
    if (pos < 7 && pos < allBoxArt.length-1){
	    ba = allBoxArt[pos];
	    this.drawBoxArtIn(pos, ba.img, false);
	    pos += 1;
	    ba = allBoxArt[pos];
	    this.drawBoxArtIn(pos, ba.img, true);
	  }
	  return pos;
  },
  
  moveDown: function(allBoxArt, pos){
    var ba, end = allBoxArt.length-1, x;
    pos = pos || 0;
    if (pos < 4 && end > 3 && pos < end){
	    ba = allBoxArt[pos];
	    this.drawBoxArtIn(pos, ba.img, false);
	    x = pos+4;
	    pos = x < end ? x : end;
	    ba = allBoxArt[pos];
	    this.drawBoxArtIn(pos, ba.img, true);
	  }
	  return pos;
  },
  
  moveUp: function(allBoxArt, pos){
    var ba;
    pos = pos || 0; 
	  if (pos > 3){
	    ba = allBoxArt[pos];
	    this.drawBoxArtIn(pos, ba.img, false);
	    pos -= 4;
	    ba = allBoxArt[pos];
	    this.drawBoxArtIn(pos, ba.img, true);
	  }
	  return pos;
  }
};

// This is the general selected config object
// that will be used in all of the *_entered 
// States
RedFlixUI.genCon = {
	keyRight: function(){
	  var utils = RedFlixUI.ContentUtils;
	  this._itemIndex = utils.moveRight(this._boxArt, this._itemIndex);
	},
	
	keyUp: function(){
	  var utils = RedFlixUI.ContentUtils;
	  this._itemIndex = utils.moveUp(this._boxArt, this._itemIndex);
	},
	
	keyDown: function(){
	  var utils = RedFlixUI.ContentUtils;
	  this._itemIndex = utils.moveDown(this._boxArt, this._itemIndex);
	},
	
	keyEnter: function(){
	  var ba = this._boxArt[this._itemIndex] || {name: 'Unknown', img: 'unknown.jpg'};
	  alert([ba.name, ba.img].join('\n'));
	}
};

var myStatechart = myStatechart || window.myStatechart || Statechart.create();
myStatechart.addState('base_content', {
  globalConcurrentState: 'content',
  initialSubstate: 'suggestions_content',

  // @private params
  _validAreas: 'suggestions,recent_watched,new_releases,instant_queue',
  
  selectContentFor: function(area){
    if (this._validAreas.indexOf(area)>-1) this.goToState(area+'_content');
  }
});

// Suggestions
myStatechart.addState('suggestions_content', {
  globalConcurrentState: 'content',
  parentState: 'base_content',
  
	// Base Events
	enterState: function(){
	  var boxArt = RedFlixUI.BoxArtStore.suggestions || [], 
	      util = RedFlixUI.ContentUtils;
	  util.drawContentTitleAndBoxArt('Suggestions', boxArt); 
	},
	keyRight: function(){ this.goToState('suggestions_entered'); },
	keyEnter: function(){ this.goToState('suggestions_entered'); }
});
myStatechart.addState('suggestions_entered', RedFlixUI.genCon, {
  globalConcurrentState: 'content',
  parentState: 'base_content',
  
  _itemIndex: 0,
  _boxArt: null,
	// Base Events
	enterState: function(){
	  var util = RedFlixUI.ContentUtils, idx = this._itemIndex || 0,
	      bArts = RedFlixUI.BoxArtStore.suggestions,
	      boxArt = bArts[idx];
	  this._boxArt = bArts;
    util.drawBoxArtIn(idx, boxArt.img, true);
	},
	
	keyLeft: function(){
	  var utils = RedFlixUI.ContentUtils, ba, bArts,
	      pos = this._itemIndex || 0;
	  if ((pos%4) === 0){
	    this.goToState('suggestions_content');
	    this.sendEvent('exitSelected');
	  } 
	  else {
	    this._itemIndex = utils.moveLeft(this._boxArt, pos);
	  }
	}
});

// Recently Watched
myStatechart.addState('recent_watched_content', {
  globalConcurrentState: 'content',
  parentState: 'base_content',
  
  // @private position
  _position: [0,0],
	// Base Events
	enterState: function(){
  	  var boxArt = RedFlixUI.BoxArtStore.recent_watched || [], 
  	      util = RedFlixUI.ContentUtils;
  	  util.drawContentTitleAndBoxArt('Recently Watched', boxArt); 
  	},
    keyRight: function(){ this.goToState('recent_watched_entered'); },
    keyEnter: function(){ this.goToState('recent_watched_entered'); }
});
myStatechart.addState('recent_watched_entered', RedFlixUI.genCon, {
  globalConcurrentState: 'content',
  parentState: 'base_content',
  
  _itemIndex: 0,
  _boxArt: null,
	// Base Events
	enterState: function(){
	  var util = RedFlixUI.ContentUtils, idx = this._itemIndex || 0,
	      bArts = RedFlixUI.BoxArtStore.recent_watched,
	      boxArt = bArts[idx];
	  this._boxArt = bArts;
    util.drawBoxArtIn(idx, boxArt.img, true);
	},
	keyLeft: function(){
	  var utils = RedFlixUI.ContentUtils, ba, bArts,
	      pos = this._itemIndex || 0;
	  if ((pos%4) === 0){
	    this.goToState('suggestions_content');
	    this.sendEvent('exitSelected');
	  } 
	  else {
	    this._itemIndex = utils.moveLeft(this._boxArt, pos);
	  }
	}
});


// New Releases
myStatechart.addState('new_releases_content', {
  globalConcurrentState: 'content',
  parentState: 'base_content',
	// Base Events
	enterState: function(){
	  var boxArt = RedFlixUI.BoxArtStore.new_releases || [], 
	      util = RedFlixUI.ContentUtils;
	  util.drawContentTitleAndBoxArt('New Releases', boxArt); 
	},
	keyRight: function(){ this.goToState('new_releases_entered'); },
  keyEnter: function(){ this.goToState('new_releases_entered'); }
});
myStatechart.addState('new_releases_entered', RedFlixUI.genCon, {
  globalConcurrentState: 'content',
  parentState: 'base_content',
  
  _itemIndex: 0,
  _boxArt: null,
	// Base Events
	enterState: function(){
	  var util = RedFlixUI.ContentUtils, idx = this._itemIndex || 0,
	      bArts = RedFlixUI.BoxArtStore.new_releases,
	      boxArt = bArts[idx];
	  this._boxArt = bArts;
    util.drawBoxArtIn(idx, boxArt.img, true);
	},
	keyLeft: function(){
	  var utils = RedFlixUI.ContentUtils, ba, bArts,
	      pos = this._itemIndex || 0;
	  if ((pos%4) === 0){
	    this.goToState('new_releases_content');
	    this.sendEvent('exitSelected');
	  } 
	  else {
	    this._itemIndex = utils.moveLeft(this._boxArt, pos);
	  }
	}
});

// Instant Queue
myStatechart.addState('instant_queue_content', {
  globalConcurrentState: 'content',
  parentState: 'base_content',
	// Base Events
	enterState: function(){
	  var boxArt = RedFlixUI.BoxArtStore.instant_queue || [], 
	      util = RedFlixUI.ContentUtils;
	  util.drawContentTitleAndBoxArt('Instant Queue', boxArt); 
	},
  keyRight: function(){ this.goToState('instant_queue_entered'); },
  keyEnter: function(){ this.goToState('instant_queue_entered'); }
});
myStatechart.addState('instant_queue_entered', RedFlixUI.genCon, {
  globalConcurrentState: 'content',
  parentState: 'base_content',
  
  _itemIndex: 0,
  _boxArt: null,
	// Base Events
	enterState: function(){
	  var util = RedFlixUI.ContentUtils, idx = this._itemIndex || 0,
	      bArts = RedFlixUI.BoxArtStore.instant_queue,
	      boxArt = bArts[idx];
	  this._boxArt = bArts;
    util.drawBoxArtIn(idx, boxArt.img, true);
	},
	keyLeft: function(){
	  var utils = RedFlixUI.ContentUtils, ba, bArts,
	      pos = this._itemIndex || 0;
	  if ((pos%4) === 0){
	    this.goToState('instant_queue_content');
	    this.sendEvent('exitSelected');
	  } 
	  else {
	    this._itemIndex = utils.moveLeft(this._boxArt, pos);
	  }
	}
});
window.myStatechart = myStatechart;
