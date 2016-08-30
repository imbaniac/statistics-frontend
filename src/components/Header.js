import React, {PropTypes} from 'react';

const Header = ({logout, access_token}) => {
	return (
		<nav className="navbar navbar-default">
			<a className="navbar-brand" href="#">BaseStat</a>
			{access_token && <button onClick={logout}
				className="btn btn-default navbar-btn pull-right">Logout</button>}

		</nav>
	);
};

Header.propTypes = {
	logout: PropTypes.func.isRequired,
	access_token: PropTypes.string
};

export default Header;
