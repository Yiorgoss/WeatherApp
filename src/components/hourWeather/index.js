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
	}

	//render weather data 
	render() {
    		
		return (
			//current weather		       
						
			<div  class = {style.column}>			
			<div> <img src={this.props.icon} alt={this.props.icon}></img> </div>
			<div> {this.props.temp}° </div>
			<div> {this.props.time}</div>

			</div>
		);			


	
	}//end render
	    
	
}
