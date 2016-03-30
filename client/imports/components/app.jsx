import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import StockList from '../containers/stockList';
import Chart from './chart.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stockInput: null,
            stockData: []
        }
    }
    componentDidMount() {
        this.loadStockData();
    }
    loadStockData() {
        Meteor.call('getStockData', (error, result) => {
            this.setState({ stockData: result });
        });
    }
    handleAddStockClick() {
        Meteor.call('addStock', this.state.stockInput);
        this.setState({ stockInput: null });
        this.loadStockData();
    }
    handleDeleteStockClick(stockId) {
        Meteor.call('deleteStock', stockId);
        this.loadStockData();
    }
    stockInputChanged(event) {
        let stockInput = event.target.value;

        if(!stockInput) {
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
                <Chart stockData={this.state.stockData} />
                <StockList
                    handleAddStockClick={this.handleAddStockClick.bind(this)}
                    handleDeleteStockClick={this.handleDeleteStockClick.bind(this)}
                    stockInput={this.state.stockInput}
                    stockInputChanged={this.stockInputChanged.bind(this)}
                    />
            </div>
        );
    }
}

export default App;
