import  * as React from 'react'
import './PortfolioBuilder.scss';

import { History } from 'history';

import HorizontalLineStepper from '../../components/Stepper/Stepper';
import { Theme, createStyles, WithStyles, withStyles, Typography } from '@material-ui/core';
import PieDonut from '../../components/PieDonut/PieDonut';
import HighlightAndZoomLineChart from '../../components/HighlightAndZoomLineChart/HighlightAndZoomLineChart';
import EtfCustomizationView from '../../components/EtfCustomizationView/EtfCustomizationView';
import { PortfolioBuilderSummary } from '../../components/PortfolioBuilderSummary/PortfolioBuilderSummary';
import { RiskLevel } from '../../model/enums/RiskLevel';
import { data } from '../../stock-data/stockData';

interface State {
    capital: number,
    activeStep: number,
    animation: string,
    instruction: string,
    moderateToleranceSelected: string,
    safeToleranceSelected: string,
    aggressiveToleranceSelected: string,
    riskLevelData: Array<any>,
    title: string,
    currentView: number,
    tickers: Array<string>,
    averageReturn: string,
    bestYear: string,
    worstYear: string,
    totalValue: number,
    selectedLargeCap: any,
    selectedSmallCap: any,
    selectedInternational: any
    selectedBond: any,
    stockSelection: Array<any>,
    expectedGrowth: Array<any>
}

