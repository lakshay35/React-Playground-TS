import * as React from 'react';
import HighlightAndZoomLineChart from '../HighlightAndZoomLineChart/HighlightAndZoomLineChart';
import { List, ListItem, ListItemText } from '@material-ui/core';
import EtfOption from '../EtfOption/EtfOption';

interface Props {
    tickers: Array<string>,
    data: Array<any>,
    title: string,
    percentage: number,
    addToPortfolio: (multiplier: number, etf: any) => void
}

interface State {
    selectedIndex: number
}

export default class EtfCustomizationView extends React.Component<Props, State> {

    state: State = {
        selectedIndex: null
    }

    handleListItemClick = (index: number, etf: any) => {
        this.setState({selectedIndex: index});
        this.props.addToPortfolio(this.props.percentage, etf);
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return this.state.selectedIndex != nextState.selectedIndex;
    }

    public render() {
        return (
        <div>
            <HighlightAndZoomLineChart tickers={this.props.tickers} title={this.props.title} data={this.props.data}/>
            <EtfOption ticker={this.props.tickers[0]} clicked={(etf: any) => this.handleListItemClick(0, etf)} selected={this.state.selectedIndex == 0 ? true : false}/>
            <EtfOption ticker={this.props.tickers[1]} clicked={(etf: any) => this.handleListItemClick(1, etf)} selected={this.state.selectedIndex == 1 ? true : false}/>
            <EtfOption ticker={this.props.tickers[2]} clicked={(etf: any) => this.handleListItemClick(2, etf)} selected={this.state.selectedIndex == 2 ? true : false}/>
            <EtfOption ticker={this.props.tickers[3]} clicked={(etf: any) => this.handleListItemClick(3, etf)} selected={this.state.selectedIndex == 3 ? true : false}/>
        </div>
        );
    }
}
