import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHeaderHeight } from '../../Helper/helpermethods';
import store from '../../Redux/Store/store'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

class Body extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectToLogin: false
		}
	}

	componentDidMount() {
		//console.log('Body: this.props.token:' + this.props.token + ' tokenjwt.data:' + this.props.token.data + ' tokenjwt.data.token' + this.props.token.data.token)
		if (this.props.isLoginPage === undefined) {			
			var dtNow = new Date()
			if (this.props.token && this.props.token.data) {
				var dtTokeExpiresAt = new Date(this.props.token.data.expiresAt);
				var dtDiffs = (dtTokeExpiresAt - dtNow)
				console.log('Body: dtTokeExpiresAt:' + dtTokeExpiresAt)
				console.log('Body: dtNow:' + dtNow)
				console.log('Body: dtDiffs:' + dtDiffs)
				//var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
				//console.log('setUTCSeconds: ' + d.setUTCSeconds(utcSeconds));
				if (Math.abs(dtDiffs) <= 0) {
					this.setState({ redirectToLogin: true });
				}
			} else {				
				this.setState({ redirectToLogin: true });				
			}
		}
	}

	render() {

		// let ww = this.props.screenDimensions ? this.props.screenDimensions.width : undefined;
		// let bodyWidth = '100%';
		// if (ww)
		// 	bodyWidth = ww
		if (this.state.redirectToLogin === true) {
			console.log('body : RESET_ACTION')
			store.dispatch({ type: "RESET_ACTION", payload: null });
			return <Redirect to="/login" />;
		} else {

			let wh = this.props.screenDimensions ? this.props.screenDimensions.height : undefined;
			let bodyHeight = '100%';
			if (wh)
				bodyHeight = wh - getHeaderHeight()

			return (
				<div style={{ width: '100%', height: bodyHeight, overflowY: 'hidden' }}>
					{this.props.children}
				</div>
			)
		}
	}
}

function mapStateToProps(state) {
	return {
		screenDimensions: state.parametricdata_reducer.screenDimensions,
		token: state.token_reducer.token
	}
}

export default connect(mapStateToProps, null)(withRouter(Body))