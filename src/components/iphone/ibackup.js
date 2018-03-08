// import preactimport { h, render, Component } from 'preact';
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
		// temperature state
		// button display state
			
	}

	
	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		
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
    		var imgSrc = this.state.cond ? parseConditions(this.state.cond) : 'Overcast';
    		var bgpic = {backgroundImage: 'url(../../assets/backgrounds/'+imgSrc+'.jpg)'};
	
		//display location screen
		if(this.state.screen == "locationscreen"){
			return (
			//current weather	°
		       <div class={ style.container } style={bgpic}> 	
			<Button class={ style_iphone.button } clickFunction={() => this.changeScreen("homescreen") } buttonName = "Home"  />			
				Put Location Componants here
				
			</div>
			);	
		}

		//display weekly breakdown
		if(this.state.screen == "weekscreen"){
			return (
			//current weather	°
		       <div class={ style.container } style={bgpic}> 				
				weekly
				
			</div>
			);	
		}

		// display all weather data
		return (
			//current weather	°
		       <div class={ style.container } style={bgpic}> 				
				<Button class={ style_iphone.button } clickFunction={() => this.changeScreen("locationscreen")} buttonName = "locations"  />
				
				<CurrentWeather/>
				<HourlyWeather/>		
				
			</div>
		);		

	
	}//end render

	changeScreen = (s) =>{
		
		console.log("GGGG");
		this.setState({ 
				screen: s, 
		});
		
	}

	//Parse the conditions and return the corresponding image URL
	parseConditions = (conditions) => {
    
		if(conditions == "Clear")					//Clear
			return "overcast";

		if(conditions == "Overcast") 				//Overcast
			return "default";
		
		if(conditions.search(/drizzle/i) >= 0)		//Light Rain
			return "default";

		if(conditions.search(/rain/i) >= 0)			//Heavy rain
			return "default";
		
		if(conditions.search(/cloud/i) >= 0)		//Cloudy
			return "default";
		
		if(conditions.search(/thunderstorm/i) >= 0) //Thunderstorm
			return "default";
		
		if(conditions.search(/snow/i) >= 0)			//Snow
			return "default";
		
		if(conditions.search(/ice/i) >=0)			//Snow
			return "default";

		return "overcast"; //Default
	}

	//set the return of API calls to location,temp and conditions variables
	parseResponse = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];
		var bgURL = parseConditions(conditions); //Get corresponding background image URL
		// set states for fields so they could be rendered later on
		this.setState({
				locate: location,
				temp: temp_c,
				cond : conditions,				
		});      
	}
}
