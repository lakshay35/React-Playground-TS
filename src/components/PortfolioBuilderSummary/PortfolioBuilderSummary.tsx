import * as React from 'react';
import './PortfolioBuilderSummary.scss';
import HighlightAndZoomLineChart from '../HighlightAndZoomLineChart/HighlightAndZoomLineChart';

interface Props {
  data: Array<any>,
  stockSelection: Array<any>
}

export class PortfolioBuilderSummary extends React.Component<Props> {

  shouldComponentUpdate(nextProps: Props, nextState: any) {
    return nextProps.stockSelection.length == 4;
  }

  public render() {

    var tickers: Array<string>;
    if(this.props.stockSelection.length == 4) {
      tickers = [
        this.props.stockSelection[0].ticker,
        this.props.stockSelection[1].ticker,
        this.props.stockSelection[2].ticker,
        this.props.stockSelection[3].ticker
      ];
    }
    
    return (
      <div className="container">
        <HighlightAndZoomLineChart data={this.props.data} tickers={['projected']} title="Projected 10 year portfolio growth (Estimated based on historical statistics)"/>
          {this.props.stockSelection.length == 4 ? 
          
            (
              <div>
            <h1>Your Selection:</h1>
            <div className="selection">
              <div className="ticker"><i className="far fa-2x fa-chart-bar"></i>{tickers[0]}</div>
              <div>Price {this.props.stockSelection[0].price}</div>
              <div>Cost {this.props.stockSelection[0].expenseRatio} </div>
            </div>
            <div className="selection">
              <div className="ticker"><i className="far fa-2x fa-chart-bar"></i>{tickers[1]}</div>
              <div>Price {this.props.stockSelection[1].price}</div>
              <div>Cost {this.props.stockSelection[1].expenseRatio} </div>
            </div>
            <div className="selection">
              <div className="ticker"><i className="far fa-2x fa-chart-bar"></i>{tickers[2]}</div>
              <div>Price {this.props.stockSelection[2].price}</div>
              <div>Cost {this.props.stockSelection[2].expenseRatio} </div>
            </div>
            <div className="selection">
              <div className="ticker"><i className="far fa-2x fa-chart-bar"></i>{tickers[3]}</div>
              <div>Price {this.props.stockSelection[3].price}</div>
              <div>Cost {this.props.stockSelection[3].expenseRatio} </div>
            </div>
            </div>) : null
          }
          
      </div>
    );
  }
}
