import React from 'react';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      prices: []
    };
  }

  async componentWillMount() {
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
          <h1>Data Fetched Succssfully</h1>
        ) : (
          <h2>Error in Fetching Data</h2>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
