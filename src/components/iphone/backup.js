// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		//hourly states
		this.state.hTemp = [];
		this.state.hCond = [];
		this.state.hTime =[];
		this.state.hIcon = [];
		this.state.locationScreen = false;
		// button display state
		this.fetchWeatherData();
		this.fetchHourlyData();
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
	
	//get hourly forecast
	fetchHourlyData = () => {
		var url = "http://api.wunderground.com/api/a5050eda0657b131/hourly/q/UK/London.json";		
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseHourlyResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	

	// the main render method for the iphone component
	render() {
    		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
    		var imgSrc = this.state.cond ? this.state.cond : 'clear-iphone';
    		var bgpic = {ackgroundImage: 'url(../../assets/backgrounds/'+imgSrc+'.jpg)' 	};
		//em create hourly breakdown variable (div containers to be drawn to screen)
		var hourlyTemp = [];
		var hourlyCond = [];
		var hourlyTime = [];
		var hourlyIcon =[];
		for(var i =0; i <6; i++){
			hourlyTemp.push(<div class = {style.row}> {this.state.hTemp[i]}°  </div>);
			hourlyTime.push(<div class = {style.row}> {this.state.hTime[i]}:00  </div>);			
			hourlyIcon.push(<img src={this.state.hIcon[i]} alt={this.state.hIcon[i]}> </img>);		
			hourlyCond.push(<div class = {style.row}> {this.state.hCond[i]} </div>);	
	
		}

		// display all weather data
		return (
			//current weather	°
		       <div class={ style.container } style={bgpic}> 
				
			
			<div class={ style.header }>
				<div class={ style.city }>{ this.state.locate }</div>
				<div class={ style.conditions }>{ this.state.cond }</div>
				<span class={ tempStyles }>{ this.state.temp }</span>
			</div>			
				<div class = {style.rows}> {hourlyIcon} </div>
				<div class = {style.rows}>{hourlyTemp}</div>	
				<div class = {style.rows}>{hourlyTime} </div>				
				
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



	//EM set return of hourly api call to variables
	parseHourlyResponse = (parsed_json) =>{
		var hTemp = new Array();
		var hCond =new Array();
		var hTime = new Array();
		var hIcon = new Array();
		for(var i =0; i < 6; i++){
			hTemp[i] = (parsed_json['hourly_forecast'][i]['temp']['metric']);
			hCond[i] = (parsed_json['hourly_forecast'][i]['condition']);
			hTime[i] =(parsed_json['hourly_forecast'][i]['FCTTIME']['hour']);
			hIcon[i]=(parsed_json['hourly_forecast'][i]['icon_url']);
		}		
		this.setState({hTemp : hTemp, hCond : hCond, hTime : hTime, hIcon : hIcon});				    
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
