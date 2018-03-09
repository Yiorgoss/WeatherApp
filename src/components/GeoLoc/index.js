import { h, render, Component } from "preact";
import $ from "jquery";
import Button from "../button";

export default class Iphone extends Component {


	constructor(props) {
		super(props);
		this.state.location ="";
navigator.geolocation.getCurrentPosition(this.successCallback, this.errorCallBack, {timeout: 10000});
	}
	convertToCity = (parsed_json) => {
		var locationn = parsed_json['results'][3]['formatted_address'].split(", ");
		this.setState({
			location:  locationn[0],				
			
		});
		console.log("you are in: "+ this.state.location);
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
		this.props.searchLocation(this.state.location);
	}
	render(){
		return(
			<Button clickFunction={()=>this.geoLocation()} buttonName="locate me" />
	)
	}
}
