var Section1 = AbstractSection.extend(
{
	_data: null,
	_popup: null,
	_sectionDiv: null,
	_highlightImage: null,
	_highlightDiv: null,
	_alignedLeft: false,
	_xhr: null,
	_mapImageCache: {},

	constructor: function($config, $data, $sectionDiv, $popupDiv, $highlightDiv)
	{
		this._popup = new MapPopup($popupDiv, $sectionDiv);
		this._highlightDiv = $highlightDiv;
		this._sectionID = 'section-1';
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
		var scope = this;
		
		jQuery('area').mouseover(function($e){
			$e.preventDefault();
			var id = jQuery(this).attr('id');
			var data = scope._data.map[id];			
			if(data != undefined) {
				scope.loadHighlight(id, data.highlight);
				scope._alignedLeft = false;
				scope._popup.update(data, $e, scope._data.carriers);
			}
		}).mousemove(function($e){
			scope._popup.move($e);
		});
		jQuery('area').mouseleave(function(){
			scope.hideHighlight();
			scope._xhr.abort();
			scope._popup.hide();
		});	
		jQuery('area').click(function($e){
			$e.preventDefault();
		});
		
		this.sectionLoaded();
	},
	
	loadHighlight: function($id, $highlightObj)
	{
		var scope = this;
		var src = this._config.images_folder + '/' + this._data.images_folder + '/' + $id + '.png';
				
		if(!this._mapImageCache[$id] && !this.DEBUG) {
			this._xhr = $.ajax(src, {
				success: function (data){
					scope._mapImageCache[$id] = true;
					scope.showHighlight($highlightObj, src);
				}
			});
		} else {
			this.showHighlight($highlightObj, src);
		}
	},
	
	showHighlight: function($highlightObj, $src)
	{
		this._highlightDiv.css(
		{
			top: $highlightObj.top,
			left: $highlightObj.left,
			width: 739, //this.width,
			height: 535, //this.height,
			opacity: 0,
			background: 'url(' + $src + ')',
			display: 'inline'
		});
		this._highlightDiv.animate({
			opacity: 1
		});	
	},
	
	hideHighlight: function()
	{
		this._highlightDiv.css(
		{
			background: 'none'
		});	
	},
	
	show: function()
	{
	},
	
	hide: function()
	{
		this.inherit();
	},
	
	resize: function($width, $height)
	{
	},
	
	hideElements: function($e)
	{	
	}
});