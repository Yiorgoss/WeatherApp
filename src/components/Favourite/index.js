import { h } from 'preact';

const Favourites = ({ favourites }) => 

	<div>
		<h1>Favourites</h1>
		{ favourites && favourites.length ?
			<div>
				<ul>
				{ favourites.map( favourite =>
					<li>
						{favourite.city}, {favourite.country}
					</li>
				)}
				</ul>
			</div>
		: "No Favourites"}
	</div>

export default Favourites