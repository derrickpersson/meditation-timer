import { IQuotationService, Quote } from ".";

export class QuotationService implements IQuotationService {
    private quotes: Quote[];

    constructor(quotes){
        this.quotes = quotes;
    }

    public getQuote() {
        const randomIndex = (Math.floor(Math.random() * 100)) % this.quotes.length;
        return this.quotes[randomIndex];
    }
}

const quotesJSON = require("./quotes.json");

const quotationService = new QuotationService(quotesJSON.quotes);

export default quotationService;