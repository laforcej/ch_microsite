function MapPopup($popupDiv, $sectionDiv){
	this._popupDiv = $popupDiv;	
	this._sectionDiv = $sectionDiv;
	this._section1Div = jQuery('#map-popup-section1');
	this._section2Div = jQuery('#map-popup-section2');
	this._section3Div = jQuery('#map-popup-section3-carrier-list');
	this._mapPointerLeft = jQuery('#map-popup-pointer-left')
	this._mapPointerRight = jQuery('#map-popup-pointer-right')
}
MapPopup.prototype = {	
	init: function()
	{
		console.log('init');
	},
	
	update: function($data, $e, $carriers)
	{
		var tmp = '';
				
		//Update state name
		this._section1Div.html($data.content.title);
		
		//Update average premium
		this._section2Div.html('');
		tmp =  '<div id="map-popup-section2-title">Average Individual<br/>Insurance Premium</div>';
		if(isNaN(parseInt($data.content.premium))) {
			tmp += '<div id="map-popup-section2-text-2">' + $data.content.premium + '</div>'
		} else {
			tmp += '<div id="map-popup-section2-text-1">$</div>';
			tmp += '<div id="map-popup-section2-text-2">' + $data.content.premium + '</div>';
			tmp += '<div id="map-popup-section2-text-3">/</div>';
			tmp += '<div id="map-popup-section2-text-4">per member<br/>per month</div>';	
		}
		 tmp += '<div class="clear"></div>';
		
		this._section2Div.append(tmp);
		
		//Update carriers
		this._section3Div.html('');
		if($data.content.carriers.length > 0) {
			tmp = '<ul>';
		
			for(var i=0; i<$data.content.carriers.length; i++) {
				tmp += '<li>' + $data.content.carriers[i] + '</li>';
			}
			
			tmp += '</ul>';
		} else {
			tmp = 'NA';	
		}
	
		this._section3Div.append(tmp);
	
		this._alignedLeft = false;
		this.move($e);	
		this.show();
	},
	
	move: function($e) 
	{
		var top = ($e.pageY - this._sectionDiv.offset().top) - (this._section1Div.height() + 45);
		var left = $e.pageX - this._sectionDiv.offset().left;
		var adjustPointer = false;

		this._popupDiv.css({top: top, left: left + 40});
		
		//Check if the popup is below the fold
		if(this._popupDiv.offset().top + this._popupDiv.height() > jQuery(window).scrollTop() + jQuery(window).height()) {
			//Element is below the fold, bump it up
			
			top = this._popupDiv.position().top - ((this._popupDiv.offset().top + this._popupDiv.height()) - (jQuery(window).scrollTop() + jQuery(window).height()));
			this._popupDiv.css({top: top});
			
			adjustPointer = true;
		}
		
		if(this._popupDiv.offset().top + this._popupDiv.height() > jQuery('#content').offset().top + jQuery('#content').height()) {
			//Element is below the fold, bump it up
			top = this._popupDiv.position().top - ((this._popupDiv.offset().top + this._popupDiv.height()) - (jQuery('#content').offset().top + jQuery('#content').height()));
			this._popupDiv.css({top: top});
		}		
		
		//if(adjustPointer) {
		//	console.log($e.pageY + ' ' + this._sectionDiv.offset().top);
		//	top = ($e.pageY - 450);
		//} else {
			top = this._section1Div.height() + 35;
		//}
		
		//Adjust to the left or right
		if((this._popupDiv.offset().left + this._popupDiv.width() > jQuery('#content').offset().left + jQuery('#content').width()) || this._alignedLeft) {
			//Aligh left
			this._popupDiv.css({left: left - (this._popupDiv.width() + 25)}); 	
			this._mapPointerLeft.css({display: 'none'});
			this._mapPointerRight.css({display: 'block'});
			
			left = this._popupDiv.width();
			this._mapPointerRight.css({top:top, left:left});
			this._alignedLeft = true;
		} else {
			//Align right
			this._mapPointerLeft.css({display: 'block'});
			this._mapPointerRight.css({display: 'none'});
			
			left = 0 - this._mapPointerLeft.width();
			this._mapPointerLeft.css({top:top, left:left});
			
			this._alignedLeft = false;
		}
	},
	
	draw: function($data)
	{
	},

	show: function()
	{
		this._popupDiv.css({
			display: 'block',
		});
		this._popupDiv.animate({
			opacity: 1
		});
	},
	
	hide: function()
	{
		this._popupDiv.stop();
		this._popupDiv.css({
			display: 'none',
			opacity: 0
		});
	}
}