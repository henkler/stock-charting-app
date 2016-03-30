import React from 'react';
import TextField from 'material-ui/lib/text-field';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

const styles = {
    button: {
        marginLeft: 20
    }
};

const StockAdd = (props) => (
    <h1>
        <TextField
            name="stock-input"
            value={props.stockInput}
            onChange={props.stockInputChanged}
            hintText="Stock Symbol"
        />
        <FloatingActionButton
            mini={true}
            style={styles.button}
            onClick={props.handleAddStockClick}>
            <ContentAdd />
        </FloatingActionButton>
    </h1>
);

export default StockAdd;