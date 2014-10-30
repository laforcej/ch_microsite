var _data;
var _activeSection;
var _activeSectionID;
var _activeSectionDiv;
var _activeNav;
var _section1;
var _indicatorDiv;
var _initialLoad = true; 

jQuery(document).ready(function(){
	_indicatorDiv = jQuery('#header-indicator');
	
	jQuery.getJSON("data/data.json", function( json ){

		_data = json;

		switch(SWFAddress.getPath().substr(1)) {
			case _data.section2.key:
				_activeSectionID = _data.section2.key;
				_activeNav = jQuery('#header-nav-2');
				break;
			case _data.section3.key:
				_activeSectionID = _data.section3.key;
				_activeNav = jQuery('#header-nav-3');
				break;	
			default:
				_activeSectionID = _data.section1.key;
				_activeNav = jQuery('#header-nav-1');
		}
		_activeNav.addClass('selected');
		
		_section1 = new Section1(_data.config, _data.section1.data, jQuery('#section-1'), jQuery('#map-popup'), jQuery('#map-highlight'));
		_section2 = new Section2(_data.config, _data.section2.data, jQuery('#section-2'), jQuery('#section-2-slide-controls'), jQuery('#section-2-slide-container'));
		_section3 = new Section3(_data.config, _data.section3.data, jQuery('#section-3'), jQuery('#section-3-slide-controls'), jQuery('#section-3-slide-container'));
		
		positionIndicator();	
		loadSection();
	});	
	
	jQuery('#header-nav > div > a').click(function($e) {
		$e.preventDefault();
		var newSectionID = jQuery(this).attr('data-section');
		if(newSectionID != _activeSectionID) {
			_activeNav.removeClass('selected');
			_activeNav = jQuery(this);
			_activeNav.addClass('selected');
			_activeSectionDiv.animate({
				top: -(_activeSectionDiv.height())
				}, function() {
					_activeSection.hide();
					_activeSectionID = newSectionID; 
					loadSection();
				});
			positionIndicator(true);
		}
	});
	
	jQuery('body').bind({'onChangeSection': 
		function($e, $id){
			_activeNav.removeClass('selected');
			switch($id) {
				case 'section2':
					_activeSectionID = _data.section2.key;
					_activeNav = jQuery('#header-nav-2');
				break;
				case 'section3':
					_activeSectionID = _data.section3.key;
					_activeNav = jQuery('#header-nav-3');
					break;	
			}
			_activeNav.addClass('selected');
			_activeSectionDiv.animate({
				top: -(_activeSectionDiv.height())
				}, function() {
					_activeSection.hide();
					loadSection();
				}
			);
			positionIndicator(true);
		}		
	});
	
	$.fn.rotate = function(until, step, initial, elt) {
		var _until = (!until)?360:until;
		var _step = (!step)?1:step;
		var _initial = (!initial)?0:initial;
		var _elt = (!elt)?$(this):elt;
	
		var deg = _initial + _step;
	
		var browser_prefixes = ['-webkit', '-moz', '-o', '-ms'];
		for (var i=0, l=browser_prefixes.length; i<l; i++) {
		  var pfx = browser_prefixes[i]; 
		  _elt.css(pfx+'-transform', 'rotate('+deg+'deg)');
		}
	
		if(_until < 0) {
			if (deg > _until) {
			  setTimeout(function() {
				  $(this).rotate(_until, _step, deg, _elt); //recursive call
			  }, 10);
			}			
		} else {	
			if (deg < _until) {
			  setTimeout(function() {
				  $(this).rotate(_until, _step, deg, _elt); //recursive call
			  }, 10);
			}
		}
	};
});

function loadSection()
{
	var scope = this;
	var key;
	var label;
	
	if(_activeSectionDiv != undefined) _activeSectionDiv.css('display', 'none');
	
	switch(_activeSectionID) {
		case _data.section1.key:
			_activeSection = _section1;
			_activeSectionDiv = jQuery('#section-1');
			
			key = _data.section1.key;
			label = _data.section1.label;
			
			break;
		case _data.section2.key:
			_activeSection = _section2;
			_activeSectionDiv = jQuery('#section-2');
			
			key = _data.section2.key;
			label = _data.section2.label;
			break;			
		case _data.section3.key:
			_activeSection = _section3;
			_activeSectionDiv = jQuery('#section-3');
			
			key = _data.section3.key;
			label = _data.section3.label;
			break;			
	} 
	
	_activeSectionDiv.css('display', 'block');
	jQuery("#content").height(_activeSectionDiv.height());	
	
	if(_initialLoad) {		
		_initialLoad = false;	
		this._activeSection.ready();		
	} else {
		_activeSectionDiv.css({top: -(_activeSectionDiv.height())});
		_activeSectionDiv.animate({
			top: 0
		}, function(){
			scope._activeSection.ready();	
		});			
	}
	
	SWFAddress.setValue(key);
	SWFAddress.setTitle(label);
}

function positionIndicator($animate)
{
	var left = _activeNav.offset().left + ((_activeNav.width() - _indicatorDiv.width()) / 2) - jQuery('#content-container').offset().left;
	if($animate) {
		_indicatorDiv.animate({
			left: left
		});
	} else {
		_indicatorDiv.css({left: left, display: 'block'});		
	}
}

function adjustContentHeight()
{
    jQuery(".container").each(function() {
        var newHeight = 0, $this = $(this);
        jQuery.each($this.children(), function() {
            newHeight += $( this ).height();
        });
        $this.height( newHeight );
    });
}
