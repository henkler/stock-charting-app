/* global Meteor: false*/
import React from 'react'; // eslint-disable-line no-unused-vars
import { mount } from 'react-mounter';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './imports/components/app.jsx';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

Meteor.startup(() => {
  mount(App);
});
