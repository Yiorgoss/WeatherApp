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
	}
	
	// the main render method for the iphone component
	render() {    		
		return (
		//return location, time and graphic for a single favourite 
		//table to keep elements inline		
			<tr>	
				<td>{this.props.day}</td>
				<td>{this.props.time}</td>
				<td><img src={this.props.icon} alt={this.props.icon}> </img></td>				
				<td> {this.props.hTempl}  °</td>
				<td> {this.props.hTemph}  ° </td>
				<td>{this.props.cond} </td>
			</tr>
		);	
	
	}//end render	
	

	
}
