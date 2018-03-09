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
		this.state.locationScreen = false;
		// button display state
	}
	

	// the main render method for the iphone component
	render() {
		console.log("hourly render" + this.props.hTemp[0]);
		
		//em create hourly breakdown variable (div containers to be drawn to screen)
		var hourly = [];
		for(var i =0; i <6; i++){		
			hourly.push(<div class = {style.row}> <HourWeather time = {this.props.hTime[i]+":00"} temp = {this.props.hTemp[i]} icon = {this.props.hIcon[i]}/> </div>);	
		}

		// display all weather data
		return (
			//current weather
	<div>{this.props.location}
		       <div class = {style.column6}>
			{hourly}</div>
			</div>
		);	

	
	}//end render

}
