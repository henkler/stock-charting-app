import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

// define and export our Layout component
const App = (props) => (
  <div>
    <AppBar
      title="Stock Charting App"
      zDepth={4}
    />
  </div>
);

export default App;