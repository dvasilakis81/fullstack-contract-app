import React, { Component } from 'react';
import { setDimensions } from '../../Helper/helpermethods'
import windowSize from 'react-window-size';
import store from '../../Redux/Store/store'
import { connect } from 'react-redux'

import './layout.css'

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectToLogin: false
		}
	}

	componentDidMount() {
		//document.body.style.zoom = 0.9
		// document.body.style.transform = 'scale(0.8)';
		// document.body.style.transformOrigin= '0 0';
		//var scale = 'scale(0.5)';   
		//  document.body.style.webkitTransform = scale;    // Chrome, Opera, Safari
		//  document.body.style.msTransform = scale;       // IE 9
		//  document.body.style.transform = scale;     // General    
	}

	render() {

		var dimensions = setDimensions(store);
		//  document.getElementById('root').style.width = dimensions.width;
		// / document.getElementById('root').style.height = dimensions.height;

		// document.getElementById('root').setAttribute('style' ,'width: ' + dimensions.width + ';height: ' + dimensions.height)

		return (
			<div style={{ width: dimensions.width, height: dimensions.height }}>
				{this.props.children}
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		token: state.token_reducer.token
	}
}

export default connect(mapStateToProps, null)(windowSize(Layout))