import * as React from 'react';
import {
    Label,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceArea,
    Legend,
} from 'recharts'
import { Button, Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';
import './HighlightAndZoomLineChart.scss';
import { environment } from '../../environments/environment';
import { data } from '../../stock-data/stockData';

const styles = (theme: Theme) => createStyles({
    button: {
        margin: theme.spacing.unit
    }
})

interface Props extends WithStyles<typeof styles> {
    title: string,
    tickers: Array<string>,
    data: Array<any>
}

class HighlightAndZoomLineChart extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    shouldComponentUpdate(nextProps: Props, nextState: any) {
        return false || nextProps.data[0].name == '2019';
    }

    public render() {
        const colors = ["#6600cc", "#3399ff", "#990000", "#663300"];
        return (
            <div className="highlight-bar-charts">
                <h3>{this.props.title}</h3>
                <LineChart
                    width={650}
                    height={450}
                    data={this.props.data}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    {
                        this.props.tickers.map((ticker, index) => {
                            return (<Line type="natural" dot={false} dataKey={ticker} stroke={colors[index]} strokeWidth={2} />)
                        })
                    }
                </LineChart>
            </div>
        );
    }
}

export default withStyles(styles)(HighlightAndZoomLineChart);
