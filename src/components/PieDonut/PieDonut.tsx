import * as React from 'react';;
import './PieDonut.scss';
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    Label,
    ResponsiveContainer
} from 'recharts';
import { History } from 'history';
import _ from 'lodash';

interface State {
  title: string;
}

interface Props {
  data: Array<coinData>,
  history?: History<any>,
  colors: Array<string>,
  title: string,
  width?: number,
  height?: number
}

interface coinData {
  name: string;
  value: number
}
export default class PieDonut extends  React.Component<Props, State> {

    state: State = {
      title: ''
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
      return !_.isEqual(nextProps.data, this.props.data) || nextProps.title != this.props.title || nextState.title != this.state.title;
    }

    render() {
        const { colors } = this.props;
        return (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={this.props.data} 
                cx={300} 
                cy={250} 
                innerRadius={110}
                outerRadius={140} 
                fill="#8884d8"
                dataKey='value'
                onMouseOver={(data) => this.setState({title: `${data.name} ${data.value}%`})}
                onMouseOut={() => this.setState({title: ''})}
              >
                <Label value={this.state.title} position="center"/>
                {
                  this.props.data.map((el, index: number) => {
                    return <Cell key={el.name} fill={colors[index]} />
                  })
                }
              </Pie>
              <Legend layout="vertical" verticalAlign="middle" align="left"/>
            </PieChart>
          </ResponsiveContainer>
        )
    }
}
