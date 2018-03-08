// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import CurrentWeather from '../currentWeather';

import Favourite from '../Favourite';
import HourlyWeather from '../hourlyWeather';
export default class FavouriteScreen extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		this.state.screen = "";
		this.state.cond = "";
		this.state.selectedLocation = "";
		this.state.location = "London";
		this.state.favourites = "";
		this.state.testLocation = "";

	}
	

	// the main render method for the iphone component
	render() {    	

		return (
			
			<div>
			
				<input type="text" onKeyDown={this.handleChangeFor('city')}  />
			<div>
				{this.state.location.city}
			</div><div>
				{this.state.testLocation}
			</div>
				<Favourite favourites={this.state.favourites} />
		<Button clickFunction={() => this.addToFavourite(this.state.location) } display="Add To Favourite" />
	
			</div>
		);				


	
	}//end render
	

	addToFavourite = (location) => {
		// console.log(this.location);
		this.setState({
			favourites: this.state.location,
		});
		console.log(this.state.favourites);

	}
	
	searchLocation = (location) => {
		$.ajax({
	  		url:      "http://autocomplete.wunderground.com/aq",
	    		dataType: "jsonp",
	   	 	jsonp:    "cb",
	   	 	data:     {
				format: "json",
				query:  location,
	  	  	},
		    	success: this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }		
		
		});
	}	


	parseResponse = (parsed_json) => {		
		var loc = parsed_json["RESULTS"][0]['name'];
		this.setState({testLocation : loc});	
		this.setState({location : loc});	
		
		this.props.changeLocation(loc);
	}

	handleChangeFor = (propertyName) => (event) => {
		const { location } = this.state;
		const newLocation = {
			...location,
			[propertyName]: event.target.value
		};

		//update main screen
		this.searchLocation(newLocation.city);
	}
	
}
