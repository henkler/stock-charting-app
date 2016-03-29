import React from 'react';

const StockList = ({ stocks }) => (
  <div>
    {stocks.map(stock =>
      <div>
        <p>{stock._id}</p>
      </div>
    )}
  </div>
);

export default StockList;
