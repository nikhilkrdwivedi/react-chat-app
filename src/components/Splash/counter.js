import React, { Component }  from 'react'
class Counter extends React.Component {
  constructor (props) {
    super(props);
    this.state = { counter : props.val }
  } 
render() {
    var x = this;
    var { counter } = this.state;
    setTimeout(function() {
      if (counter > 0) {
        x.setState({ counter: counter - 1 });
      }
    }, 1000);
    return <div>{counter}</div>;
  }
}
export default Counter;
