/** @module shell/Spinner */

import React, {Component} from 'react';

class Spinner extends Component{
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className='loading'>Loading</div>
		)
	}
};

export default Spinner;
