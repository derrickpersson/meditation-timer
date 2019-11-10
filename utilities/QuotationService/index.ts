export interface Quote {
    author: string;
    text: string;
}


export interface IQuotationService {
    getQuote: () => Quote;
}

export { default as quotationService } from "./QuotationService";