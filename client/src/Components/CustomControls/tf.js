import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

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
  //const { classes, ...rest } = props;

  var tooltipTemplate = props.tm ? props.tm : null;
  var isRequired = props.isRequired;
  var isDisabled = props.isDisabled;
  var inputLabelProps = { shrink: true };
  var type = props.tp;
  var id = props.id;
  var stateValue = props.stateValue;
  var onChange = props.onChange;    
  var inputProps = props.inputProps ? props.inputProps : { style: { textAlign: 'center' } };
  var InputProps = props.InputProps ? props.InputProps : null;
  var multiline = props.multiline ? props.multiline : null;
  var style = props.style;
  var size = 'small'

  if (props.select === true) {
    if (tooltipTemplate) {
      return <StyledTooltip
        placement="top"
        disableHoverListener={false}
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
          select
          disabled={isDisabled}
          required={isRequired}
          id={id}
          value={stateValue}
          style={style}
          onChange={onChange}
          inputProps={inputProps}
          InputProps={InputProps}
          SelectProps={{ native: true }}
          variant='standard'
          size={size}>
          <option />
          {props.values}
        </TextField>
      </StyledTooltip>
    }
    else {
      return <TextField
        select
        disabled={isDisabled}
        required={isRequired}
        id={id}
        value={stateValue}
        style={style}
        onChange={onChange}
        inputProps={inputProps}
        InputProps={InputProps}
        SelectProps={{ native: true }}
        variant='standard'
        size={size}>
        <option />
        {props.values}
      </TextField>
    }
  }
  else {
    if (tooltipTemplate) {
      if (type === 'date') {
        var w = props.partOfProtocol === true ? props.width : '100%';
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
            multiline={multiline}
            rows={3}
            disabled={isDisabled}
            required={isRequired}
            type={type}
            id={id}
            value={stateValue}
            variant='standard'
            style={style}
            onChange={onChange}
            inputProps={inputProps}
            InputProps={InputProps}
            InputLabelProps={inputLabelProps}
            size={size}
          />
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin=""
              id={id}
              value={stateValue}
              style={{ margin: '0px', padding: '0px', width: w, textAlignLast: 'center' }}
              onChange={props.onChangeDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider> */}
        </StyledTooltip>
      }
      else {
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
            multiline={multiline}
            rows={3}
            disabled={isDisabled}
            required={isRequired}
            type={type}
            id={id}
            value={stateValue}
            variant='standard'
            style={style}
            onChange={onChange}
            inputProps={inputProps}
            InputProps={InputProps}
            InputLabelProps={inputLabelProps}
            size={size}
          />
        </StyledTooltip>
      }
    }
    else {
      if (type === 'date') {
        var w = props.partOfProtocol === true ? props.width : '100%';
        // return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        //   <KeyboardDatePicker
        //     disableToolbar
        //     variant="inline"
        //     format="dd/MM/yyyy"
        //     margin=""
        //     id={id}
        //     value={stateValue}
        //     style={{ margin: '0px', padding: '0px', width: w, textAlignLast: 'center' }}
        //     onChange={props.onChangeDate}
        //     KeyboardButtonProps={{
        //       'aria-label': 'change date',
        //     }}
        //   />
        // </MuiPickersUtilsProvider>
        return <TextField
            multiline={multiline}
            rows={3}
            disabled={isDisabled}
            required={isRequired}
            type={type}
            id={id}
            value={stateValue}
            variant='standard'
            style={style}
            onChange={onChange}
            inputProps={inputProps}
            InputProps={InputProps}
            InputLabelProps={inputLabelProps}
            size={size}
          />
      }
      else {
        return <TextField
          multiline={multiline}
          rows={3}
          disabled={isDisabled}
          required={isRequired}
          type={type}
          id={id}
          value={stateValue}
          variant='standard'
          style={style}
          onChange={onChange}
          inputProps={inputProps}
          InputProps={InputProps}
          InputLabelProps={inputLabelProps}
          size={size}
        />
      }
    }
  }
};

export default withStyles(styles)(StyledTextField);