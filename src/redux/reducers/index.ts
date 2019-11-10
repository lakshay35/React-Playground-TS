import { ADD_TRADE, SET_TRADES, SET_TITLE, DEL_TRADE, UPD_TRADE } from '../constants/action-types';
import { Trade } from '../../model/interfaces/Trade';

interface State {
    addedTrade: Trade,
    trades: Array<Trade>,
    pageTitle: string
}

const initialState: State = {
    addedTrade: {
        id: 0,
        entryDate: '2019-02-04',
        exitDate: '2019-02-04',
        ticker: 'TICK',
        entryPrice: 2,
        exitPrice: 4,
        positionSize: 50,
        tradeType: 'Swing',
        securityType: 'Stock',
        tradeFee: 45,
        optionPremium: 0.75,
        userId: 1
    },
    trades: [],
    pageTitle: 'Login'
}

const rootReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case ADD_TRADE:
            return Object.assign({}, state, {
                trades: [
                    ...state.trades,
                    action.payload
                ]
            });
        case UPD_TRADE: 
            return Object.assign({}, state, {
                trades: state.trades.map((trade: Trade) => {
                        if(trade.id == action.payload.id) {
                            return action.payload;
                        } 
                        return trade;
                    })
            })
        case SET_TRADES:
            return Object.assign({}, state, {
                trades: action.payload
            });
        case SET_TITLE:
            return Object.assign({}, state, {
                pageTitle: action.payload
            });
        case DEL_TRADE:
            return Object.assign({}, state, {
                trades: state.trades.filter((trade: Trade) => {
                    return trade.id != action.payload;
                })
            });
        default:
            return state;  
    }
};

export default rootReducer;