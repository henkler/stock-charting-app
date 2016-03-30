import { Meteor } from 'meteor/meteor';
import Quandl from 'quandl';
import moment from 'moment';

function setupQuandl() {
  const quandl = new Quandl();
  const options = {
    auth_token: Meteor.settings.quandl.api_key,
    api_version: 3
  };
  quandl.configure(options);

  return quandl;
}

function getQuandlStockInfo(stock, callback) {
  const quandl = setupQuandl();

  quandl.dataset({
    source: 'WIKI',
    table: stock
  }, callback);
}
const wrappedGetQuandlStockInfo = Meteor.wrapAsync(getQuandlStockInfo);

function getQuandlStockData(tickerSymbol, startDate, endDate, callback) {
  const quandl = setupQuandl();

  quandl.dataset({
    source: 'WIKI',
    table: tickerSymbol
  }, {
    order: 'asc',
    start_date: startDate,
    end_date: endDate
  }, callback);
}
const wrappedGetQuandlStockData = Meteor.wrapAsync(getQuandlStockData);

export function getStockData(tickerSymbol) {
  const today = moment().format('YYYY/MM/DD');
  const oneYearAgo = moment().subtract(1, 'years').subtract(1, 'weeks').format('YYYY/MM/DD');
  const result = JSON.parse(wrappedGetQuandlStockData(tickerSymbol, oneYearAgo, today));

  const data = result.dataset.data.map(dataPoint =>
    [new Date(dataPoint[0]).getTime(), dataPoint[1]]);

  return {
    name: tickerSymbol,
    data
  };
}

export function getStockInfo(tickerSymbol) {
  const stock = JSON.parse(wrappedGetQuandlStockInfo(tickerSymbol));

  if (stock.dataset) {
    return stock.dataset;
  }

  return null;
}

export function isValidStock(tickerSymbol) {
  return getStockInfo(tickerSymbol) !== null;
}
