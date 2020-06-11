import React from "react";
// background: '#1E61FF',
const styles = {
  title: {
    color: '#000',
    background: '#addde6',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '5px'
  }
}

const InputTitle = props => {

  return <div style={styles.title}>{props.title}{getAsterisk(props.isRequired)}</div>
}

function getAsterisk(isRequired){
  var ret = '';

  if (isRequired === true)
    ret = '*'
    
  return ret;
}
export default InputTitle