import { Meteor } from 'meteor/meteor';
import Quandl from 'quandl';
import moment from 'moment';
import { Stocks } from '../lib/collections';

function getQuandlStockData(stock, callback) {
  const quandl = new Quandl();
  const options = {
    auth_token: Meteor.settings.quandl.api_key,
    api_version: 3
  }

  const today = moment().format('YYYY/MM/DD');
  const oneYearAgo = moment().subtract(1, 'years').subtract(1, 'weeks').format('YYYY/MM/DD');

  quandl.configure(options);

  quandl.dataset({
    source: "WIKI",
    table: stock
  }, {
    order: "asc",
    start_date: oneYearAgo,
    end_date: today,
  }, callback);
}

const wrappedGetQuandlStockData = Meteor.wrapAsync(getQuandlStockData);

Meteor.methods({
  addStock(tickerSymbol) {
    const stock = Stocks.findOne({ _id: tickerSymbol });

    if (!stock) {
      Stocks.insert({ _id: tickerSymbol });
    }
  },

  removeStock(tickerSymbol) {
    Stocks.remove(tickerSymbol);
  },

  getStockData() {
    const series = [];
    Stocks.find().forEach(stock => {
      const result = JSON.parse(wrappedGetQuandlStockData(stock._id));

      const data = result.dataset.data.map(dataPoint => [new Date(dataPoint[0]).getTime(), dataPoint[1]]);

      series.push({
        name: stock._id,
        data
      });
    });

    return series;
  }
});
