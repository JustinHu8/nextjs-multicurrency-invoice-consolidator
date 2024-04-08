'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#3e4bb8',
    },
    secondary: {
      main: '#e24459'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: '1.5rem',
      marginTop: '1rem',
      marginBottom: '1rem',
      fontWeight: 'bold',
      color: '#3e4bb8'
    },
    h2: {
      fontSize: '1.2rem',
      marginTop: '1rem',
      marginBottom: '2rem',
      fontWeight: '500'
    },
    h3: {
      fontSize: '1rem',
      color: '#929292',
      fontWeight: '400',
      marginBottom: '1.5rem'
    }
  },
});

export default theme;