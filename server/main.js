import { Meteor } from 'meteor/meteor';
import publications from './imports/publications';
import methods from './imports/methods';

publications();
methods();

Meteor.startup(() => {
  // code to run on server at startup
});
