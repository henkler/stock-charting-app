import { Mongo } from 'meteor/mongo';

export const StockData = new Mongo.Collection('stockdata');
export const Stocks = new Mongo.Collection('stocks');

Stocks.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Stocks.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
