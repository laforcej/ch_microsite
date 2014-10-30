var AbstractSection = Base.extend({

	DEBUG: false,
	
	_data: null,
	_config: null,
	_imgsToLoad: 0,
	_sectionDiv: null,
	_sectionID: '',
	_sectionLoaded: false,

	constructor: function($config, $data, $sectionDiv)
	{
		this._sectionDiv = $sectionDiv;
		this._data = $data;
		this._config = $config;
		
		this.init();
	},
	
	create: function()
	{
		
	},
	
	destroy: function()
	{
		
	},
	
	init: function()
	{
		jQuery('body').bind({
			'onResize': function($e, $width, $height){scope.resize($width, $height);},
			'onHideElements': function($e){scope.hideElements($e);},
		});

		this.draw();
	},
	
	draw: function()
	{
	},
	
	resize: function($width, $height)
	{
	},
	
	hideElements: function($e)
	{
	},
	
	ready: function()
	{
		//console.log('section div is in place do something');
	},
	
	show: function()
	{
	},
	
	hide: function()
	{	
		//console.log(this._sectionID + ' hidden');
		this.destroy();
	},
	
	preload: function()
	{
		this._sectionDiv.css({background: 'url("images/ajax-loader.gif") no-repeat center'});
	},
	
	sectionLoaded: function()
	{
		this._sectionLoaded = true;
		//console.log(this._sectionID + ' is preloaded');
		this._sectionDiv.css({background: 'none'});
	},
	
	onImgLoaded: function()
	{
		this._imgsToLoad--;
		
		if(this._imgsToLoad == 0) {
			this.sectionLoaded();
		}
	}
});