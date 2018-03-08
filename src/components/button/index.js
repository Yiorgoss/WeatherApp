// import preact
import { h, render, Component } from 'preact';
	
export default class Button extends Component {
	// rendering a function when the button is clicked
	render({clickFunction,buttonName}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
   	 }

		return (
			<div>
				<button onClick={clickFunction}>
					{buttonName}
				</button>
			</div>
		);
	}
}