const styles = (theme: Theme) => createStyles({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

interface Props extends WithStyles<typeof styles> {
    history: History<any>
}

class PortfolioBuilder extends  React.Component<Props, State> {

    state: State = {
        capital: 0,
        activeStep: 0,
        animation: '',
        instruction: 'Enter an amount >= $500 (Recommended capital: $10,000)',
        moderateToleranceSelected: '',
        safeToleranceSelected: '',
        aggressiveToleranceSelected: '',
        riskLevelData: [],
        title: "Asset Categories",
        currentView: 0,
        tickers: [],
        averageReturn: '',
        bestYear: '',
        worstYear: '',
        totalValue: 0,
        selectedLargeCap: {
            price: 1,
            multiplier: 0
        },
        selectedSmallCap: {
            price: 1,
            multiplier: 0
        },
        selectedInternational: {
            price: 1,
            multiplier: 0
        },
        selectedBond: {
            price: 1,
            multiplier: 0
        },
        stockSelection: [
        ],
        expectedGrowth: []
    }

    getData = (ticker: string) => {
        switch (ticker) {
            case 'SCHB':
                return data.SCHB;
            case 'SPY':
                return data.SPY;
            case 'SCHX':
                return data.SCHX;
            case 'VV':
                return data.VV;
            case 'IJR':
                return data.IJR;
            case 'SCHA':
                return data.SCHA;
            case 'SLYG':
                return data.SLYG;
            case 'VBR':
                return data.VBR;
            case 'VTMGX':
                return data.VTMGX;
            case 'EFA':
                return data.EFA;
            case 'SCHF':
                return data.SCHF;
            case 'VEA':
                return data.VEA;
            case 'AGG':
                return data.AGG;
            case 'BND':
                return data.BND;
            case 'USIG':
                return data.USIG;
            case 'SCHP':
                return data.SCHP;
        }
    }

    capitalInput: React.RefObject<{}>;

    constructor(props: Props) {
        super(props);
        this.capitalInput = React.createRef();
    }

    /**
     * Handles Risk Level Selection
     * @param risk 
     */
    handleRiskToleranceClick(risk: RiskLevel) {
        switch(risk) {
            case RiskLevel.Low:
                var result = this.state.capital * (1 + 0.0657)**10;
                var avg = Math.trunc((result / 10) * 100) / 100;
                this.setState({
                    riskLevelData: [
                        { name: 'Large Cap', value: 55 }, 
                        { name: 'Small Cap', value: 20 }, 
                        { name: 'International', value: 10 }, 
                        { name: 'Fixed Income', value: 8 }, 
                        { name: 'Cash Investments', value: 7 }
                    ],
                    title: "Low Risk Selected",
                    averageReturn: '+6.57%',
                    bestYear: '+25%',
                    worstYear: '-21%',
                    expectedGrowth: [
                        { name: '2019', projected: this.state.capital },
                        { name: '2020', projected: this.state.capital + (avg * 1) },
                        { name: '2021', projected: this.state.capital + (avg * 2) },
                        { name: '2022', projected: this.state.capital + (avg * 3) },
                        { name: '2023', projected: this.state.capital + (avg * 4) },
                        { name: '2024', projected: this.state.capital + (avg * 5) },
                        { name: '2025', projected: this.state.capital + (avg * 6) },
                        { name: '2026', projected: this.state.capital + (avg * 7) },
                        { name: '2027', projected: this.state.capital + (avg * 8) },
                        { name: '2028', projected: this.state.capital + (avg * 9) },
                        { name: '2029', projected: this.state.capital + (avg * 10) }
                    ]
                });
                break;
            case RiskLevel.Medium:
                var result = this.state.capital * (1 + 0.0880) ** 10;
                var avg = Math.trunc((result / 10) * 100) / 100;
                this.setState({
                    riskLevelData: [
                        { name: 'Large Cap', value: 50 },
                        { name: 'Small Cap', value: 25 },
                        { name: 'International', value: 13 },
                        { name: 'Fixed Income', value: 5 },
                        { name: 'Cash Investments', value: 7 }
                    ],
                    title: "Medium Risk Selected",
                    averageReturn: '+8.80%',
                    bestYear: '+31%',
                    worstYear: '-26%',
                    expectedGrowth: [
                        { name: '2019', projected: this.state.capital },
                        { name: '2020', projected: this.state.capital + (avg * 1) },
                        { name: '2021', projected: this.state.capital + (avg * 2) },
                        { name: '2022', projected: this.state.capital + (avg * 3) },
                        { name: '2023', projected: this.state.capital + (avg * 4) },
                        { name: '2024', projected: this.state.capital + (avg * 5) },
                        { name: '2025', projected: this.state.capital + (avg * 6) },
                        { name: '2026', projected: this.state.capital + (avg * 7) },
                        { name: '2027', projected: this.state.capital + (avg * 8) },
                        { name: '2028', projected: this.state.capital + (avg * 9) },
                        { name: '2029', projected: this.state.capital + (avg * 10) }
                    ]
                });
                break;
            case RiskLevel.High: 
                var result = this.state.capital * (1 + 0.0880) ** 10;
                var avg = Math.trunc((result / 10) * 100) / 100;
                this.setState({
                    riskLevelData: [
                        { name: 'Large Cap', value: 50 },
                        { name: 'Small Cap', value: 25 },
                        { name: 'International', value: 20 },
                        { name: 'Fixed Income', value: 0 },
                        { name: 'Cash Investments', value: 5 }
                    ],
                    title: "High Risk Selected",
                    averageReturn: '+10.20%',
                    bestYear: '+37%',
                    worstYear: '-32%',
                    expectedGrowth: [
                        { name: '2019', projected: this.state.capital },
                        { name: '2020', projected: this.state.capital + (avg * 1) },
                        { name: '2021', projected: this.state.capital + (avg * 2) },
                        { name: '2022', projected: this.state.capital + (avg * 3) },
                        { name: '2023', projected: this.state.capital + (avg * 4) },
                        { name: '2024', projected: this.state.capital + (avg * 5) },
                        { name: '2025', projected: this.state.capital + (avg * 6) },
                        { name: '2026', projected: this.state.capital + (avg * 7) },
                        { name: '2027', projected: this.state.capital + (avg * 8) },
                        { name: '2028', projected: this.state.capital + (avg * 9) },
                        { name: '2029', projected: this.state.capital + (avg * 10) }
                    ]
                });
                break;
        }
    }

    /**
     * next click handler
     */
    handleNextClick = (step: number): boolean => {
        if (isNaN(this.state.capital) || this.state.capital < 500) {
            alert('Please enter an amount >= $500');
            return false;
        } else {

            if(step == 2 && this.state.riskLevelData.length == 0) {
                alert('Please select an option');
                return false;
            }
            this.setState({
                activeStep: step,
                animation: 'slideOutLeft'
            });

            switch (step) {
                case 1:
                    setTimeout(() => this.setState({
                        animation: 'slideInLeft',
                        instruction: this.getStepContent(1),
                        currentView: step
                    }), 100);
                    break;
                case 2:
                    setTimeout(() => this.setState({
                        animation: 'slideInLeft',
                        instruction: this.getStepContent(2),
                        currentView: step
                    }), 100);
                    break;
                case 3:
                    setTimeout(() => this.setState({
                        animation: 'slideInLeft',
                        instruction: this.getStepContent(3),
                        currentView: step,
                        selectedLargeCap: {
                            price: 1,
                            multiplier: 0
                        },
                        selectedSmallCap: {
                            price: 1,
                            multiplier: 0
                        },
                        selectedInternational: {
                            price: 1,
                            multiplier: 0
                        },
                        selectedBond: {
                            price: 1,
                            multiplier: 0
                        }
                    }), 100);
            }
        }
        return true;
    }


    /**
     * back click handler
     */
    handleBackClick = (step: number) => {
        this.setState({
            activeStep: step,
            animation: 'slideOutRight'
        });

        switch (step) {
            case 0:
                setTimeout(() => this.setState({
                    animation: 'slideInRight',
                    instruction: this.getStepContent(0),
                    currentView: step
                }), 100);
                break;
            case 1:
                setTimeout(() => this.setState({
                    animation: 'slideInRight',
                    instruction: this.getStepContent(1),
                    currentView: step
                }), 100);
                break;
            case 2:
                setTimeout(() => this.setState({
                    animation: 'slideInRight',
                    instruction: this.getStepContent(2),
                    currentView: step
                }), 100);
                break;
        }
    }

    handleReset = () => {
        console.log(this.capitalInput.current);
        this.setState({
            animation: 'slideUp',
            activeStep: 0,
            currentView: 0,
            capital: 0
        });
    }

    getStepContent(value: number) {
        switch (value) {
            case 0:
                return 'Enter an amount >= $500 (Recommended capital: $10,000)';
            case 1:
                return 'Select your risk tolerance level';
            case 2:
                return 'Here is a list of stocks we have picked out. Feel free to customize it to your liking. After all it\'s your money';
            default:
                return 'Find a summary of your selections below. (Note: These are estimates, which are calculated based on historical performance)';
        }
    }

    /**
     * Returns formatted data for chart
     */
    getEtfCustomizationViewData = (tickers: Array<string>) => {

        var result = new Array<any>();

        var firstTicker: any = this.getData(tickers[0])["Weekly Time Series"];
        var secondTicker: any = this.getData(tickers[1])["Weekly Time Series"];
        var thirdTicker: any = this.getData(tickers[2])["Weekly Time Series"];
        var fourthTicker: any = this.getData(tickers[3])["Weekly Time Series"];

        for (var day in firstTicker) {
            result.push({
                name: day,
                [tickers[0]]: firstTicker[day]["4. close"],
                [tickers[1]]: secondTicker[day]["4. close"],
                [tickers[2]]: thirdTicker[day]["4. close"],
                [tickers[3]]: fourthTicker[day]["4. close"]
            });

        }
        return result.reverse();
    }

    addStockToPortfolio = (multiplier: number, etf: any, type: string) => {
        etf.multiplier = multiplier;
        console.log(etf);

        var largeCap: number = Math.floor(Math.floor((this.state.selectedLargeCap.multiplier/100) * this.state.capital) / this.state.selectedLargeCap.price) * this.state.selectedLargeCap.price;
        var smallCap: number = Math.floor(Math.floor((this.state.selectedSmallCap.multiplier/100) * this.state.capital) / this.state.selectedSmallCap.price) * this.state.selectedSmallCap.price;
        var international: number = Math.floor(Math.floor((this.state.selectedInternational.multiplier/100) * this.state.capital) / this.state.selectedInternational.price) * this.state.selectedInternational.price;
        var bonds: number = Math.floor(Math.floor((this.state.selectedBond.multiplier/100) * this.state.capital) / this.state.selectedBond.price) * this.state.selectedBond.price;

        switch(type) {
            case 'Large Cap':
                this.setState({
                    selectedLargeCap: etf
                });
                largeCap = Math.floor(Math.floor((etf.multiplier/100) * this.state.capital) / etf.price) * etf.price;
                this.setState({
                    totalValue: Math.trunc((largeCap + smallCap + international + bonds) * 100) / 100,
                    stockSelection: [
                        ...this.state.stockSelection,
                        etf
                    ]
                });
                break;
            case 'Small Cap':
                this.setState({
                    selectedSmallCap: etf
                });
                smallCap = Math.floor(Math.floor((etf.multiplier / 100) * this.state.capital) / etf.price) * etf.price;
                this.setState({
                    totalValue: Math.trunc((largeCap + smallCap + international + bonds) * 100) / 100,
                    stockSelection: [
                        ...this.state.stockSelection,
                        etf
                    ]
                });
                break;
            case 'International':
                this.setState({
                    selectedInternational: etf
                });
                international = Math.floor(Math.floor((etf.multiplier / 100) * this.state.capital) / etf.price) * etf.price;
                this.setState({
                    totalValue: Math.trunc((largeCap + smallCap + international + bonds) * 100) / 100,
                    stockSelection: [
                        ...this.state.stockSelection,
                        etf
                    ]
                });
                break;
            case 'Bonds':
                this.setState({
                    selectedBond: etf
                });
                bonds = Math.floor(Math.floor((etf.multiplier / 100) * this.state.capital) / etf.price) * etf.price;
                this.setState({
                    totalValue: Math.trunc((largeCap + smallCap + international + bonds) * 100) / 100,
                    stockSelection: [
                        ...this.state.stockSelection,
                        etf
                    ]
                });
                break;
        }
    }

    getSecondaryView(step: number){
        switch(step) {
            case 1:
                return (
                    <div className={`${this.state.animation} instruction-text`}>
                        <h4 className="major">Average Annual Return: <span className="positive">{this.state.averageReturn}</span></h4>
                        <h4 className="minor">Worst Year (2008): <span className="negative">{this.state.worstYear}</span></h4>
                        <h4 className="minor">Best Year (1978) <span className="positive">{this.state.bestYear}</span></h4>
                    </div>
                )
            case 2:
                return (
                    <div className={`${this.state.animation} instruction-text`}>
                        <h4>Total Portoflio Value: {this.state.totalValue}</h4>
                        <h4>Cash Value: {this.state.capital - this.state.totalValue}</h4>
                        <h4>Total Capital: {this.state.capital}</h4>
                    </div>
                );
            default:
                return null;
        }
    }

    render() {
        const { classes } = this.props;
        const noDisplay = {display: 'none'}
        return (
            <div className="view"> 
                <h1 className="title">Ready to build a custom portfolio? Follow the steps below</h1>
                <HorizontalLineStepper activeStep={this.state.activeStep} handleReset={() => this.handleReset()} handleNextClick={(step: number) => this.handleNextClick(step)} handleBackClick={(step: number) => this.handleBackClick(step)}/>
                <div className="mini-header"><div className={`${this.state.animation} instruction-text`}><h4>{this.state.instruction}</h4></div>{this.getSecondaryView(this.state.currentView)}</div>
                <div className={`stepper-view ${this.state.animation}`}>

                    {/* Capital Input View */}
                    <input
                        // ref={this.capitalInput}
                        style={this.state.currentView == 0 ? null : noDisplay}
                        className='initialInvestment'
                        type="number"
                        placeholder="Initial Investment"
                        onChange={(event: any) => this.setState({ capital: parseInt(event.target.value) })}
                        onKeyPress={(event: any) => { event.key == 'Enter' ? this.handleNextClick(this.state.activeStep + 1) : null }}>
                    </input>
                    

                    {/* Risk Tolerance View */}
                    <div className="riskTolerance" style={this.state.currentView == 1 ? null : noDisplay}>
                        <div className="tolerance">
                            <div className={`step step-risk-low ${this.state.aggressiveToleranceSelected}`} onClick={() => this.handleRiskToleranceClick(RiskLevel.Low)}><h5>I can't handle my account making sharp moves (i.e. Risk Averse)</h5></div>
                            <div className={`step risk-medium ${this.state.moderateToleranceSelected}`} onClick={() => this.handleRiskToleranceClick(RiskLevel.Medium)}><h5>I want to see some action but not too much (i.e. Moderate Risk Taker)</h5></div>
                            <div className={`step risk-high ${this.state.safeToleranceSelected}`} onClick={() => this.handleRiskToleranceClick(RiskLevel.High)}><h5>Throw everything at me. I'll stand strong like nothing happened (i.e. Risky Tolerant)</h5></div>
                        </div>
                        <div className="risk-view">
                                <PieDonut title={this.state.title} data={this.state.riskLevelData} colors={['#31a0ea', '#2183c4', '#2771a3', '#4d82a5', '#7099b5']} />
                        </div>
                    </div>

                    {/* Stock Customization View */}
                    <div className="etf-customization-view" style={this.state.currentView == 2 ? null : noDisplay}>
                        <div className="etf-customization-row">
                            <EtfCustomizationView title='Large Cap (Past 10 Years)' addToPortfolio={(multiplier: number, etf: any,) => this.addStockToPortfolio(multiplier, etf, 'Large Cap')} percentage={this.state.riskLevelData[0] ? this.state.riskLevelData[0].value : 0} tickers={['SPY', 'SCHB', 'SCHX', 'VV']} data={this.getEtfCustomizationViewData(['SPY', 'SCHB', 'SCHX', 'VV'])}/>
                            <EtfCustomizationView title='Small Cap (Past 10 Years)' addToPortfolio={(multiplier: number, etf: any) => this.addStockToPortfolio(multiplier, etf, 'Small Cap')} percentage={this.state.riskLevelData[1] ? this.state.riskLevelData[1].value : 0} tickers={['IJR', 'SCHA', 'SLYG', 'VBR']} data={this.getEtfCustomizationViewData(['IJR', 'SCHA', 'SLYG', 'VBR'])}/>
                            <EtfCustomizationView title='International Market (Past 10 Years)' addToPortfolio={(multiplier: number, etf: any) => this.addStockToPortfolio(multiplier, etf, 'International')} percentage={this.state.riskLevelData[2] ? this.state.riskLevelData[2].value : 0} tickers={['VTMGX', 'EFA', 'SCHF', 'VEA']} data={this.getEtfCustomizationViewData(['VTMGX', 'EFA', 'SCHF', 'VEA'])}/>
                            <EtfCustomizationView title='Bonds (Past 10 Years)' addToPortfolio={(multiplier: number, etf: any) => this.addStockToPortfolio(multiplier, etf, 'Bonds')} percentage={this.state.riskLevelData[3] ? this.state.riskLevelData[3].value : 0} tickers={['AGG', 'BND', 'USIG', 'SCHP']} data={this.getEtfCustomizationViewData(['AGG', 'BND', 'USIG', 'SCHP'])}/>
                        </div>
                    </div>

                    {/* Portfolio Summary View */}
                    <div style={this.state.currentView == 3 ? null : noDisplay}>
                        <PortfolioBuilderSummary data={this.state.expectedGrowth} stockSelection={this.state.stockSelection}/>
                    </div>

                </div>
            </div>
        )
    }

}

export default withStyles(styles)(PortfolioBuilder);