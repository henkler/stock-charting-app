import React from 'react';
import Highcharts from 'highcharts/highstock';

class Chart extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.stockData !== this.props.stockData;
    }

    componentDidUpdate() {
        Highcharts.stockChart('stock-chart', {
            title: {
                text: 'Stocks'
            },
            xAxis: {
                type: 'datetime'
            },
            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },
            credits: {
                enabled: false
            },
            series: this.props.stockData
        });
    }

    render() {
        return (
          <div id="stock-chart"></div>
        );
    }
}

export default Chart;
