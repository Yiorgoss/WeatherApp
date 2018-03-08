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
		this.state.screen = "";
		this.state.cond = "";
		this.fetchWeatherData();
		this.state.favourites = [];
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
    		var imgSrc = this.state.cond ? this.parseConditions(this.state.cond) : 'Overcast';
    		var bgpic = {backgroundImage: 'url(../../assets/backgrounds/'+imgSrc+'.jpg)' 	};
		//em create hourly breakdown variable (div containers to be drawn to screen)
		

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
			return "clear";

		if(conditions == "Overcast") 				//Overcast
			return "overcast";
		
		if(conditions.search(/drizzle/i) >= 0)		//Light Rain
			return "lightrain";

		if(conditions.search(/rain/i) >= 0)			//Heavy rain
			return "rain";
		
		if(conditions.search(/cloud/i) >= 0)		//Cloudy
			return "clouds";
		
		if(conditions.search(/thunderstorm/i) >= 0) //Thunderstorm
			return "thunder";
		
		if(conditions.search(/snow/i) >= 0)			//Snow
			return "snow";
		
		if(conditions.search(/ice/i) >=0)			//Snow
			return "ice";

		return "default"; //Default
	}
	addToFavourite = (location) => {
		// console.log(this.location);
		if( this.state.favourites.indexOf(location) === -1){
			this.setState({
				favourites: this.state.favourites.concat( this.state.location),
			});
			console.log("GGGG");
		}
		console.log(this.state.favourites);

	}
	handleChangeFor = (propertyName) => (event) => {
		const { location } = this.state;
		const newLocation = {
			...location,
			[propertyName]: event.target.value
		};
		this.setState({ location: newLocation });
	}
	// the m

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
