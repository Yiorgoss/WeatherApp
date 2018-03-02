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
		this.state = {
			location: {
				city: 'London',
				country: 'Uk',
			},
			favourites: [],
		};
		// this.state.location = {
		// 	city: "London",
		// 	country: "Uk"
		// };
		// this.state.favourites = [];
		this.setState({ display: true });
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/a5050eda0657b131/conditions/q/"+this.state.location.country+"/"+this.state.location.city+".json";		
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ 
      display: false,
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
    //this.setState({ display:false });
	}
	addFavourites = (locationn) => {
		//console.log(this.location);
		if( this.state.favourites.indexOf(locationn) === -1){
			this.setState({
				favourites: this.state.favourites.concat( this.state.location)
			});
		}
		console.log(this.state.favourites);

	}
	handleChangeFor = (propertyName) => (event) => {
		const { location } = this.state;
		const newLocation = {
			...location,
			[propertyName]: event.target.value
		};
		this.setState({ location: newLocation });
	}
	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
    	var imgSrc = this.state.cond ? this.state.cond : 'clear-iphone';
    	var bgpic = {
     		backgroundImage: 'url(../../assets/backgrounds/'+imgSrc+'.jpg)'
    	};
		
		// display all weather data
		return (
			<div class={ style.container } style={bgpic}> 
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
				<div>
				<input type="text" onChange={this.handleChangeFor('city')} value={this.state.location.city} />
				<input type="text" onChange={this.handleChangeFor('country')} value={this.state.location.country} />
				<button onClick={() => this.addFavourites(this.state.location)}> Add to Favourites </button>
				</div>
				<div>
					<h1>Favourites</h1>
					{ this.state.favourites && this.state.favourites.length ?
						<div>
							<ul>
								{ this.state.favourites.map( favourite =>
									<li>
										{favourite.city}, {favourite.country}
									</li>
								)}
							</ul>
						</div>
					: "favourites"}
				</div>
			</div>
		);
	}
	//Parse the conditions and return the corresponding image URL
	parseConditions = (conditions) => {
    /* ICONS
		clear - 							sunny w/ white clouds
		overcast - 							grey clouds
		Any cloud (regex for cloud)- 		white clouds
		Thunderstorm (any)- 				grey cloud w/ lightning bolt
		sunny- 							 	sun
		light rain/drizzle- 				white cloud w/ rain
		heavy rain/rain- 					Grey cloud w/ rain
		Any snow (regex for snow)- 			snowy
		*/

		/* BG-IMAGES
		clear (sunny with some clouds)
		sunny (sun with no clouds)
		overcast (grey clouds(?))
		cloudy* (white clouds)
		light rain
		heavy rain
		snowy*
		thunderstorm*
		*/		
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

		return "background-image: url('---DEFAULT---');"; //Default
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
}
