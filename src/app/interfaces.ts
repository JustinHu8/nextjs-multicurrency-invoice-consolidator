export interface ILineItem {
    description: string,
    currency: string,
    amount: number,
    conversionRate?: number,
}

export interface Invoice {
    currency: string,
    date: string,
    totalAmount?: number,
    lines: ILineItem[],
}

export interface ITotalItem {
    description: string,
    totalAmount: number | string,
}