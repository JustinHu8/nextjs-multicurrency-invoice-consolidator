'use client';
import React, { FC, useState, useEffect } from 'react';
import ConsolidationPanel from './Summary/ConsolidationPanel';
import { Typography, Grid, Box, Button } from '@mui/material';
import { defaultScenario } from './../constants/demoInvoice';
import { ILineItem, ITotalItem, Invoice } from './../interfaces';
import InvoicePanel from './Invoice/InvoicePanel';
import ImportExportDialog from './ImportExport/ImportExportDialog';

interface Props {
  // Define props here
}

const InvoiceConsolidatorContainer: FC<Props> = ({}) => {
  const [invoiceList, setInvoiceList] = useState<Invoice[]>(defaultScenario);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [invoiceTotals, setInvoiceTotals] = useState<ITotalItem[]>();
  const [lineTotals, setLineTotals] = useState<ITotalItem[]>();

  const shouldDisplaySummaryPanel = invoiceTotals && (invoiceTotals.length > 0) && lineTotals && lineTotals.length > 0;

  const calculateInvoiceTotals = () => {
    const invoiceSums: any = {};
    invoiceList.forEach((invoice) => {
      const { currency, totalAmount } = invoice;

      if (totalAmount) {
        if (currency in invoiceSums) {
          invoiceSums[currency] += totalAmount;
        } else {
          invoiceSums[currency] = totalAmount;
        }
      }
    });

    console.log('invoice sums object', invoiceSums);

    const invoiceTotals = Object.entries(invoiceSums).map(([currency, sum]) => ({
      description: currency,
      totalAmount: sum ? sum.toFixed(2) : ''
    }));

    setInvoiceTotals(invoiceTotals);
  };

  const calculateLineTotals = () => {

    const linesArray = invoiceList.map(invoiceItem => invoiceItem.lines).flat();

    const lineTotalsObj = linesArray.reduce((totals, item) => {
      const { currency, amount } = item;

      if (totals[currency]) {
        totals[currency] += amount;
      } else {
        totals[currency] = amount;
      }

      return totals;
    }, {});

    const lineTotals = Object.keys(lineTotalsObj).map(currency => ({
      description: currency,
      totalAmount: lineTotalsObj[currency]
    }));

    setLineTotals(lineTotals);
  };

  useEffect(() => {
    calculateInvoiceTotals();
    calculateLineTotals();

  }, [invoiceList]);

  const handleUpdateInvoiceItem = (id: number, propertyName: string, propertyValue: string | number | ILineItem[]) => {
    const updatedInoviceList = invoiceList.map((invoiceItem, index ) => {
      if (id === index) {
        return { ...invoiceItem, [propertyName]: propertyValue}
      }
      return invoiceItem;
    });

    console.log('handleUpdateInvoiceItem, id, propertyName, propertyValue', id, propertyName, propertyValue);
    setInvoiceList(updatedInoviceList);
  };

  const handleOpenImportExportDialog = () => {
    setIsDialogOpen(true);
  }

  const handleCloseImportExportDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSaveImport = (importedInvoiceList: string) => {
    setInvoiceList(JSON.parse(importedInvoiceList));
    setIsDialogOpen(false);
  };

  const addInvoiceItem = () => {
    const newInvoiceItem: Invoice = {
      currency: 'EUR',
      date: '2020-07-07',
      lines: [
        {
          description: "New Invoice Item", 
          currency: "AUD", 
          amount: 0 },
      ],
    };

    setInvoiceList([...invoiceList, newInvoiceItem]);
  };

  const handleRemoveInvoiceItem = (itemId: number) => {
    const updatedItems = invoiceList.filter((item, index) => index !== itemId);
    console.log('handle remove invoice item', updatedItems);
    setInvoiceList(updatedItems);
  };

  return (
    <>
      <Box
      sx={{
        maxWidth: '1280px',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: '20px',
        border: '4px solid #ddd',
      }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h1">
              Supercorp Invoice Converge
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleOpenImportExportDialog}
              style={{
                float: 'right'
              }}
              >
              IMPORT/EXPORT
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {invoiceList ? invoiceList.map((invoice, index) => (
              <InvoicePanel key={index} id={index} invoice={invoice} onRemoveInvoiceItem={handleRemoveInvoiceItem}
              onUpdateInvoiceItem={handleUpdateInvoiceItem}></InvoicePanel>
            )) : <></>}
            <Button variant="contained" color="primary" onClick={addInvoiceItem}>
              + ADD INVOICE
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            {shouldDisplaySummaryPanel ? (
              <ConsolidationPanel invoiceTotals={invoiceTotals} lineTotals={lineTotals}></ConsolidationPanel>
            ) : (<></>)}
          </Grid>
        </Grid>
        <ImportExportDialog isDialogOpen={isDialogOpen} onClose={handleCloseImportExportDialog} onSave={handleSaveImport}></ImportExportDialog>
      </Box>
    </>
  );
};

export default InvoiceConsolidatorContainer;