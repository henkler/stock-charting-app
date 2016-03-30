import React from 'react';
import Paper from 'material-ui/lib/paper';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
import StockAdd from './stockAdd.jsx';

const styles = {
    container: {
        width: 350,
        height: 90,
        margin: 10,
        textAlign: 'center',
        display: 'inline-block'
    },
    button: {
        marginLeft: 20
    }
};

const StockList = ({ stocks, props }) => (
  <div>
    {stocks.map(stock =>
      <Paper key={stock._id} style={styles.container} zDepth={4}>
        <h1>{stock._id}
        <FloatingActionButton
            mini={true}
            style={styles.button}
            secondary={true}
            onClick={event => props.handleDeleteStockClick(stock._id)}>
            <ActionDelete />
        </FloatingActionButton>
        </h1>
      </Paper>
    )}
      <Paper style={styles.container} zDepth={4}>
      <StockAdd
          handleAddStockClick={props.handleAddStockClick}
          stockInput={props.stockInput}
          stockInputChanged={props.stockInputChanged}
      />
          </Paper>
  </div>
);

export default StockList;
