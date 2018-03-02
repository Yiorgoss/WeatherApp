import { h } from 'preact';

const Favourite = ({ favourites }) => 

	<div>
		<h1>Favourites</h1>
		{ favourites && favourites.length ?
			<div>
				<ul>
				{ this.state.favourites.map( favourite =>
					<li>
						{favourite.city}, {favourite.country}
					</li>
				)}
				</ul>
			</div>
		: "No Favourites"}
	</div>

export default Favourite