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

import FavouriteScreen from '../FavouriteScreen';
import HourlyWeather from '../hourlyWeather';
import WeekWeather from '../weekweather';
export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		this.state.screen = "homescreen";
		this.state.cond = "";
		this.state = {
			favourites: [],
			favurl: []
		};
		this.state.urlEnd ="/q/UK/London";
		this.state.setLoc = "";		
		this.state.imgSrc = "overcast";
		this.fetchWeatherData();
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : http://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/a5050eda0657b131/conditions"+(this.state.urlEnd)+".json";
		console.log(url);
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err);
			
			console.log("main screen "+this.state.urlEnd) }
		})
	}	

	// the main render method for the iphone component
	render() {
		//print background depending on temperature
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

	
    		var bgpic = {backgroundImage: 'url(../../assets/backgrounds/'+this.state.imgSrc+'.jpg)' 	};
		//display location screen
		if(this.state.screen == "locationscreen"){
			return (
			//locatoin screen
			
		       <div class={ style.container } style={bgpic}> 
			<Button class={ style_iphone.button } clickFunction={() => this.changeScreen("homescreen")} buttonName = "Home"/>			
			
			<FavouriteScreen changeLocation={this.changeLocation} saveFavourite ={this.saveFavourite} favourites = {this.state.favourites} favurl = {this.state.favurl}/>
			</div>
			);	
		}
		

		// display all weather data
		return (
				
		       <div class={ style.container } style={bgpic}> 				
				<Button class={ style_iphone.button } clickFunction={() => this.changeScreen("locationscreen")} buttonName = "locations"  />
					
				<CurrentWeather urlEnd ={this.state.urlEnd}/>
				
				<div className = {this.state.screen == "weekscreen"? style.hourlyBreakdowna :  style.hourlyBreakdown}  onclick = {() =>this.changeScreen("weekscreen")} > 
					<HourlyWeather  urlEnd ={this.state.urlEnd} />
				</div>
				<div className = {style.weeklyBreakdown}  onclick = {() =>this.changeScreen("homescreen")} > 
					<WeekWeather  urlEnd ={this.state.urlEnd} />
				</div>				
		       </div>
		);			
	}//end render
	
	changeScreen = (s) =>{		
		console.log("GGGG");
		this.setState({ 
				screen: s, 
		});
		
	}

	changeLocation= (loc,url) => {
		this.setState({ setLoc : loc, urlEnd : url} );
		
		this.fetchWeatherData();
		console.log("location changed to "+url);
			
	}
	saveFavourite= (fav,url) => {
		this.setState({favourites: fav});		
		this.setState({favurl: url});

	}

	//Parse the conditions and return the corresponding image URL
	parseConditions = (conditions) => {
    
		if(conditions.search("Clear")>=0)			//Clear
			return "clear";

		if(conditions == "Overcast") 				//Overcast
			return "overcast";
		
		if(conditions.search(/drizzle/i) >= 0)		//Light Rain
			return "lightrain";

		if(conditions.search(/rain/i) >= 0)			//Heavy rain
			return "rain";
		
		if(conditions.search("Cloud") >= 0)		//Cloudy
			return "clouds";
		
		if(conditions.search(/thunderstorm/i) >= 0) //Thunderstorm
			return "thunder";
		
		if(conditions.search(/snow/i) >= 0)			//Snow
			return "snow";
		
		if(conditions.search(/ice/i) >=0)			//Snow
			return "ice";

		return "clouds"; //Default
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
		this.setState({imgSrc : this.parseConditions(conditions)}); 
		console.log(this.state.imgSrc); 
	}
}
