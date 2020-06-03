import React, { Component } from 'react';

class ContractsPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openMessage: this.props.openMessage,
      message: this.props.message,
      variant: this.props.variant
    }
    this.handleClose = this.handleClose.bind(this, '');
  }

  handleClose = (event, reason) => {
    this.setState({ message: '', openMessage: false, submitButtonDisabled: false });
  };

  componentDidUpdate() {
    if (this.state.openMessage !== this.props.openMessage)
      this.setState({ openMessage: this.props.openMessage, message: this.props.message, variant: this.props.variant })
  }

  render() {
    //console.log('ContractsPopup: message: ' + this.state.message)
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', width: '800px', height: '800px', border: '3px solid #33C1FF', overflowX: "hidden", overflowY: 'hidden' }}>
          <div style={{ display: 'flex', background: '#33C1FF', color: 'white', fontSize: '20px', fontWeight: '900', padding: '20px', justifyContent: 'center', alignItems: 'center', height: '30px' }}>
            {this.props.header}
          </div>
          <div style={{ display: 'flex', flex: '1', flexFlow: 'column', flexWrap: 'wrap', overflowX: 'hidden', overflowY: 'hidden' }}>
            {this.props.children}
          </div>
        </div>
        {/* <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.openMessage}
          autoHideDuration={5000}>
          <SnackbarContent
            message={
              <div style={{ display: 'flex', flex: '1', flexFlow: 'row' }}>
                {this.getIcon(this.state.variant)}
                <div style={{ flexGrow: '1', flexFlow: 'column', paddingLeft: '5px', paddingRight: '5px', wrap: true }}>
                  {this.state.message}
                </div>
              </div>
            }
            style={{ backgroundColor: 'red', color: 'white', padding: '20px', fontSize: '20px', textAlign: 'left' }}
          />
        </Snackbar> */}
        {/* <MySnackbar state={this.state} duration={5000} handleClose={this.handleClose} vertical='top' horizontal='center' useScreenDimensions={false} /> */}
      </>
    )
  }
}

export default ContractsPopup