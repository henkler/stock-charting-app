import React from 'react';
import Paper from 'material-ui/lib/paper';
import Highcharts from 'highcharts/highstock';

const style = {
  marginTop: 20,
  marginBottom: 20
};

class Chart extends React.Component {
  componentDidMount() {
    this.setupChart();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.stockData.length !== this.props.stockData.length;
  }

  componentDidUpdate() {
    this.setupChart();
  }

  setupChart() {
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

Chart.propTypes = {
  stockData: React.PropTypes.array
};

export default Chart;
