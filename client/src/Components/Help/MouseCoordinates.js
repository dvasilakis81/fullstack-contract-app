import React, { Component } from 'react';

class MouseCoordinates extends Component {
  constructor(props) {
    super(props);

    this.state = { x: 0, y: 0 };
  }

  _onMouseMove(e) {
    this.setState({ x: e.screenX, y: e.screenY });
  }

  render() {
    const { x, y } = this.state;
    return <div onMouseMove={this._onMouseMove.bind(this)}>
      <h1>Mouse coordinates: {x} {y}</h1>
    </div>;
  }
}

export default MouseCoordinates