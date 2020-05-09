import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

const StyledTooltip = withStyles({
  tooltip: {
    color: 'black',
    backgroundColor: 'grey',
    border: '1px solid black',
    transform: document.getElementById('root').style.transform
  }
})(Tooltip);

//backgroundColor: '#FFFEF4'
const styles = theme => ({
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    },
    backgroundColor: '#d1d1d1'    
  }  
});

const StyledTextField = props => {
  const { classes, ...rest } = props;

  var tooltipTemplate = props.tm ? props.tm : null;
  var label = props.label ? props.label : '';
  var isRequired = props.isRequired ? props.isRequired : true;
  var isDisabled = props.isDisabled ? props.isDisabled : false;
  var inputLabelProps = { shrink: true };
  var isDisabled = props.isDisabled ? props.isDisabled : false;
  var type = props.tp;
  var id = props.id;
  var stateValue = props.stateValue;
  var onChange = props.onChange;
  var inputProps = props.inputProps ? props.inputProps : { style: { textAlign: 'center' } };
  var style = props.style;

  if (tooltipTemplate) {
    return <StyledTooltip
      placement="top"
      disableHoverListener={true}
      title={
        <React.Fragment>
          <Typography
            color="transparent"
            style={{
              background: "transparent",
              padding: "0px",
              margin: "0px",
              transform: document.getElementById('root').style.transform
            }}>
            {tooltipTemplate}
          </Typography>
        </React.Fragment>
      }>
      <TextField
        disabled={isDisabled}
        required={isRequired}
        type={type}
        id={id}
        value={stateValue}
        variant='standard'
        style={style}
        onChange={onChange}
        inputProps={inputProps}
        InputProps={{ classes }}
        InputLabelProps={inputLabelProps}
        size='small'
      />
    </StyledTooltip>
  }
  else {
    return <TextField
      disabled={isDisabled}
      required={isRequired}
      type={type}
      id={id}
      value={stateValue}
      variant='standard'
      style={style}
      onChange={onChange}
      inputProps={inputProps}
      InputProps={{ classes }}
      InputLabelProps={inputLabelProps}
      size='small'
    />
    // endAdornment: <InputAdornment position="end">€</InputAdornment> at InputProps
  }
};

export default withStyles(styles)(StyledTextField);