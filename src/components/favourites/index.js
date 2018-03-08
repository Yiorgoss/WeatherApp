import { h } from 'preact';

const Favourite = ({ favourites }) => 
	
	<div>
	<p hidden>{ favourites=favourites.split("=")}</p>
		<h1>Favourites</h1>
		{favourites && favourites.length ?
			<div>
				<ul>
				{ favourites.map( favourite =>
					favourite.length !== 0  ?
						<li>
							{favourite.split("-")[0]}, {favourite.split("-")[1]} : 
							<button> Add/Remove </button>
						</li>
					: null 
				)}
				</ul>
			</div>
		: "No Favourites" }
	</div>

export default Favourite