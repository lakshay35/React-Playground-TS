import * as React from 'react';;
import './TradesTable.scss';
import { connect } from 'react-redux';

import TradeFormComponent from '../TradeForm/TradeForm';
import PieDonut from '../PieDonut/PieDonut';
import SecurityRadarChart from '../SecurityRadarChart/SecurityRadarChart';
import Modal from '@material-ui/core/Modal';
import { deleteTrade, setTrades } from '../../redux/actions/index';

import Notifications, { notify } from 'react-notify-toast';
import { Dispatch } from 'redux';
import { Trade } from '../../model/interfaces/Trade';
import { History } from 'history';
import { Response } from '../../model/interfaces/Response';
import { HttpStatusCode } from '../../model/enums/HttpStatusCode';

import { environment } from '../../environments/environment';

interface State {
    addedTrade: Trade,
    deleteTrade: Trade,
    trades: Array<Trade>,
    profit: number,
    loss: number,
    open: boolean,
    selectedTrade: Trade,
    showDeleteModal: boolean,
    showFormModal: boolean,
    newTrade: boolean,
    addingTrade: boolean
}

interface Props {
    deleteTrade: (id: number) => void,
    setTrades: (trades: Array<any>) => void,
    trades: Array<Trade>,
    history: History<any>
}

/**
 * Maps 
 * @param {*} state 
 */
const mapStateToProps = (state: State) => {
    return {
        addedTrade: state.addedTrade,
        trades: state.trades
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        deleteTrade: (id: number) => dispatch(deleteTrade(id)),
        setTrades: (trades: Array<Trade>) => dispatch(setTrades(trades))
    }
}

/**
 * A component that shows a list of trades one user has on their account
 */
class TradesTable extends  React.Component<Props, State> {

    /**
     * Constructor
     * @param {*} props 
     */
    constructor(props: any) {
        super(props);
        // this.child = React.createRef();
    }

