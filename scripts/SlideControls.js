function SlideControls($controller, $hidePreviousOnFirst, $hideNextOnLast){
	this._controller = $controller;
	this._prevArrow;
	this._nextArrow;
	this._slideNavContainer;
	this._curSlide = 0;
	this._hidePreviousOnFirst = $hidePreviousOnFirst;
	this._hideNextOnLast = $hideNextOnLast;
	this._nextPopup;
	this._previousPopup;
}

SlideControls.prototype = {	
	init: function()
	{
		this.draw();
		this.updateNav();
	},
	
	updateNav: function()
	{
		var scope = this;
		
		jQuery('#' + this._controller._slideControlsID + ' ul li').each(function(){
			if(parseInt(jQuery(this).attr('data-id')) == scope._curSlide) {
				jQuery(this).css({cursor: 'default'});
				jQuery(this).animate({
					opacity: 1
				});
			} else {
				jQuery(this).css({cursor: 'pointer'});
				jQuery(this).animate({
					opacity: 0.5
				});
			}
		});
		
		if(this._curSlide == 0) {
			if(this._hidePreviousOnFirst) {
				jQuery('#' + this._controller._slideControlsID + ' .arrow-left').css({opacity: 0});
				jQuery('#' + this._controller._slideControlsID + ' .arrow-left').css({cursor: 'default', 'background-position': 0});
			} else {
				//jQuery('#' + this._controller._slideControlsID + ' .arrow-left').css({opacity: 1});
				//jQuery('#' + this._controller._slideControlsID + ' .arrow-left').css({cursor: 'pointer'});
			}
			jQuery('#' + this._controller._slideControlsID + ' .arrow-right').css({opacity: 1, cursor: 'pointer'});
		} else if(this._curSlide == this._controller._numSlides - 1) {
			if(this._hideNextOnLast) {
				jQuery('#' + this._controller._slideControlsID + ' .arrow-right').css({opacity: 0});
				jQuery('#' + this._controller._slideControlsID + ' .arrow-right').css({cursor: 'default', 'background-position': 0});	
			} else {
				//jQuery('#' + this._controller._slideControlsID + ' .arrow-right').css({opacity: 1});
				//jQuery('#' + this._controller._slideControlsID + ' .arrow-right').css({cursor: 'pointer'});	
			}
			jQuery('#' + this._controller._slideControlsID + ' .arrow-left').css({opacity: 1, cursor: 'pointer'});
		} else {
			jQuery('#' + this._controller._slideControlsID + ' .arrow-left').css({opacity: 1, cursor: 'pointer'});
			jQuery('#' + this._controller._slideControlsID + ' .arrow-right').css({opacity: 1, cursor: 'pointer'});			
		}
	},
	
	changeSlide: function($id)
	{	
		if($id == 'section2' || $id == 'section3') {
			jQuery('body').trigger('onChangeSection', $id);
		} else {
			if (isNaN($id)) {
				if($id == "left") {
					this._curSlide--;	
				} else {
					this._curSlide++;	
				}
			} else {
				this._curSlide = $id;
			}
		
			this._controller.gotoSlide(this._curSlide);
			this.updateNav();
		}
	},
	
	draw: function()
	{
		this.drawArrows();
		this.drawNav();	
	},
	
	drawArrows: function()
	{
		var scope = this;	

		if(!this.hideNextOnLast) {
			this._controller._slideControlsDiv.append('<div class="popup-next"></div>');		
			this._nextPopup = jQuery('#' + this._controller._slideControlsID + ' .popup-next');
		}
		
		if(!this.hidePreviousOnFirst) {
			this._controller._slideControlsDiv.append('<div class="popup-previous"></div>');		
			this._previousPopup = jQuery('#' + this._controller._slideControlsID + ' .popup-previous');
		}
		
		//left arrow
		this._controller._slideControlsDiv.append('<div class="arrow-left slide-arrow" data-direction="left"></div>');		
		this._prevArrow = jQuery('#' + this._controller._slideControlsID + ' .arrow-left');

		//right arrow
		this._controller._slideControlsDiv.append('<div class="arrow-right slide-arrow" data-direction="right"></div>');		
		this._nextArrow = jQuery('#' + this._controller._slideControlsID + ' .arrow-right');
	
		//Mouse over event
		this._prevArrow.mouseover(function(){
			var allowRollOver = false;

			switch(scope._curSlide) {
				case 0:
					if(!scope._hidePreviousOnFirst) {
						allowRollOver = true;
						scope.showPreviousPopup();
					}
					break;
				case scope._controller._numSlides - 1:
					allowRollOver = true;	
					break;
				default: 
					allowRollOver = true;
			}
			
			if(allowRollOver) {
				jQuery(this).css('background-position', -(jQuery(this).width()));	
			}
		});
		
		this._nextArrow.mouseover(function(){
			var allowRollOver = false;
			
			switch(scope._curSlide) {
				case 0:
					allowRollOver = true;	
					break;
				case scope._controller._numSlides - 1:
					if(!scope._hideNextOnLast) {
						allowRollOver = true;
						scope.showNextPopup();
					}
					break;
				default: 
					allowRollOver = true;
			}
			
			if(allowRollOver) {
				jQuery(this).css('background-position', -(jQuery(this).width()));	
			}
		});
		
		//Mouse out event
		this._prevArrow.mouseout(function(){
			var allowRollOut = false;
			
			switch(scope._curSlide) {
				case 0:
					if(!scope._hidePreviousOnFirst) {
						allowRollOut = true;
						scope._previousPopup.stop();
						scope._previousPopup.animate({
							opacity: 0
						}, 'easeOut');
					}
					break;
				case scope._controller._numSlides - 1:
					allowRollOut = true;	
					break;
				default: 
					allowRollOut = true;
			}
			
			if(allowRollOut) {
				jQuery(this).css('background-position', 0);	
			}
		});
		
		this._nextArrow.mouseout(function(){
			var allowRollOut = false;
			
			switch(scope._curSlide) {
				case 0:
					allowRollOut = true;	
					break;
				case scope._controller._numSlides - 1:
					if(!scope._hideNextOnLast) {
						allowRollOut = true;
						scope._nextPopup.stop();
						scope._nextPopup.animate({
							opacity: 0
						}, 'easeOut');
					}
					break;
				default: 
					allowRollOut = true;
			}
			
			if(allowRollOut) {
				jQuery(this).css('background-position', 0);	
			}
		});
		
		//Click event
		this._prevArrow.click(function(){		
			var allowClick = false;
			var direction = jQuery(this).attr('data-direction');
			
			switch(scope._curSlide) {
				case 0:
					if(!scope._hidePreviousOnFirst) {
						allowClick = true;
						direction = 'section2';
					}
					break;
				case scope._controller._numSlides - 1:
					allowClick = true;
					break;
				default: 
					allowClick = true;
			}
			
			if(allowClick) {
				scope.changeSlide(direction);
			}
		});
		
		this._nextArrow.click(function(){		
			var allowClick = false;
			var direction = jQuery(this).attr('data-direction')
			
			switch(scope._curSlide) {
				case 0:
					allowClick = true;
					break;
				case scope._controller._numSlides - 1:
					if(!scope._hideNextOnLast) {
						allowClick = true;
						direction = 'section3';	
					}
					break;
				default: 
					allowClick = true;
			}
			
			if(allowClick) {
				scope.changeSlide(direction);
			}
		});
	},
	
	drawNav: function()
	{
		var scope = this;
		var tmp = '<ul>';
		
		for(var i=0; i<this._controller._numSlides; i++) {
			tmp += '<li data-id="' + i + '"></li>';
		}
		tmp += '</ul>';
		
		this._controller._slideControlsDiv.append(tmp);
		
		jQuery('#' + this._controller._slideControlsID + ' ul li').mouseover(function(){
			if(parseInt(jQuery(this).attr('data-id')) != scope._curSlide) {
				jQuery(this).animate({
					opacity: 1
				}, 'fast');
			}
		});
		jQuery('#' + this._controller._slideControlsID + ' ul li').mouseout(function(){
			if(parseInt(jQuery(this).attr('data-id')) != scope._curSlide) {
				jQuery(this).animate({
					opacity: 0.5
				}, 'fast');
			}
		});
		jQuery('#' + this._controller._slideControlsID + ' ul li').click(function(){
			if(parseInt(jQuery(this).attr('data-id')) != scope._curSlide) {
				scope.changeSlide(parseInt(jQuery(this).attr('data-id')));
			}
		});
	},
	
	show: function($div)
	{
		$div.animate({
			opacity: 1
		}, 'easeOut');
	},
	
	showPreviousPopup: function()
	{
		var scope = this;
		
		this._previousPopup.stop();
		this._previousPopup.delay(500).animate({
			opacity: 1
		}, 'easeOut', function(){
			scope._previousPopup.delay(1000).animate({
				opacity: 0
			}, 'easeOut');
		});
	},
	
	showNextPopup: function()
	{
		var scope = this;
		
		this._nextPopup.stop();
		this._nextPopup.delay(500).animate({
			opacity: 1
		}, 'easeOut', function(){
			scope._nextPopup.delay(1000).animate({
				opacity: 0
			}, 'easeOut');
		});
	},
	
	reset: function()
	{
		this._curSlide = 0;	
		this.updateNav();		
	}
}