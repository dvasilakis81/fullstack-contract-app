import React from "react";
// background: '#1E61FF',
const styles = {
  title: {
    color: '#000',
    background: '#C0C0C0',
    textAlign: 'center',
    fontWeight: 'bold'
  }
}

const InputTitle = props => {

  return <div style={styles.title}>{props.title}</div>
}

export default InputTitle