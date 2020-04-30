import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { getHeaderHeight, getFooterHeight } from '../../Helper/helpermethods';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning'
import clsx from 'clsx';

import { successBgColor, successFgColor, errorBgColor, errorFgColor, infoBgColor, infoFgColor } from '../Common/colors';

const variantBgColor = {
  'success': successBgColor(),
  'warning': 'yellow',
  'error': errorBgColor(),
  'info': infoBgColor(),
};
const variantFgColor = {
  'success': successFgColor(),
  'warning': 'yellow',
  'error': errorFgColor(),
  'info': infoFgColor(),
};

const styles = {
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9
  },
  message: {
    display: 'flex',
    alignItems: 'left',
  },
};

class MySnackbar extends Component {

  getIcon(variant) {

    if (variant === 'success')
      return <CheckCircleIcon className={clsx(styles.icon, styles.iconVariant)} />
    else if (variant === 'warning')
      return <WarningIcon className={clsx(styles.icon, styles.iconVariant)} />
    else if (variant === 'error')
      return <ErrorIcon className={clsx(styles.icon, styles.iconVariant)} />
    else if (variant === 'info')
      return <InfoIcon className={clsx(styles.icon, styles.iconVariant)} />
    else
      return <></>

  }

  render() {
    //console.log('x: ' + this.props.screenDimensions.width + ' y: ' + this.props.screenDimensions.height);
    let variant = this.props.state.variant;
    let open = this.props.state.openMessage;
    let message = this.props.state.message;
    let duration = this.props.duration;
    let width = 400;
    let left = this.props.screenDimensions ? this.props.screenDimensions.width - (width + 50) : 0;
    let top = this.props.useScreenDimensions === true ? this.props.screenDimensions.height - (getHeaderHeight() + getFooterHeight() + 50) : 0
    let style = this.props.useScreenDimensions === true ? { width: width + 'px', position: 'absolute', left: left, top: top } : null

    //const Icon = variantIcon[variant];
    const bgColor = variantBgColor[variant];
    const fgColor = variantFgColor[variant];

    return (
      <Snackbar
        anchorOrigin={{ vertical: this.props.vertical, horizontal: this.props.horizontal }}
        open={open}
        autoHideDuration={duration}
        onClose={this.props.handleClose}
        style={style} >
        <SnackbarContent
          message={
            <div style={{ display: 'flex', flex: '1', flexFlow: 'row' }}>              
              {this.getIcon(variant)}
              <div style={{ flexGrow: '1', flexFlow: 'column', paddingLeft: '5px', paddingRight: '5px', wrap: true }}>
                {message}
              </div>
            </div>
          }
          style={{ backgroundColor: bgColor, color: fgColor, padding: '20px', fontSize: '20px', textAlign: 'left' }}
        />
      </Snackbar>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    screenDimensions: state.parametricdata_reducer.screenDimensions
  }
}

export default connect(mapStateToProps, null)(MySnackbar);