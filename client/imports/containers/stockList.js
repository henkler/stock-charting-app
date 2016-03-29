import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Stocks } from '../../../lib/collections';
import StockList from '../components/stockList.jsx';

const composer = (props, onData) => {
  if (Meteor.subscribe('selectedStocks').ready()) {
    const stocks = Stocks.find().fetch();
    onData(null, { stocks });
  }
};

export default composeWithTracker(composer)(StockList);
