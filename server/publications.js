import { Meteor } from 'meteor/meteor';
import { Stocks } from '../lib/collections';
import { getStockData } from './imports/stockInfo';

Meteor.publish('selectedStocks', () => Stocks.find());

Meteor.publish('stockData', function() {
  const self = this;

  const handle = Stocks.find().observeChanges({
    added(stockId) {
      const stockData = getStockData(stockId);
      if (stockData) {
        self.added('stockdata', stockId, stockData);
      }
    },
    removed(stockId) {
      self.removed('stockdata', stockId);
    }
  });

  self.ready();

  self.onStop(() => handle.stop());
});
