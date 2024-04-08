import React, { FC } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { ITotalItem } from '@/app/interfaces';

interface Props {
  invoiceTotals: ITotalItem[],
  lineTotals: ITotalItem[]
}

const ConsolidationPanel: FC<Props> = ({ invoiceTotals, lineTotals }) => {
  return (
    <>
      <Typography variant="h2">
        TOTALS
      </Typography>

      <Box sx={{ border: '2px solid #ccc', padding: '20px', borderRadius: '4px', marginBottom: '1rem' }}>
        <Typography variant="h3" sx={{ textTransform: 'uppercase' }}>
          INVOICE TOTALS
        </Typography>
        {invoiceTotals.map((invoiceTotal, index) => (
          <Grid container key={index}>
            <Grid item xs={6}>
              <Typography align="left">{invoiceTotal.description}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">{invoiceTotal.totalAmount}</Typography>
            </Grid>
          </Grid>
        ))}
      </Box>

      <Box sx={{ border: '2px solid #ccc', padding: '20px', borderRadius: '4px', marginBottom: '1rem' }}>
        <Typography variant="h3" sx={{ textTransform: 'uppercase' }}>
          LINE TOTALS
        </Typography>
        {lineTotals.map((lineTotal, index) => (
          <Grid container key={index}>
            <Grid item xs={6}>
              <Typography align="left">{lineTotal.description}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">{lineTotal.totalAmount}</Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  );
};

export default ConsolidationPanel;