import * as React from 'react';
import './EtfOption.scss';
import { data } from '../../stock-data/stockInfo';

interface Props {
  selected: boolean,
  clicked: Function,
  ticker: string
}

interface State {
  description: string,
  expenseRatio: string,
  price: string
}

export default class EtfOption extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    switch (props.ticker) {
      case 'SCHA':
        this.state = {
          description: data.SCHA.description,
          expenseRatio: data.SCHA.expenseRatio,
          price: data.SCHA.price
        }
        break;
      case 'SCHB':
        this.state = {
          description: data.SCHB.description,
          expenseRatio: data.SCHB.expenseRatio,
          price: data.SCHB.price
        }
        break;
      case 'SPY':
        this.state = {
          description: data.SPY.description,
          expenseRatio: data.SPY.expenseRatio,
          price: data.SPY.price
        }
        break;
      case 'SCHP':
        this.state = {
          description: data.SCHP.description,
          expenseRatio: data.SCHP.expenseRatio,
          price: data.SCHP.price
        }
        break;
      case 'SCHF':
        this.state = {
          description: data.SCHF.description,
          expenseRatio: data.SCHF.expenseRatio,
          price: data.SCHF.price
        }
        break;
      case 'SCHX':
        this.state = {
          description: data.SCHX.description,
          expenseRatio: data.SCHX.expenseRatio,
          price: data.SCHX.price
        }
        break;
      case 'SLYG':
        this.state = {
          description: data.SLYG.description,
          expenseRatio: data.SLYG.expenseRatio,
          price: data.SLYG.price
        }
        break;
      case 'USIG':
        this.state = {
          description: data.USIG.description,
          expenseRatio: data.USIG.expenseRatio,
          price: data.USIG.price
        }
        break;
      case 'VBR':
        this.state = {
          description: data.VBR.description,
          expenseRatio: data.VBR.expenseRatio,
          price: data.VBR.price
        }
        break;
      case 'VEA':
        this.state = {
          description: data.VEA.description,
          expenseRatio: data.VEA.expenseRatio,
          price: data.VEA.price
        }
        break;
      case 'VV':
        this.state = {
          description: data.VV.description,
          expenseRatio: data.VV.expenseRatio,
          price: data.VV.price
        }
        break;
      case 'VTMGX':
        this.state = {
          description: data.VTMGX.description,
          expenseRatio: data.VTMGX.expenseRatio,
          price: data.VTMGX.price
        }
        break;
      case 'AGG':
        this.state = {
          description: data.AGG.description,
          expenseRatio: data.AGG.expenseRatio,
          price: data.AGG.price
        }
        break;
      case 'BND':
        this.state = {
          description: data.BND.description,
          expenseRatio: data.BND.expenseRatio,
          price: data.BND.price
        }
        break;
      case 'EFA':
        this.state = {
          description: data.EFA.description,
          expenseRatio: data.EFA.expenseRatio,
          price: data.EFA.price
        }
        break;
      case 'IJR':
        this.state = {
          description: data.IJR.description,
          expenseRatio: data.IJR.expenseRatio,
          price: data.IJR.price
        }
        break;
      default:
        this.state = {
          description: 'Not Found',
          expenseRatio: 'Not Found',
          price: 'Not Found'
        }
    }
  }

  public render() {

    return (
      <div className="etf-option-container" onClick={() => this.props.clicked({ticker: this.props.ticker, description: this.state.description, expenseRatio: this.state.expenseRatio, price: this.state.price})}>
        <div className="etf-option-child">
          <i hidden={true} className={`far fa-3x fa-check-circle ${this.props.selected ? null: 'hidden'}`}></i>
        </div>
        <div className="etf-option-child">
          <i className="far fa-2x fa-chart-bar"></i>{this.props.ticker}
        </div>
        <div className="etf-option-child">
          <i className="fas fa-info-circle" onClick={() => alert('info')}></i>{this.state.description}
        </div>
        <div className="etf-option-child">
          Expense Ratio: {this.state.expenseRatio}
        </div>
        <div className="etf-option-child">
          Price: {this.state.price}
        </div>
      </div>
    );
  }
}
