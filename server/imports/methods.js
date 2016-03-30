import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Stocks } from '../../lib/collections';

import { isValidStock } from './stockInfo';

export default function () {
  Meteor.methods({
    addStock(tickerSymbol) {
      check(tickerSymbol, String);
      const stock = Stocks.findOne({ _id: tickerSymbol });

      if (!stock && isValidStock(tickerSymbol)) {
        Stocks.insert({ _id: tickerSymbol });
      }
    },
    deleteStock(tickerSymbol) {
      check(tickerSymbol, String);
      Stocks.remove(tickerSymbol);
    }
  });
}
