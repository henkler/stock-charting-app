import React from 'react';
import Paper from 'material-ui/lib/paper';
import Highcharts from 'highcharts/highstock';

const style = {
    marginTop: 20,
    marginBottom: 20
};

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
            <Paper style={style} zDepth={4}>
                <div id="stock-chart"></div>
            </Paper>
        );
    }
}

export default Chart;