    /**
     * State that stores all data for current state
     */
    state: State = {
        trades: [],
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
        open: false,
        selectedTrade: {
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
        showDeleteModal: false,
        showFormModal: false,
        newTrade: false,
        profit: 0,
        loss: 0,
        deleteTrade: {
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
        addingTrade: false
    }

    /**
     * Retrieves trades based on user logged in 
     */
    componentDidMount() {
        fetch(`${environment.API}/trades/get-trades/${sessionStorage.getItem('userId')}`)
        .then(response => response.json())
        .then((json: Response<Array<Trade>>) => {
            if(json.statusCode == HttpStatusCode[HttpStatusCode.OK]) {
                var profitCount: number = 0;
                var lossCount: number = 0;
                json.response.forEach((trade: Trade) => {

                    if (trade.entryPrice < trade.exitPrice) {
                        profitCount++;
                    } else {
                        lossCount++;
                    }

                    return trade;
                });

                this.props.setTrades(json.response);

                this.setState({
                    trades: json.response,
                    profit: profitCount,
                    loss: lossCount
                });
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    /**
     * Opens modal to view trade user clicked on
     */
    showTradeDetails = (trade: Trade) => {
        this.setState({
            open: true,
            selectedTrade: trade,
            showDeleteModal: false,
            showFormModal: true,
            addingTrade: false,
            newTrade: false
        });
    }

    /**
     * Sets up data for radar chart view
     */
    radarChartData = () => {
        const full = this.state.trades.length;
        
        var data = [
            { 
                security: 'Stocks', 
                count: 0, 
                fullMark: full
            },
            {
                security: 'Options',
                count: 0,
                fullMark: full
            },
            {
                security: 'Futures',
                count: 0,
                fullMark: full
            },
            {
                security: 'Bonds',
                count: 0,
                fullMark: full
            },
            {
                security: 'Forex',
                count: 0,
                fullMark: full
            }
        ]

        this.state.trades.forEach((trade: Trade) => {
            switch(trade.securityType) {
                case 'Stocks':
                    data[0].count++;
                    break;
                case 'Options':
                    data[1].count++;
                    break;
                case 'Futures':
                    data[2].count++;
                    break;
                case 'Bonds':
                    data[3].count++;
                    break;
                case 'Forexs':
                    data[4].count++;
                    break;
                default:
                    break;
            }
        });

        return data;
    }

    /**
     * Closes modal
     */
    closeModal = () => {
        this.setState({ open: false });
    }


    /**
     * Shows delete trade modal
     */
    deleteRequest = (trade: Trade) => {
        this.setState({
            open: true,
            showDeleteModal: true,
            showFormModal: false,
            deleteTrade: trade
        });
    }

    /**
     * Deletes trade from the database
     */
    deleteTrade = () => {
        this.setState({
            open: false
        });

        fetch(`${environment.API}/trades/delete-trade/${this.state.deleteTrade.id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then((response: Response<Trade>) => {
            if(response.statusCode == HttpStatusCode.OK) {
                this.props.deleteTrade(this.state.deleteTrade.id);
            } else {
            }
            
        })
        .catch(error => {
            alert('Error, check console tab');
            console.error(error);
        });
    }

    /**
     * Shows add trade modal
     */
    addTrade = () => {
        this.setState({
            addingTrade: true,
            open: true,
            showDeleteModal: false,
            showFormModal: true,
            newTrade: true
        });
    }

    /**
     * Renders list of trades
     */
    render() {
        return (
            <div>
                <i className="fa fa-plus addTrade" aria-hidden="true" onClick={this.addTrade}></i>
                <div className="gridParent">
                    <div className="gridChild"> 
                        <PieDonut title= "Trades Success Rate" data={[{ name: 'Profit', value: this.state.profit }, { name: 'Loss', value: this.state.loss }]} colors={['#1fb20c', '#cc0e0e']}/>
                    </div>
                    <div className="gridChild">
                        <SecurityRadarChart data={this.radarChartData()} />
                    </div>
                    
                </div>
                {this.props.trades.map(entry => {
                    return (
                        <div key={entry.id} className='entry'>
                            <div onClick={(e) => this.showTradeDetails(entry)} className='entryChild'>{entry.ticker}</div>
                            <div onClick={(e) => this.showTradeDetails(entry)} className='entryChild innerChild'>{entry.tradeType}</div>
                            <div onClick={(e) => this.showTradeDetails(entry)} className='entryChild innerChild'>{entry.securityType === 'Option'? `Option (Premium = $${entry.optionPremium})`: entry.securityType}</div>
                            <div onClick={(e) => this.showTradeDetails(entry)} className='entryChild innerChild'>{entry.exitPrice > entry.entryPrice ? <i className="fas fa-arrow-circle-up profit"></i> : <i className="fas fa-arrow-circle-down loss"></i>}</div>
                            <div onClick={() => this.deleteRequest(entry)} className='entryChild innerChild deleteButton'><i className="fa fa-trash" aria-hidden="true"></i></div>
                        </div>
                    )
                })}
                <Modal open={this.state.open}>
                    <div>
                        {this.state.showFormModal ? <TradeFormComponent newTrade={this.state.newTrade} addingTrade={this.state.addingTrade} closeModal={this.closeModal} data={this.state.selectedTrade}/> : null}
                        {this.state.showDeleteModal? 
                            <div className="deleteModal">
                                <h1>Are you sure you want to delete your trade with ticker {this.state.deleteTrade.ticker}?</h1>
                                <button className="formButton" onClick={this.deleteTrade}>Yes</button>
                                <button className="formButton" onClick={this.closeModal}>No</button>
                            </div> : null 
                        }
                    </div>
                </Modal>
            </div>
        )
    }
}

const Trades = connect(mapStateToProps, mapDispatchToProps)(TradesTable);

export default Trades;