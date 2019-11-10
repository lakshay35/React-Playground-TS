import  * as React from 'react'
import './TradeForm.scss';
import { connect } from 'react-redux';
import { addTrade, updateTrade } from '../../redux/actions/index';

import Notifications, { notify } from 'react-notify-toast';
import { Dispatch } from 'redux';
import { Trade } from '../../model/interfaces/Trade';
import { ModalCloseType } from '../../model/enums/ModalCloseType';
import { History } from 'history';
import { Response } from '../../model/interfaces/Response';
import { HttpStatusCode } from '../../model/enums/HttpStatusCode';

import { environment } from '../../environments/environment';

interface Props {
    closeModal: () => void,
    addTrade: (trade: Trade) => void,
    updateTrade: (trade: Trade) => void,
    newTrade: boolean,
    data: Trade,
    addingTrade: boolean,
    history?: History<any>
}

interface State {
    title: string,
    trade: Trade,
    newTrade: boolean
}

/**
 * Maps props to reducer functions in Redux
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addTrade: (trade: Trade) => dispatch(addTrade(trade)),
        updateTrade: (trade: Trade) => dispatch(updateTrade(trade))
    }
}

/**
 * Presents a view for users to add/edit components
 */
class TradeForm extends  React.Component<Props, State> { 

    /**
     * State variables
     */
    state: State = {
        title: '',
        trade: {
            id: 0,
            entryDate: '0000-00-00',
            exitDate: '0000-00-00',
            ticker: '',
            entryPrice: 0,
            exitPrice: 0,
            positionSize: 0,
            tradeType: 'Day',
            securityType: 'Stocks',
            tradeFee: 0,
            optionPremium: 0,
            userId: parseInt(sessionStorage.getItem('userId'))
        },
        newTrade: false
    }

    /**
     * Initializes state 
     * @param {*} props 
     */
    constructor(props: any) {
        super(props);
        if(!props.addingTrade) {
            this.state = {
                title: 'Edit Trade',
                trade: props.data,
                newTrade: props.newTrade
            }
        } else {
            this.state = {
                title: 'Add Trade',
                newTrade: props.newTrade,
                trade: {
                    id: 0,
                    entryDate: '0000-00-00',
                    exitDate: '0000-00-00',
                    ticker: '',
                    entryPrice: 0,
                    exitPrice: 0,
                    positionSize: 0,
                    tradeType: 'Day',
                    securityType: 'Stocks',
                    tradeFee: 0,
                    optionPremium: 0,
                    userId: parseInt(sessionStorage.getItem('userId'))
                }
            }
        }
    }

