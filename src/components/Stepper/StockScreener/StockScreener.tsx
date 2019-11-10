import  * as React from 'react'
import './StockScreener.scss';
import { History } from 'history';
import { Chart } from 'react-google-charts';
import { environment } from '../../../environments/environment';
import BarChartView from '../../BarChartView/BarChartView';

interface Props {
    history: History<any>
}

interface State {
    keyword: String,
    volumeData: any,
    chartData: Array<Array<string>>
}

class StockScreener extends  React.Component<Props, State> {

    state: State = {
        keyword: '',
        volumeData: {
            data: [],
            key: ''
        },
        chartData: []
    }

    handleSearch = () => {
        fetch(`${environment.ALPHA_VANTAGE_API}TIME_SERIES_WEEKLY&symbol=${this.state.keyword}&apikey=${environment.ALPHA_VANTAGE_KEY}`)
        .then(res => res.json())
        .then(data => {
            var chartData = data['Weekly Time Series'];
            var tempData = new Array<Array<string>>();
            var volData = new Array<any>();
            for(var week in chartData) {
                // var date: Date = new Date(week);
                tempData.push([
                    week,
                    chartData[week]["3. low"],
                    chartData[week]["1. open"],
                    chartData[week]["4. close"],
                    chartData[week]["2. high"]
                ]);

                volData.push({
                    value: chartData[week]['5. volume']
                }); 

                this.setState({
                    volumeData: {
                        data: volData,
                        key: 'value'
                    },
                    chartData: tempData
                })
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Stock Screener</h1>
                <input onChange={(event) => this.setState({keyword: event.target.value})} onKeyDown={(event) => event.key === 'Enter' ? this.handleSearch() : null} placeholder="search ticker" type="text"></input>
                <div>
                    <Chart
                        width={'100%'}
                        height={'80vh'}
                        chartType="CandlestickChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['day', 'a', 'b', 'c', 'd'],
                            ['Mon', 20, 28, 38, 45],
                            ['Tue', 31, 38, 55, 66],
                            ['Wed', 50, 55, 77, 80],
                            ['Thu', 77, 77, 66, 50],
                            ['Fri', 68, 66, 22, 15],
                        ]}
                        options={{
                            legend: 'none',
                            bar: { groupWidth: '100%' }, // Remove space between bars.
                            candlestick: {
                                fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                                risingColor: { strokeWidth: 0, fill: '#0f9d58' }, // green
                            },
                        }}
                        rootProps={{ 'data-testid': '2' }}
                    />
                    <BarChartView data={this.state.volumeData.data} key={this.state.volumeData.key}/>
                </div>
            </div>
        )
    }

}

export default StockScreener;