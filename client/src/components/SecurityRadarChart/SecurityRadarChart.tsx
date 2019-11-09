import * as React from 'react';
import './SecurityRadarChart.scss';
import { History } from 'history';

import {
    Radar, 
    RadarChart, 
    PolarGrid, 
    Legend,
    PolarAngleAxis, 
    PolarRadiusAxis,
    Tooltip,
    Label
} from 'recharts';

interface RadarData {
    security: string,
    count: number
}

interface Props {
    data: Array<RadarData>,
    history?: History<any>
}

export default class SecurityRadarChart extends  React.Component<Props> {

    render() {
        return (
            <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={this.props.data} >
                <PolarGrid />
                <PolarAngleAxis dataKey="security" />
                <PolarRadiusAxis/>
                <Radar dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                <Legend layout="vertical" verticalAlign="middle" align="left"/>
                <Label  value="Trade Type Breakdown" position="top"/>
                <Tooltip />
            </RadarChart>
        )
  }
}


