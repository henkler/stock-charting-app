import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import StockList from '../containers/stockList';
import Chart from '../containers/chart';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddStockClick = this.handleAddStockClick.bind(this);
    this.handleDeleteStockClick = this.handleDeleteStockClick.bind(this);
    this.stockInputChanged = this.stockInputChanged.bind(this);

    this.state = {
      stockInput: null
    };
  }

  handleAddStockClick() {
    Meteor.call('addStock', this.state.stockInput);
    this.setState({ stockInput: null });
  }

  handleDeleteStockClick(stockId) {
    Meteor.call('deleteStock', stockId);
  }

  stockInputChanged(event) {
    let stockInput = event.target.value.toUpperCase();

    if (!stockInput) {
      stockInput = null;
    }

    this.setState({ stockInput });
  }

  render() {
    return (
      <div>
        <AppBar
          title="Stock Charting App"
          zDepth={4}
        />
        <Chart />
        <StockList
          handleAddStockClick={ this.handleAddStockClick }
          handleDeleteStockClick={ this.handleDeleteStockClick }
          stockInput={ this.state.stockInput }
          stockInputChanged={ this.stockInputChanged }
        />
      </div>
    );
  }
}

export default App;
