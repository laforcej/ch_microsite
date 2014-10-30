var Section3 = AbstractSlideSection.extend({	

	constructor: function($config, $data, $sectionDiv, $slideControlsDiv, $slideContainerDiv)
	{
		this._sectionID = 'section-3';		
		this.inherit($config, $data, $sectionDiv, $slideControlsDiv, $slideContainerDiv);
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
		this.inherit();
	},
	
	sectionLoaded: function()
	{
		this.inherit();
		
		this._slideControls = new SlideControls(this, false, true);
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
			case 3:
				//if(this._slidesRendered[this._sectionID + '-slide-3'] == undefined) {
					this.drawSlide3();
				//}
				break;				
			case 4:
				//if(this._slidesRendered[this._sectionID + '-slide-4'] == undefined) {
					this.drawSlide4();
				//}
				break;				
			case 5:
				//if(this._slidesRendered[this._sectionID + '-slide-5'] == undefined) {
					this.drawSlide5();
				//}												
				break;			
		}
	},
	
	drawSlide0: function()
	{
		var scope = this;
		var tmpDiv1;
		var tmpDiv2;
		var xhr;
		var src = this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[2].src;
		var dropDelay = 200;

		this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-text-0">' + this._curSlideData.text[0] + '</div>');
		
		tmpDiv1 = jQuery('#' + this._curSlideDivID + '-text-0');
		tmpDiv1.css({opacity: 0});

		//xhr = $.ajax(src, {
		//	success: function (data){
				scope._slidesRendered[this._curSlideDivID] = true;
				
				this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-map"></div>');	
	
				tmpDiv2 = jQuery('#' + this._curSlideDivID + '-map');
				tmpDiv2.css({background: 'url(' + src + ')', opacity: 0});	
				
				tmpDiv1.animate({
					opacity: 1
				}, 'easeOut', function(){		
					tmpDiv2.animate({
					opacity: 1
					}, 'easeOut', function(){
						for(var i = 0; i<scope._curSlideData.pinLocations.length; i++) {
							scope._curSlideDiv.append('<div id="' + scope._curSlideDivID + '-pin-' + i + '" class="pin"></div>');
							scope._curSlideDiv.append('<div id="' + scope._curSlideDivID + '-shadow-' + i + '" class="pin-shadow"></div>');
							
							var tmpPinDiv = jQuery('#' + scope._curSlideDivID + '-pin-' + i);
							var tmpShadowDiv = jQuery('#' + scope._curSlideDivID + '-shadow-' + i);
							
							tmpShadowDiv.css({
								top: scope._curSlideData.pinLocations[i].top,
								left:  scope._curSlideData.pinLocations[i].left,
								opacity: 0,
								background: 'url(' + scope._config.images_folder + '/' + scope._data.images_folder + '/' + scope._curSlideData.images[1].src + ')'
							});
							
							tmpPinDiv.css({
								top: scope._curSlideData.pinLocations[i].top - 200,
								left:  scope._curSlideData.pinLocations[i].left,
								opacity: 0,
								background: 'url(' + scope._config.images_folder + '/' + scope._data.images_folder + '/' + scope._curSlideData.images[0].src + ')'
							});
							
							tmpPinDiv.delay(i * dropDelay).animate({
								opacity: 1,
								top: scope._curSlideData.pinLocations[i].top - (tmpPinDiv.height() - 4)
							}, 'easeIn');
							
							tmpShadowDiv.delay(i * dropDelay).animate({
								opacity: 1
							});				 
						}
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
		var tmpDiv3;
		var tmpDiv4;		
		var tmpDiv5;
		var tmpDiv6;		
		var xhr;
		var src = this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[0].src;
		
		this._curSlideDiv.append('<div id="' + scope._curSlideDivID + '-text-0">' + this._curSlideData.text[0] + '</div>');
		this._curSlideDiv.append('<div id="' + scope._curSlideDivID + '-text-1">' + this._curSlideData.text[1] + '</div>');	
		
		tmpDiv1 = jQuery('#' + scope._curSlideDivID + '-text-0');
		tmpDiv1.css({opacity: 0});
		
		tmpDiv2 = jQuery('#' + scope._curSlideDivID + '-text-1');
		tmpDiv2.css({opacity: 0});
		
		//xhr = $.ajax(src, {
		//	success: function (data){
				scope._slidesRendered[this._curSlideDivID] = true;
				
				this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-image-0"></div>');
				this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-image-1"></div>');
				this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-image-2"></div>');
				this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-image-3"></div>');
				
				tmpDiv3 = jQuery('#' + this._curSlideDivID + '-image-0');
				tmpDiv3.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[0].src + ')', opacity: 0});
				
				tmpDiv4 = jQuery('#' + this._curSlideDivID + '-image-1');
				tmpDiv4.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[1].src + ')', opacity: 0});
				
				tmpDiv5 = jQuery('#' + this._curSlideDivID + '-image-2');
				tmpDiv5.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[2].src + ')', opacity: 0});
				
				tmpDiv6 = jQuery('#' + this._curSlideDivID + '-image-3');
				tmpDiv6.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[3].src + ')', opacity: 0});
				
				tmpDiv1.animate({
					opacity: 1
				}, 'easeOut', function(){
					tmpDiv3.animate({
						opacity: 1
					}, 'easeOut');
					tmpDiv4.animate({
						opacity: 1
					}, 'easeOut');
					tmpDiv5.animate({
						opacity: 1
					}, 'easeOut');										
					tmpDiv6.animate({
						opacity: 1
					}, 'easeOut', function(){
						tmpDiv3.rotate(-180, -1, 0);
						tmpDiv4.rotate(180, 1, 0);
						tmpDiv5.rotate(180, 1, 0);
					});
				});
				
				tmpDiv2.animate({
					opacity: 1
				}, 'easeOut');
		//	}
		//		
	},

	drawSlide2: function()
	{
		var scope = this;
		var tmpDiv1;
		var tmpDiv2;
		var tmpDiv3;
		var tmpDiv4;
		var tmpDiv5;
		var tmpDiv6;
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
				this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-image-4"></div>');
				
				tmpDiv2 = jQuery('#' + this._curSlideDivID + '-image-0');
				tmpDiv2.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[0].src + ')', opacity: 0});
				
				tmpDiv3 = jQuery('#' + this._curSlideDivID + '-image-1');
				tmpDiv3.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[1].src + ')', opacity: 0});
				
				tmpDiv4 = jQuery('#' + this._curSlideDivID + '-image-2');
				tmpDiv4.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[2].src + ')', opacity: 0});
				
				tmpDiv5 = jQuery('#' + this._curSlideDivID + '-image-3');
				tmpDiv5.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[3].src + ')', opacity: 0});	
				
				tmpDiv6 = jQuery('#' + this._curSlideDivID + '-image-4');
				tmpDiv6.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[4].src + ')', opacity: 0});															
				
				tmpDiv1.animate({
					opacity: 1
				}, 'easeOut', function(){
					tmpDiv2.animate({
						opacity: 1
					}, 'easeOut');
					
					tmpDiv3.delay(100).animate({
						opacity: 1
					}, 'easeOut');
					
					tmpDiv4.delay(200).animate({
						opacity: 1
					}, 'easeOut');
					
					tmpDiv5.delay(300).animate({
						opacity: 1
					}, 'easeOut');
					
					tmpDiv6.delay(700).animate({
						opacity: 1
					}, 'easeOut');										
				});
		//	}
		//		
	},
	
	drawSlide3: function()
	{
		var scope = this;
		var tmpDiv1;
		var tmpDiv2;
		var tmpDiv3;
		var xhr;
		var tmp;
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
				
				tmpDiv2 = jQuery('#' + this._curSlideDivID + '-image-0');
				tmpDiv2.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[0].src + ')', opacity: 0});
				
				tmpDiv3 = jQuery('#' + this._curSlideDivID + '-image-1');
				tmpDiv3.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[1].src + ')', left: 325, display: 'none'});

				tmpDiv1.animate({
					opacity: 1
				}, 'easeOut', function(){
					tmpDiv2.animate({
						opacity: 1
					}, 'easeOut', function(){
						var newX = 325;
						var newY = 309;
						var charArray = scope._curSlideData.search_box_text.split('');
						var i = 0;
						
						tmpDiv3.css({display: 'block'});
						
						scope._timer = setInterval(function(){
							if(charArray.length == 0) {
								clearInterval(scope._timer);	
								tmpDiv3.animate({
									opacity: 0
								}, 'fast');
							} else {
								var char = charArray.shift();

								if(char == ' ') char = '&nbsp;';
								
								scope._curSlideDiv.append('<div id="' + scope._curSlideDivID + '-letter-' + i + '" class="search-box-letter">' + char + '</div>');

								tmp = jQuery('#' + scope._curSlideDivID + '-letter-' + i);
								tmp.css({top: newY, left: newX});

								newX += tmp.width();
								
								tmpDiv3.css({left: newX});
								i++;
							}
						}, 80);
					});
				});
		//	}
		//	
	},
	
	drawSlide4: function()
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
				this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-image-1"></div>');
				this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-image-2"></div>');
				this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-image-3"></div>');
				this._curSlideDiv.append('<div id="' + this._curSlideDivID + '-image-4"></div>');
				
				tmpDiv2 = jQuery('#' + this._curSlideDivID + '-image-0');
				tmpDiv2.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[0].src + ')', opacity: 0});
				
				tmpDiv3 = jQuery('#' + this._curSlideDivID + '-image-1');
				tmpDiv3.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[1].src + ')', opacity: 0});
				
				tmpDiv4 = jQuery('#' + this._curSlideDivID + '-image-2');
				tmpDiv4.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[2].src + ')', opacity: 0});
				
				tmpDiv5 = jQuery('#' + this._curSlideDivID + '-image-3');
				tmpDiv5.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[3].src + ')', opacity: 0});	
				
				tmpDiv6 = jQuery('#' + this._curSlideDivID + '-image-4');
				tmpDiv6.css({background: 'url(' + this._config.images_folder + '/' + this._data.images_folder + '/' + this._curSlideData.images[4].src + ')', opacity: 0});															
				
				tmpDiv1.animate({
					opacity: 1
				}, 'easeOut', function(){
					tmpDiv2.animate({
						opacity: 1
					}, 'easeOut');
					
					tmpDiv3.delay(100).animate({
						opacity: 1
					}, 'easeOut');
					
					tmpDiv4.delay(200).animate({
						opacity: 1
					}, 'easeOut');
					
					tmpDiv5.delay(300).animate({
						opacity: 1
					}, 'easeOut');
					
					tmpDiv6.delay(400).animate({
						opacity: 1
					}, 'easeOut');										
				});
		//	}
		//});	
	},	
	
	drawSlide5: function()
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
});