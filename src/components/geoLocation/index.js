import { h, render, Component } from "preact";
import $ from "jquery";
import Button from "../button";

export default class Iphone extends Component {


	constructor(props) {
		super(props);

	}
	convertToCity = (parsed_json) => {
		var locationn = parsed_json['results'][3]['formatted_address'].split(", ");
		this.setState({
			location: {
				city: locationn[0],
				country: locationn[1],
			},
		});
		console.log("you are in: "+ this.state.location.city+", "+this.state.location.country);
	}
	successCallback = (pos) => {
		var crd = pos.coords;
		this.setState({
			lat: crd.latitude,
			long: crd.longitude,
		});
		var long = this.state.long.toFixed(4);
		var lat = this.state.lat.toFixed(4);
		var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyBCrRRJ42Mu41G6Pauhfo4MXdElDmfgKdM";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.convertToCity,
			error : function( req, err){ console.log(' API call failed ' + err); }
		})
	}
	errorCallBack = () => {
		console.log("DIDN'T WORK");

	}
	geoLocation = () => {
		//geolocation get long/lat
		navigator.geolocation.getCurrentPosition(this.successCallback, this.errorCallBack, {timeout: 10000});
	}
	render(){
		return(
			<Button clickFunction={()=>this.geoLocation()} buttonName="locate me" />
			)
		}
	}