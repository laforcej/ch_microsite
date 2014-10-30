var MapPopup = ($div)
{
	this.firstproperty=parameter
	this.secondproperty="This is the second property"
	this.div = $div;
	
	function show()
	{
		this.div.css('display', 'block');
	}
	
	function hide()
	{
		this.div.css('display', 'none');
	}
}