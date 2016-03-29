import { Meteor } from 'meteor/meteor';
import { Stocks } from '../lib/collections';

Meteor.publish('selectedStocks', () => Stocks.find());
