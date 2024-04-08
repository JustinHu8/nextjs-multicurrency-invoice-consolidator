import axios, { AxiosResponse } from 'axios';
import { dataSource } from './apiConfig';
import { ILineItem } from '../interfaces';

// Function to fetch data from API
export const getConversionRate = async (fromCurrency: string, toCurrency: string) => {
  try {
    const response = await fetch(`${dataSource}/latest?&from=${fromCurrency}&to=${toCurrency}`);
    console.log('getConversionRate response', response);
    const data = await response.json();
    console.log('getConversionRate response data', data);
    const conversionRate = data.rates[toCurrency];
    return conversionRate;
  } catch (error) {
    console.error(`Error fetching data ${fromCurrency} ${toCurrency}:`, error);
    return 0; // Return default value (0) on error
  }
};

export const getAllConversionRates = async (lineItems: ILineItem[], baseCurrency: string) => {
  try {
    const responses = await Promise.all(lineItems.map((lineItem) => getConversionRate(lineItem.currency, baseCurrency)));

    console.log('API Responses:', responses);
    return responses;
  } catch (error) {
    console.error('Error get all conversion rates', error);
    return error;
  }
}