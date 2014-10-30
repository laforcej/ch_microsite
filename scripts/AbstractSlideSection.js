var AbstractSlideSection = AbstractSection.extend({	

	_slideControls: null,
	_slideContainerDiv: null,
	_slideContainerID: '',
	_slideControlsDiv: null,
	_slideControslID: '',
	_numSlides: 0,
	_slidesRendered: {},
	_curSlideDiv: null,
	_timer: null,
	_curSlideDivID: null,
	_curSlideData: null,

	constructor: function($config, $data, $sectionDiv, $slideControlsDiv, $slideContainerDiv)
	{
		this._slideContainerDiv = $slideContainerDiv;
		this._slideContainerID = this._slideContainerDiv.attr('id');
		this._slideControlsDiv = $slideControlsDiv;
		this._slideControlsID = this._slideControlsDiv.attr('id');
		
		this.inherit($config, $data, $sectionDiv);
	},
	
	create: function()
	{
		this.inherit();
	},
	
	destroy: function()
	{
		this.inherit();
	},	
	
	draw: function()
	{
		var tmpBuffer;
		var tmpSlide;
		var newX = 0;
		var id;
			
		for(var item in this._data.slides) {
			id = 'slide-' + this._numSlides;
			tmpBuffer = '<div id="' + this._sectionID + '-' + id + '" class="slide"></div>';
			this._slideContainerDiv.append(tmpBuffer);
			tmpSlide = jQuery('#' + this._sectionID + '-' + id);
			tmpSlide.css({left: newX});
			
			newX += tmpSlide.width();
			
			this._numSlides++;
		}
		
		
	},
	
	preload: function()
	{
		var scope = this;
		
		this.inherit();	
		
		for(var item1 in this._data.slides) {
			for(var item2 in this._data.slides[item1].images) {
				var src = this._config.images_folder + '/' + this._data.images_folder + '/' + this._data.slides[item1].images[item2].src;
				var tmpImg = new Image();
				tmpImg.onload = function(){
					scope.onImgLoaded();
				};
				tmpImg.src = src;
				this._imgsToLoad++;
			}
		}
	},
	
	showSlide: function($id)
	{
		if(this._curSlideDiv != null) {
			this._curSlideDiv.html('');
		}
		
		this._curSlideDivID = this._sectionID + '-slide-' + $id;
		this._curSlideDiv = jQuery('#' + this._curSlideDivID);
		this._curSlideData = this._data.slides['slide' + $id];
	},
	
	sectionLoaded: function()
	{
		this.inherit();
	},
	
	resize: function($width, $height)
	{
	},
	
	ready: function()
	{
		this.inherit();
		
		if(this._sectionLoaded) {
			this._slideControls._curSlide = 0;
			this.gotoSlide(0);
		} else {
			//preload images
			this.preload();
		}
	},
	
	gotoSlide: function($id)
	{
		var left = 1020 * -($id);
		var scope = this;
		
		this._slideContainerDiv.animate({
			left: left
		}, function(){
			//clear the timer if it's running
			clearTimeout(scope._timer);
			scope.showSlide($id);	
		});
	},
	
	show: function()
	{
	},
	
	hide: function()
	{
		this.inherit();
		this._slideControls.reset();
		if(this._curSlideDiv != null) this._curSlideDiv.html('');
	},
	
	hideElements: function($e)
	{
	}
});