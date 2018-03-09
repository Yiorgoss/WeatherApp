// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import 
import CurrentWeather from '../currentWeather';
import Week from '../week';
export default class weekweather extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		//hourly states
		this.state.hTempl = [];
		this.state.hTemph = [];
		this.state.hCond = [];
		this.state.hDay = [];
		this.state.hTime =[];
		this.state.hIcon = [];
		this.state.locationScreen = false;
		// button display state
		this.fetchHourlyData();
	}

	//get hourly forecast
	fetchHourlyData = () => {
		var url = "http://api.wunderground.com/api/a5050eda0657b131/forecast10day"+this.props.urlEnd+".json";		
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseHourlyResponse,
			error : function(req, err){ console.log(	'API call failed ' + err); 
			console.log("error " +url)}
		})

	console.log("weekly " +url)
	}

	

	// the main render method for the iphone component
	render() {
    		
		//em create hourly breakdown variable (div containers to be drawn to screen)
		var  weekly = [];
		for(var i =0; i <6; i++){		
			weekly.push(<Week day = {this.state.hDay[i]} time = {this.state.hTime[i]} hTempl = {this.state.hTempl[i]} hTemph = {this.state.hTemph[i]} icon = {this.state.hIcon[i]} cond ={this.state.hCond[i]}/> );	
		}

		// display all weather data
		return (
			//current weather	test°test
		<div>			
		<table>

			{weekly}</table>
		</div>		
		);	

	
	}//end render

	//EM set return of weekly variables
	parseHourlyResponse = (parsed_json) =>{
		var hTempl = new Array();
		var hTemph = new Array();
		var hCond =new Array();
		var hTime = new Array();
		var hIcon = new Array();
		var hDay = new Array();
		for(var i =0; i < 6; i++){
			hDay[i] = (parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['weekday']);
			hTempl[i] = (parsed_json['forecast']['simpleforecast']['forecastday'][i]['low']['celsius']);			
			hTemph[i] = (parsed_json['forecast']['simpleforecast']['forecastday'][i]['high']['celsius']);
			hCond[i] = (parsed_json['forecast']['simpleforecast']['forecastday'][i]['conditions']);
			hTime[i] = (parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['day'])+"/"+(parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['monthname']);
			
			hIcon[i]=(parsed_json['forecast']['simpleforecast']['forecastday'][i]['icon_url']);
		}		
		this.setState({hTempl : hTempl,hTemph:hTemph,hDay:hDay, hCond : hCond, hTime : hTime, hIcon : hIcon});				    
	}
}
