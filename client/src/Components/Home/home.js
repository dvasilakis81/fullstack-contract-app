import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { isTokenExpired } from '../../Helper/helpermethods';

class Home extends Component {

  RedirectTo() {
    if (isTokenExpired(this.props.token) === true)
      return <Redirect push to='/login' />
    else
      return <Redirect push to='/contracts' />
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