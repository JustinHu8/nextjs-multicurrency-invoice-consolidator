import React, { FC, useState, useEffect } from 'react';
import LineItem from './LineItem';
import { Typography, Grid, TextField, MenuItem, Box, Button } from '@mui/material';
import { Invoice, ILineItem } from './../../interfaces';
import { currencyNameMapping } from '@/app/constants/currency';
import { getAllConversionRates } from '@/app/services/apiService';
import { calculateCurrentInvoiceTotal } from '@/app/services/calculationService';

interface Props {
  id: number,
  invoice: Invoice,
  onRemoveInvoiceItem: (id: number) => void
  onUpdateInvoiceItem: (id: number, propertyName: string, propertyValue: string | number | ILineItem[]) => void
}

const InvoicePanel: FC<Props> = ({ id, invoice, onRemoveInvoiceItem, onUpdateInvoiceItem }) => {

  const updateTotals = (total: number) => {
    onUpdateInvoiceItem(id, 'totalAmount', total);
  };

  useEffect(() => {
    console.log('Update conversion rate');

    getAllConversionRates(invoice.lines, invoice.currency)
      .then((conversionRates) => {

        if (Array.isArray(conversionRates) && conversionRates.length > 0) {
          const total = calculateCurrentInvoiceTotal(conversionRates, invoice.lines);
          updateTotals(total);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [invoice.currency, invoice.lines]);

  const addLineItem = () => {
    const newLineItem: ILineItem = 
    {
      description: "", 
      currency: "AUD", 
      amount: 0
    };

    onUpdateInvoiceItem(id, 'lines', [...invoice.lines, newLineItem]);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDate = event.target.value;
    onUpdateInvoiceItem(id, 'date', updatedDate);
  }

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCurrency = event.target.value;
    onUpdateInvoiceItem(id, 'currency', updatedCurrency);
  }

  const handleLineDescriptionChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedLineDescription = event.target.value;
    const updatedItems = invoice.lines.map((lineItem, index) => {
      return index === id ? 
        { ...lineItem,
          ['description']: updatedLineDescription
        } : lineItem;
    });
    onUpdateInvoiceItem(id, 'lines', updatedItems);
  }

  const handleLineCurrencyChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedLineCurrency = event.target.value;
    const updatedItems = invoice.lines.map((lineItem, index) => {
      return index === id ? 
        { ...lineItem,
          ['currency']: updatedLineCurrency
        } : lineItem;
    });
    onUpdateInvoiceItem(id, 'lines', updatedItems);
  }

  const handleLineAmountChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedLineAmount = parseInt(event.target.value);
    const updatedItems = invoice.lines.map((lineItem, index) => {
      return index === id ? 
        { ...lineItem,
          ['amount']: updatedLineAmount
        } : lineItem;
    });
    onUpdateInvoiceItem(id, 'lines', updatedItems);
  }

  const removeLineItem = (itemId: number) => {
    console.log('handle delete line item itemId', itemId);
    const updatedItems = invoice.lines.filter((item, index) => index !== itemId);
    console.log('handle delete line item updatedItems', updatedItems);
    onUpdateInvoiceItem(id, 'lines', updatedItems);
    if (updatedItems.length === 0) {
      onRemoveInvoiceItem(id);
    }
  }

  return (
    <Box sx={{ border: '2px solid #ccc', padding: '20px', borderRadius: '4px', marginTop: '20px', marginBottom: '20px' }}>
      <Grid container spacing={2}>
        <Typography variant="h2">
          INVOICE #{id}
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            id="invoice-issue-date"
            label="Invoice Issue Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={invoice.date}
            onChange={handleDateChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="base-currency"
            select
            label="Base Currency"
            fullWidth
            variant="outlined"
            sx={{ width: '100%' }}
            value={invoice.currency}
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
          <Typography variant="subtitle2" gutterBottom>
            TOTAL
          </Typography>
          <Typography variant="h6">{invoice?.totalAmount}</Typography>
        </Grid>

        <Grid item xs={12} sm={3}>
        </Grid>
    </Grid>
    <Typography variant="h3" sx={{ textTransform: 'uppercase' }}>
        Line Items
    </Typography>
      {invoice?.lines?.map((lineItem, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: '1rem' }}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Description"
                value={lineItem.description}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ height: '100%' }}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleLineDescriptionChange(index, e)}
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
                onChange={(e) => handleLineCurrencyChange(index, e)}
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
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleLineAmountChange(index, e)}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*[.,]?[0-9]*' // Pattern to allow numeric input with optional decimal point
                }}
              />
            </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="outlined" color="secondary" onClick={(e) => removeLineItem(index)}>
              REMOVE
            </Button>
          </Grid>
        </Grid>
      </Box>
      ))}
      <Button variant="outlined" color="primary" onClick={addLineItem}>
        + ADD LINE ITEM
      </Button>
    </Box>
  );
};

export default InvoicePanel;