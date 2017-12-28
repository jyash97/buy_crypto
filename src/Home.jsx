import React from 'react';

import DisplayData from './DisplayData';
import BuyCoin from './BuyCoin';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      prices: [],
      initialPrice: 1000000
    };
    this.handleRequest = this.handleRequest.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }

  componentWillMount() {
    this.handleRequest();
  }

  componentDidMount() {
    this.timer = setInterval(() => this.handleRequest(), 300000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleValue(option = 'BTC', quantity = 1, event) {
    this.handleRequest();
    if (event.target.name === 'buy') {
      const left =
        this.state.initialPrice - this.state.prices[option] * quantity;
      this.setState({
        initialPrice: left
      });
    }
  }

  async handleRequest() {
    const prices = await fetch('https://koinex.in/api/ticker')
      .then(data => data.json())
      .then(data => data.prices)
      .catch(() => false);

    if (prices) {
      this.setState({
        prices
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.prices ? (
          <React.Fragment>
            <DisplayData {...this.state.prices} />
            <BuyCoin
              handleValue={this.handleValue}
              data={Object.keys(this.state.prices)}
            />
          </React.Fragment>
        ) : (
          <h2>Error in Fetching Data</h2>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
