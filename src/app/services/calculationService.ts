import { ILineItem } from "../interfaces";

export const calculateCurrentInvoiceTotal = (conversionRates: any[], lineItems: ILineItem[]) => {
    
    const total = lineItems
      .map((lineItem, index) => lineItem.amount * conversionRates[index]) // Iterate through each line item amount and convert to base currency amount using conversion rate
      .reduce((total, amount) => total + amount); // Sum up all converted amount

    return total;
  };