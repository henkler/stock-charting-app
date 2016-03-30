import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { StockData } from '../../../lib/collections';
import Chart from '../components/chart.jsx';

const composer = (props, onData) => {
  if (Meteor.subscribe('stockData').ready()) {
    const stockData = StockData.find().fetch();
    onData(null, { stockData });
  }
};

export default composeWithTracker(composer)(Chart);
