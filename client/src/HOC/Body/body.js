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
		if (this.props.isLoginPage === undefined) {
			var l = window.history.length * -1
			var dtNow = new Date()
			if (this.props.token && this.props.token.data) {
				var dtTokeExpiresAt = new Date(this.props.token.data.expiresAt);
				var dtDiffs = (dtTokeExpiresAt - dtNow)
				if (dtDiffs <= 0) {										
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
		if (this.state.redirectToLogin) {
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