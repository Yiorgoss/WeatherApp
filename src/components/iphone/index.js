// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Favourite from '../favourites';
import { Link } from 'preact-router/match';

export default class Iphone extends Component {

	constructor(props){
		super(props);
		this.state = {
			location: {
				city: 'London',
				country: 'Uk',
			},
			favourites: [],
			page1: true,
			page2: false,

		};
		this.setState({ display: true });
	}

	fetchWeatherData = () => {
		var url = "http://api.wunderground.com/api/a5050eda0657b131/conditions/q/"+this.state.location.country+"/"+this.state.location.city+".json";		
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		this.setState({ 
     		display: false,
    	});
	}
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
     		   imgSrc: conditions
		});      
	}
	fetch10DayData = () => {
		//Get  10 day forecast
		var url = "http://api.wunderground.com/api/a5050eda0657b131/forecast10day/q/UK/London.json";
		$.ajax({
      url: url,
      dataType: "jsonp",
      success: this.parseResponse,
      error: function( req, err ){ console.log( 'API_CALL FAILED'+ err ) }
		})
		this.setState({ page1: false, page2: true});
	}
	addToFavourite = (location) => {
		// console.log(this.location);
		if( this.state.favourites.indexOf(location) === -1){
			this.setState({
				favourites: this.state.favourites.concat( location),
			});
		}
	}
	removeFavourite = (location) => {
		var index = this.state.favourites.indexOf(location);
		console.log(this.state.favourites);
		if( index != -1 ) {
			this.state.favourites.splice(index, 1);
			this.forceUpdate();
		}
		console.log(this.state.favourites);
	}
	changeWeather = () => {
		this.fetchWeatherData();
		this.setState({
			page1: true,
			page2: false,
		});
	}
	changeLocation = () => {
		this.setState({
			page1: false,
			page2: true,
		});
	}

	showFavourites = () => {
		var temp = this.state.favourites
		var str="/favourites/";
		var i;
		for( i=0;i<temp.length; i++){
			str += temp[i].city+"-"+temp[i].country+"=";
		}
		return str;
	}
	handleChangeFor = (propertyName) => (event) => {
		const { location } = this.state;
		const newLocation = {
			...location,
			[propertyName]: event.target.value
		};
		this.setState({ location: newLocation });
	}
	componentDidMount(){
		this.fetchWeatherData();
	}
	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		// const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
    	var imgSrc = this.state.cond ? this.state.cond : 'clear-iphone';
    	imgSrc = "clear-iphone";
    	var bgpic = {
     		backgroundImage: 'url(../../assets/backgrounds/'+imgSrc+'.jpg)'
    	};
		
		// display all weather data
		return (
			<div class={ style.container } style={bgpic}> 
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ style.temp }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					{ this.state.page1 ? 
						<Button class={ style_iphone.button } clickFunction={this.changeLocation } display="Change Location"/ > 
					: null }
				</div>
				{ this.state.page2 ? 
				<div>
					<input type="text" onChange={this.handleChangeFor('city')} value={this.state.location.city} />
					<input type="text" onChange={this.handleChangeFor('country')} value={this.state.location.country} />
					<Button class={ style_iphone.button } clickFunction={() => this.changeWeather() } display="Show Weather" />
					{ this.state.favourites.indexOf(this.state.location) === -1 ? 
						<Button class={ style_iphone.button } clickFunction={() => this.addToFavourite(this.state.location) } display="Add To Favourite" />
						: <Button class={ style_iphone.button } clickFunction={() => this.removeFavourite(this.state.location) } display="Remove Favourite" />
 					}
					<Link href={this.showFavourites()}> Favourite </Link>
				</div>
				: null }

			</div>
		);
	}
}
