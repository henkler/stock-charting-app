import { Meteor } from 'meteor/meteor';
import { Stocks } from '../../lib/collections';
import { getStockData } from './stockInfo';

export default function () {
  Meteor.publish('selectedStocks', () => Stocks.find());

  Meteor.publish('stockData', function publishStockData() {
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
}
