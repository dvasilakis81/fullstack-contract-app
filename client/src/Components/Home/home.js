import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

class Home extends Component {

  RedirectTo() {
    var tokenjwt = this.props.token;
    if (tokenjwt && tokenjwt.data && tokenjwt.data.token)
      return <Redirect push to='/contracts' />
    else
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