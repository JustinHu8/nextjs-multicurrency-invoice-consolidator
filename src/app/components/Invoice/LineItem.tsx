import React, { FC, useState } from 'react';
import { Box, Grid, TextField, MenuItem, Button } from '@mui/material';
import { ILineItem } from './../../interfaces';
import { currencyNameMapping } from '@/app/constants/currency';

interface Props {
  id: number;
  lineItem: ILineItem;
  onDeleteLineItem: (itemId: number) => void;
  onLineItemInputChange: (id: number, line: ILineItem) => void;
}


const LineItem: FC<Props> = ({ id, lineItem, onDeleteLineItem, onLineItemInputChange }) => {
  // const [description, setDescription] = useState(lineItem.description);
  // const [amount, setAmount] = useState(lineItem.amount);
  // const [currency, setCurrency] = useState(lineItem.currency);
  const isLineSet = lineItem !== undefined && lineItem !== null;

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDescription = event.target.value;
    // setDescription(updatedDescription);
    onLineItemInputChange(id, {...lineItem, description: updatedDescription});
  }

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCurrency = event.target.value;
    // setCurrency(updatedCurrency);
    onLineItemInputChange(id, {...lineItem, currency: updatedCurrency});
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAmount = parseFloat(event.target.value);
    // setAmount(updatedAmount);
    onLineItemInputChange(id, {...lineItem, amount: updatedAmount});
  }

  const removeLineItem = () => {
    console.log('removeLineItem id', id);
    onDeleteLineItem(id);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: '1rem' }}>
      <Grid container spacing={2}>
        {isLineSet ? (
          <>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Description"
                value={lineItem.description}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ height: '100%' }}
                InputLabelProps={{ shrink: true }}
                onChange={handleDescriptionChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id={id.toString()}
                select
                label="Currency"
                value={lineItem.currency}
                fullWidth
                variant="outlined"
                sx={{ width: '100%' }}
                onChange={handleCurrencyChange}
              >
                {Object.entries(currencyNameMapping).map(([currencyName, currencyDisplayName]) => (
                  <MenuItem key={currencyName} value={currencyName}>
                    {currencyDisplayName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Amount"
                value={lineItem.amount}
                type="text"
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                onChange={handleAmountChange}
              />
            </Grid>
          </>
        ) : <></>}
        <Grid item xs={12} sm={3}>
          <Button variant="outlined" color="secondary" onClick={removeLineItem}>
            REMOVE
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LineItem;