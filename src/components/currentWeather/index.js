// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import CurrentWeather from '../currentWeather';
import HourlyWeather from '../hourlyWeather';
export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		this.fetchWeatherData();
		
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : http://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/a5050eda0657b131/conditions/q/UK/London.json";		
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}
	

	

	// the main render method for the iphone component
	render() {
    		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
    		var imgSrc = this.state.cond ? this.state.cond : 'clear-iphone';
    		var bgpic = {backgroundImage: 'url(../../assets/backgrounds/'+imgSrc+'.jpg)' 	};
		//em create hourly breakdown variable (div containers to be drawn to screen)
		

		// display all weather data
		return (
			//current weather	°
			
			<div class={ style.current}>
				<div class={ style.city }>{ this.state.locate }</div>
				<div class={ style.conditions }>{ this.state.cond }</div>
				<div class={ tempStyles }>{ this.state.temp }</div>
			</div>			
				
		);			


	
	}//end render

	//Parse the conditions and return the corresponding image URL
	parseConditions = (conditions) => {
    
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
		
		if(conditions.search(/ice/i) >=0)			//Snow
			return "background-image: url('---SNOW---');";

		return "background-image: url('---DEFAULT---');"; //Default
	}


	//set the return of API calls to location,temp and conditions variables
	parseResponse = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];
		//var bgURL = parseConditions(conditions); //Get corresponding background image URL
		// set states for fields so they could be rendered later on
			this.setState({
				locate: location,
				temp: temp_c,
				cond : conditions,
				imgSrc: conditions,				
		});      
	}
}
