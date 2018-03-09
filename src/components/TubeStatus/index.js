// import preact
import { h, render, Component } from 'preact';
import styles from './style';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import CurrentWeather from '../currentWeather';
import Favourite from '../Favourite';
export default class FavouriteScreen extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		this.state.names = [];
		this.state.status =[];
			
			
		this.fetchTubeStatus();
	}
	
	//render rows for each tube statoin
	render() {    
		var tubestat = [];
		for(var i=0; i<10; i++){
			var style = {
				background: this.getTubeColor(this.state.names[i]),
				paddingLeft : '10px',	
				paddingRight :'10px',
				paddingTop : '10px',
				display : 'flex',
				justifyContent: 'center'
			}
			tubestat.push(<tr><td class = {styles.tubeName} style = {style} >{this.state.names[i]}</td><td class = {styles.tubeStatus}>{this.state.status[i]}</td></tr>);			
		}
		
		return (
		//return the table of all tube stations	
			<table class ={style.tubes}>{tubestat}
			</table>
		);	
	
	}//end render	
	
	//switch color based on tube name
	getTubeColor (tubeName){
		switch(tubeName){
			case "Bakerloo":
			return "#b36305";
			break;

			case "Central":
			return "#e32017";
			break;

			case "Circle":
			return "#ffd300";
			break;

			case "District":
			return "#00782a";
			break;

			case "Dlr":
			return "#00A4A7";
			break;

			case "Hammersmith & City":
			return "#f3a9bb";
			break;

			case "Jubilee":
			return "#a0a5a9";
			break;

			case "Metropolitan":
			return "#9b0056";
			break;

			case "Northern":
			return "#000";
			break;

			case "Overground ":
			return "#ee7c0e";
			break;
			
			case "Piccadilly":
			return "#003688";
			break;

			case "Tramlink":
			return "#84B817";
			break;

			case "Victoria":
			return "#0098d4";
			break;
			
			case "Waterloocity ":
			return "#95cdba";
			break;



		}
		return "#0000000";		

	}
	//fetch tube data and parse it 
	fetchTubeStatus = () => {		
		var url = "https://api.tfl.gov.uk/Line/Mode/tube/Status";
		$.ajax({
			url: url,
			success : this.parseTube,
			error : function(req, err){ console.log('API call failed ' + err);
			
			}
		})
		console.log(" tube status "+url);
	}	
	

	//parse the api call for a single favourite and extract the icon and time
	parseTube = (parsed_json) => {
		var status =[];
		var names =[];
		for(var i=0; i < 10; i++){
			names[i] = parsed_json[i]['name'];
			status[i] = parsed_json[i]['lineStatuses'][0]['statusSeverityDescription'];
			console.log("test" +parsed_json[i]['lineStatuses'][0]['statusSeverityDescription']);
		}
		this.setState({names : names, status: status});	
		
	}

	
}
