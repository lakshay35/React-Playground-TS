import { ADD_TRADE, SET_TRADES, DEL_TRADE, UPD_TRADE } from '../constants/action-types'; 
import { Trade } from '../../model/interfaces/Trade';

export const addTrade = (payload: Trade) => {
    return {
        type: ADD_TRADE,
        payload: payload
    }
}

export const setTrades = (payload: Array<Trade>) => {
    return {
        type: SET_TRADES,
        payload: payload
    }
}

export const deleteTrade = (payload: number) => {
    return {
        type: DEL_TRADE,
        payload: payload
    }
}

export const updateTrade = (payload: Trade) => {
    return {
        type: UPD_TRADE,
        payload: payload
    }
}