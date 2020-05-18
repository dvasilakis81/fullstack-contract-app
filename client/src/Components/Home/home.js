import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

class Home extends Component {

  RedirectTo() {
    var tokenjwt = this.props.token;
    var dtNow = new Date()
    if (this.props.token && this.props.token.data && this.props.token.data.expiresAt) {
      var tokenExpiresAt = new Date(this.props.token.data.expiresAt);
      if (tokenExpiresAt <= dtNow)
        return <Redirect push to='/login' />
      else
        return <Redirect push to='/contracts' />
    } else
      return <Redirect push to='/login' />
  }

  render() {
    return (
      <div>
        {this.RedirectTo()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token_reducer.token,
  }
}

export default connect(mapStateToProps, null)(Home)