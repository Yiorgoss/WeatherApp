
<Button class={ style_iphone.button } clickFunction={() => this.addToFavourite(this.state.location) } display="Add To Favourite" />
	//Parse the conditions and return the corresponding image URL
	parseConditions = (conditions) => {
    /* ICONS
		clear - 							sunny w/ white clouds
		overcast - 							grey clouds
		Any cloud (regex for cloud)- 		white clouds
		Thunderstorm (any)- 				grey cloud w/ lightning bolt
		sunny- 							 	sun
		light rain/drizzle- 				white cloud w/ rain
		heavy rain/rain- 					Grey cloud w/ rain
		Any snow (regex for snow)- 			snowy
		*/

		/* BG-IMAGES
		clear (sunny with some clouds)
		sunny (sun with no clouds)
		overcast (grey clouds(?))
		cloudy* (white clouds)
		light rain
		heavy rain
		snowy*
		thunderstorm*
		*/		
		if(conditions == "Clear")					//Clear
			return "background-image: url('---SUNNY---');";

		if(conditions == "Overcast") 				//Overcast
			return "background-image: url('---GREY CLOUD---');";
		
		if(conditions.search(/drizzle/i) >= 0)		//Light Rain
			return "background-image: url('---LIGHT RAIN---');";

		if(conditions.search(/rain/i) >= 0)			//Heavy rain
			return "background-image: url('---LIGHT RAIN---');";
		
		if(conditions.search(/cloud/i) >= 0)		//Cloudy
			return "background-image: url('---WHITE CLOUD---');";
		
		if(conditions.search(/thunderstorm/i) >= 0) //Thunderstorm
			return "background-image: url('---THUNDERSTORM---');";
		
		if(conditions.search(/snow/i) >= 0)			//Snow
			return "background-image: url('---SNOW---');";

		return "background-image: url('---DEFAULT---');"; //Default
	}