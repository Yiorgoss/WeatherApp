// import preact
import { h, Component } from 'preact';
import Router from 'preact-router';

// import required Components from 'components/'
import Iphone from './iphone';
import Ipad from './ipad';
import Favourite from './favourites';

const App = () => 
	<Router>
		<Iphone path="/:favourites?" />
		<Favourite path="/favourites/:favourites" />
	</Router>

export default App
// export default class App extends Component {
// //var App = React.createClass({

// 	// once the components are loaded, checks if the url bar has a path with "ipad" in it, if so sets state of tablet to be true
// 	componentDidMount() {
// 		const urlBar = window.location.href;
// 		if(urlBar.includes("ipad")) {
// 			this.setState({
// 				"isTablet": true
// 			});
// 		} else {
// 			this.setState({
// 				"isTablet": false
// 			});
// 		}
// 	}

// 	/*
// 		A render method to display the required Component on screen (iPhone or iPad) : selected by checking component's isTablet state
// 	*/
// 	render(){

// 		<Router>
// 			<div id="app" >
// 				<Iphone path="/" />
// 			</div>
// 			<div>
// 				<Favourite path="/favourites" />
// 			</div>
// 		</Router>
// 		// if(this.state.isTablet){
// 		// 	return (
// 		// 		<div id="app">
// 		// 			<Ipad/ >
// 		// 		</div>   				
// 		// 	);
// 		// } 
// 		// else {
// 		// 	return (
// 		// 		<div id="app">
// 		// 			<Iphone/ >
// 		// 		</div>
// 		// 	);
// 		// }
// 	}
// }