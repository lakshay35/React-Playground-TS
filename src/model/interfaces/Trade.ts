export interface Trade {
    id: number;
    entryDate: string;
    exitDate: string;
    ticker: string;
    entryPrice: number;
    exitPrice: number;
    positionSize: number;
    tradeType: string;
    securityType: string;
    tradeFee: number;
    optionPremium: number;
    userId: number;
}