// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import style from './style';
import Favourite from '../Favourite';
import CurrentWeather from '../currentWeather';
export default class FavouriteScreen extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		this.state.screen = "";
		this.state.cond = "";
		this.state.selectedLocation = "";
		this.state.location = "";
		this.state.url = "/q/UK/London.json";

		
	}
	
	// the main render method for the iphone component
	render() {    	
		//create div elements with all favourites in
		var favDivs = [];
		var f  =[];
		for(var i = this.props.favourites.length-1; i >=0; i--){		
			favDivs.push(  <Favourite url = {this.props.favurl[i]} loc = {this.props.favourites[i]} deleteFavourite = {this.props.deleteFavourite} changeLocation = {this.props.changeLocation} /> );	
		}
		if(this.props.favourites.length == 0){
			f.push(<tr class = {style.addfavourites}> Search for location to add to favourites</tr>);
		}

		return (		
     
			//display location information	
			<div class = {style.rows}>
			<CurrentWeather urlEnd = {this.props.url}/>
			<div class = {style.row}>			
				<input type="text" placeholder="Search location" onclick="this.select();" onkeydown={this.handleChangeFor('city')}  onchange = {() =>this.addToFavourite(this.state.location)}   onfadeout = {() =>this.addToFavourite(this.state.location)} />
			<div>{this.state.location}</div>			
				
			</div>
	
			<table class= {style.favourites}>{favDivs}</table>
			{f} 
			</div>
		);	
	
	}//end render	
	
	//add a location to favourite list
	addToFavourite = (location) => {
		// console.log(this.location);
		if( this.props.favourites.indexOf(location) === -1&&this.state.location!=""){
			this.props.favourites= this.props.favourites.concat(this.state.location);
			this.props.favurl = this.props.favurl.concat(this.state.url);
		}
		this.props.saveFavourite(this.props.favourites,this.props.favurl);
		console.log(this.props.favourites);
	}
	
	//perform an API call to search for a location name
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
	//parse response for auto complete, and extract the link and location name
	parseResponse = (parsed_json) => {		
		var loc = parsed_json["RESULTS"][0]['name'];
		var url = parsed_json["RESULTS"][0]['l'];
		var type = parsed_json["RESULTS"][0]['type'];
		//only allow cities (country API links are incompatible with hourly breakdown)
		if(type == "city"){
			this.setState({location : loc});	
			this.setState({url : url});
		} 		
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
