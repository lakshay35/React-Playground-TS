import * as React from 'react';
import { BarChart, Bar, Tooltip, CartesianGrid } from "recharts";
import './BarChartView.scss';

interface Props {
    data: Array<any>,
    key: string
}

export default class BarChartView extends React.Component<Props> {


    render() {
        return (
            <BarChart width={600} height={300} data={this.props.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey={this.props.key} fill="#8884d8" />
            </BarChart>
        )
    }
}