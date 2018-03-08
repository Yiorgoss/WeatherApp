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
	
		this.fetchHourlyData();
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
		       <div> 
				<div class = {style.rows}> {hourlyIcon} </div>
				<div class = {style.rows}>{hourlyTemp}</div>	
				<div class = {style.rows}>{hourlyTime} </div>				
				
			</div>

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
