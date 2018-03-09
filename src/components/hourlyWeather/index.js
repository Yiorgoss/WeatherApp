// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import 
import CurrentWeather from '../currentWeather';
import HourlyWeather from '../hourlyWeather';
import HourWeather from '../hourWeather';
export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		//hourly states
		this.state.hTemp = [];
		this.state.hCond = [];
		this.state.hTime =[];
		this.state.hIcon = [];
		this.state.locationScreen = false;
		// button display state
		this.fetchHourlyData(this.props.urlEnd);
	}

	//get hourly forecast
	fetchHourlyData = (urlE) => {
		var url = "http://api.wunderground.com/api/a5050eda0657b131/hourly/"+urlE+".json";		
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseHourlyResponse,
			error : function(req, err){ console.log('API call failed ' + err); 
			console.log("hourly "+url)}
		})
	}

	

	// the main render method for the iphone component
	render() {
    		
		//em create hourly breakdown variable (div containers to be drawn to screen)
		var hourly = [];
		for(var i =0; i <6; i++){		
			hourly.push(<div class = {style.row}> <HourWeather time = {this.state.hTime[i]+":00"} temp = {this.state.hTemp[i]} icon = {this.state.hIcon[i]}/> </div>);	
		}

		// display all weather data
		return (
			//current weather	°
		       <div class = {style.column6}>{hourly}</div>
			
		);	

	
	}//end render

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
}