    /**
     * Adds a trade to the database through an api request
     */
    saveTradeEntry = () => { 
        fetch(`${environment.API}${this.state.newTrade ? '/trades/add-trade' : '/trades/update-trade'}` , {
                method: this.state.newTrade ? 'POST' : 'PUT',
                body: JSON.stringify(this.state.trade),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then((response: Response<Trade>) => {
                var res = response.response;   
                if(response.statusCode == HttpStatusCode.OK || response.statusCode == HttpStatusCode.CREATED) {
                    if (this.state.newTrade) {
                        this.props.addTrade(res);
                    } else {
                        this.props.updateTrade(res);
                    }
                } else {
                    console.error('something went wrong');
                }
                
                
            })
            .catch(error => {
                alert('Error, check console tab');
                console.error(error);
            });
    }


    /**
     * Handles change made in form and updates state
     */
    handleChange = (field: string, value: string) => {
        var temp: Trade = Object.assign({}, this.state.trade);
        switch(field) {
            case 'entryDate':
                temp.entryDate = value == '' ? '' : value;
                break;
            case 'exitDate':
                temp.exitDate = value == '' ? '' : value;
                break;
            case 'tradeType':
                temp.tradeType = value == '' ? '' : value;
                break;
            case 'securityType':
                temp.securityType = value == '' ? '' : value;
                break;
            case 'entryPrice':
                temp.entryPrice = value == '' ? 0 : Number(value);
                break; 
            case 'exitPrice':
                temp.exitPrice = value == '' ? 0 : Number(value);
                break; 
            case 'optionPremium':
                temp.optionPremium = value == '' ? 0 : Number(value);
                break; 
            case 'positionSize':
                temp.positionSize = value == '' ? 0 : Number(value);
                break; 
            case 'ticker':
                temp.ticker = value == '' ? '' : value;
                break; 
            case 'tradeFee':
                temp.tradeFee = value == '' ? 0 : Number(value);
                break; 
        }
        this.setState({
            trade: temp
        });
    }

    /**
     * Closes formview by calling parent function "closeModal()"
     * @param {*} type 
     */
    closeModal(type: ModalCloseType) {
        switch(type) {
            case ModalCloseType.Close:
                this.props.closeModal();
                break;
            case ModalCloseType.Save:
                if(this.formIncomplete()) {
                    notify.show('Uh Oh...Required Fields Empty!', 'warning', 2500);
                    return;
                } else {
                    this.saveTradeEntry();
                    notify.show('Trade Saved!', 'success', 2500);
                    setTimeout(() => this.props.closeModal(), 2500);
                    return;
                }
            default:
                break;
        }
        
        this.props.closeModal();
    }

    /**
     * Checks to see if form has basic information required to enter into DB
     */
    formIncomplete() {
        if (this.state.trade.entryDate == '' || this.state.trade.entryPrice == 0 || (this.state.trade.optionPremium == 0 && this.state.trade.securityType === 'Options')
            || this.state.trade.positionSize == 0 || this.state.trade.tradeFee == 0 || this.state.trade.ticker == '') {
            return true;
        }

        return false;
    }

    /**
     * Renders a form view for adding/editing trades
     */
    render() {
        return (
            <div className="modal">
                <Notifications />
                <h3>{this.state.title}</h3>
                <div className="field">
                    <label>Security Type:</label> 
                    <select className="fieldChild" onChange={(e) => {this.handleChange('securityType', e.target.value)}}> 
                        <option selected={this.state.trade.securityType.toLowerCase() === 'stocks' ? true : false} value="Stocks" key="Stocks">Stocks</option>
                        <option selected={this.state.trade.securityType.toLowerCase() === 'options' ? true : false} value="Options" key="Options">Options</option>
                        <option disabled value="Futures" key="Futures">Futures</option>
                        <option disabled value="Bonds" key="Bonds">Bonds</option>
                        <option disabled value="Forex" key="Forex">Forex</option>
                    </select>
                </div>
                <div className="field">
                    <label>Trade Type:</label> 
                    <select className="fieldChild" onChange={(e) => {this.handleChange('tradeType', e.target.value)}}>
                        <option selected={this.state.trade.tradeType.toLowerCase() === 'day' ? true : false} value="Day" key="Day">Day</option>
                        <option selected={this.state.trade.tradeType.toLowerCase() === 'swing' ? true : false} value="Swing" key="Swing">Swing</option>
                    </select>
                </div>
                <div className="field"><label>Entry Date:</label><input value={this.state.trade.entryDate} onChange={(e) => {this.handleChange('entryDate', e.target.value)}} className="fieldChild" type="date" required/></div>
                <div className="field"><label>Exit Date:</label><input value={this.state.trade.exitDate} onChange={(e) => {this.handleChange('exitDate', e.target.value)}} className="fieldChild" type="date" /></div>
                <div className="field"><label>Entry Price:</label><input value={this.state.trade.entryPrice} onChange={(e) => {this.handleChange('entryPrice', e.target.value)}} className="fieldChild" type="number" /></div>
                <div className="field"><label>Exit Price:</label><input value={this.state.trade.exitPrice} onChange={(e) => {this.handleChange('exitPrice', e.target.value)}} className="fieldChild" type="number" /></div>
                <div className="field"><label>Option Premium:</label><input disabled={this.state.trade.securityType.toLowerCase() === 'options' ? false : true} value={this.state.trade.optionPremium} onChange={(e) => {this.handleChange('optionPremium', e.target.value)}} className="fieldChild"type="number" /></div>
                <div className="field"><label>Position Size:</label><input value={this.state.trade.positionSize} onChange={(e) => {this.handleChange('positionSize', e.target.value)}} className="fieldChild" type="number" /></div>
                <div className="field"><label>Ticker:</label><input value={this.state.trade.ticker} onChange={(e) => {this.handleChange('ticker', e.target.value)}} className="fieldChild" type="text" maxLength={5} /></div>
                <div className="field"><label>Trade Fee:</label><input value={this.state.trade.tradeFee} onChange={(e) => {this.handleChange('tradeFee', e.target.value)}} className="fieldChild" type="number" /></div>
                <div className="field">
                    <button className="formButton fieldChild" onClick={() => this.closeModal(ModalCloseType.Close)}>Close</button>
                </div>
                <div className="field">
                    <button className="formButton fieldChild" onClick={() => this.closeModal(ModalCloseType.Save)}>Save</button>
                </div>
            </div>
        )
    }
}


const TradeFormComponent = connect(null, mapDispatchToProps)(TradeForm);

export default TradeFormComponent;