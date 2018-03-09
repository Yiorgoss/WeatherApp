// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import CurrentWeather from '../currentWeather';

import style from './style';
import Favourite from '../Favourite';
export default class FavouriteScreen extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		this.state.icon = "";
		this.state.temp= "";
		this.state.time = "";
		this.state.cond = "";		
		this.fetchWeatherData();
	}
	
	// the main render method for the iphone component
	render() {    
		
		this.fetchWeatherData();
		return (
		//return location, time and graphic for a single favourite 
		//table to keep elements inline		
			<tr>
				
				<td><input type="radio" name = "locselect" id ="locselect" onChange = {() => this.props.changeLocation(this.props.loc,this.props.url)}/></td>
				<td>{this.props.loc}</td>
				<td>{this.state.time}</td>
				<td><img src={this.state.icon} alt={this.state.icon}> </img></td>		
			</tr>
		);	
	
	}//end render	
	
	//fetch whether data for a URL and parse it 
	fetchWeatherData = () => {		
		var url = "http://api.wunderground.com/api/a5050eda0657b131/conditions"+(this.props.url)+".json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseFavourite,
			error : function(req, err){ console.log('API call failed ' + err);
			
			console.log(url);}
		})
		console.log(" favourite "+url);
	}	
	

	//parse the api call for a single favourite and extract the icon and time
	parseFavourite = (parsed_json) => {
		var icon=(parsed_json['current_observation']['icon_url']);
		var time=(parsed_json['current_observation']['observation_time_rfc822']);
		this.state.icon = icon;
		this.state.time = new Date(Date.parse(time)).getHours()+":"+new Date(Date.parse(time)).getMinutes();
		console.log(this.state.time);
	}

	
}
