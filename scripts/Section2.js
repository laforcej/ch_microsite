var Section2 = AbstractSlideSection.extend({	

	constructor: function($config, $data, $sectionDiv, $slideControlsDiv, $slideContainerDiv)
	{
		this._sectionID = 'section-2';		
		this.inherit($config, $data, $sectionDiv, $slideControlsDiv, $slideContainerDiv);
	},
	
	create: function()
	{
		this.inherit();
	},
	
	destroy: function()
	{
		this.inherit();
		clearTimeout(this._timer);
	},	
	
	draw: function()
	{
		this.inherit();
	},

	sectionLoaded: function()
	{
		this.inherit();
		
		this._slideControls = new SlideControls(this, true, false);
		this._slideControls.init();
		this._slideControls.show(this._slideControlsDiv);
		this._slideControls._curSlide = 0;
		
		this.gotoSlide(0);
	},
	
	resize: function($width, $height)
	{
		this.inherit();
	},
	
	showSlide: function($id)
	{
		this.inherit($id);
		
		switch($id) {
			case 0:
				//if(this._slidesRendered[this._sectionID + '-slide-0'] == undefined) {
					this.drawSlide0();
				//} 
				break;
			case 1:
				//if(this._slidesRendered[this._sectionID + '-slide-1'] == undefined) {
					this.drawSlide1();
				//}
				break;
			case 2:
				//if(this._slidesRendered[this._sectionID + '-slide-2'] == undefined) {
					this.drawSlide2();
				//}
				break;			
		}
	},
	
	drawSlide0: function()
	{
		var scope = this;
		var tmpDiv1;
		var tmpDiv2;
		var tmpDiv3;
		var tmpDiv4;
		var tmpDiv5;						
		var xhr;
		var src = this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[0].src;

		this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-text-0">' + this._curSlideData.text[0] + '</div>');
		
		tmpDiv1 = jQuery('#' + this._curSlideDivID + '-text-0');
		tmpDiv1.css({opacity: 0});

		//xhr = $.ajax(src, {
		//	success: function (data){
				scope._slidesRendered[this._curSlideDivID] = true;
				
				this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-image-0"></div>');
				this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-image-1"></div>');
				this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-image-2"></div>');
				this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-image-3"></div>');
				
				tmpDiv2 = jQuery('#' + this._curSlideDivID + '-image-0');
				tmpDiv2.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[0].src + ')', opacity: 0});
				
				tmpDiv3 = jQuery('#' + this._curSlideDivID + '-image-1');
				tmpDiv3.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[1].src + ')', opacity: 0});
				
				tmpDiv4 = jQuery('#' + this._curSlideDivID + '-image-2');
				tmpDiv4.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[2].src + ')', opacity: 0});
				
				tmpDiv5 = jQuery('#' + this._curSlideDivID + '-image-3');
				tmpDiv5.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[3].src + ')', opacity: 0});
				
				tmpDiv1.animate({
					opacity: 1
				}, 'easeOut', function(){
					tmpDiv2.animate({
						opacity: 1
					}, 'easeOut');
					tmpDiv3.animate({
						opacity: 1
					}, 'easeOut');
					tmpDiv4.animate({
						opacity: 1
					}, 'easeOut');										
					tmpDiv5.animate({
						opacity: 1
					}, 'easeOut', function(){
						tmpDiv2.rotate(-180, -1, 0);
						tmpDiv3.rotate(180, 1, 0);
						tmpDiv4.rotate(180, 1, 0);
					});
				});
				
	
		//	}
		//});
	},
	
	drawSlide1: function()
	{
		var scope = this;
		var tmpDiv1;
		var tmpDiv2;
		var xhr;
		var src = this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[0].src;
		
		this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-text-0">' + this._curSlideData.text[0] + '</div>');
		
		tmpDiv1 = jQuery('#' + this._curSlideDivID + '-text-0');
		tmpDiv1.css({opacity: 0});
		
		//xhr = $.ajax(src, {
		//	success: function (data){
				scope._slidesRendered[this._curSlideDivID] = true;
				
				this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-image-0"></div>');
				
				tmpDiv2 = jQuery('#' + this._curSlideDivID + '-image-0');
				tmpDiv2.css({background: 'url(' + src + ')', opacity: 0});
				
				tmpDiv1.animate({
					opacity: 1
				}, 'easeOut', function(){
					tmpDiv2.animate({
						left: '-=50px',
						opacity: 1
					}, 'easeOut');					
				});
		//	}
		//});		
	},

	drawSlide2: function()
	{
		var scope = this;
		var tmpDiv1;
		var tmpDiv2;
		var xhr;
		var src = this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[0].src;
		var newX = 232;
		

		this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-text-0">' + this._curSlideData.text[0] + '</div>');
		
		tmpDiv1 = jQuery('#' + this._curSlideDivID + '-text-0');
		tmpDiv1.css({opacity: 0, 'z-index': 5});
		
		//xhr = $.ajax(src, {
		//	success: function (){
				scope._slidesRendered[this._curSlideDivID] = true;

				tmpDiv1.animate({
					opacity: 1
				}, function(){
					for(var i=1; i<=4; i++) {
						scope._curSlideDiv.append('<div id="circle-' + i + '" class="circle-container"><div class="circle-text">' + scope._curSlideData.text[i]  + '</div></div>'); 	
						
						jQuery('#circle-' + i).css({left: newX, opacity: 0, 'background-image': 'url("' + src + '")', 'z-index': (5-i)});
						jQuery('#circle-' + i).delay((i - 1) * 1000).animate({
							left: '-=100px',
							opacity: 1	
						}, 'easeOut')
						
						newX += (jQuery('#circle-' + i).width() - 25);
					}				
				});
		//	}
		//});
		
		this._timer = setTimeout(function(){
			scope._slideControls.showNextPopup();
		}, 4000);
	}
});