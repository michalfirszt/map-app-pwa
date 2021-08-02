import React, { Component } from 'react';

class ClassCounter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counterValue: this.props.value,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        counterValue: prevState.counterValue - 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>{this.state.counterValue}</div>;
  }
}

export default ClassCounter;
