import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    button: {
        marginLeft: theme.spacing.unit
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

interface Props extends WithStyles<typeof styles> {
    handleNextClick: (step: number) => boolean,
    handleBackClick: (step: number) => void,
    handleReset: () => void,
    activeStep: number
}

interface State {
    activeStep: number,
    skipped: Set<any>,
    animation: string
}

class HorizontalLinearStepper extends React.Component<Props, State> {
    state: State = {
        activeStep: 0,
        skipped: new Set(),
        animation: ''
    };

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        if (nextProps.activeStep != this.props.activeStep) {
            this.setState({
                activeStep: nextProps.activeStep
            });
        }
        return nextState.activeStep != this.state.activeStep || nextProps.activeStep != this.props.activeStep;
    }

    getSteps = () => {
        return ['Investment Capital', 'Risk Tolerance', 'Customize Selection'];
    }

    /**
     * Step next
     */
    handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;

        if(this.props.handleNextClick(activeStep + 1)) {
            this.setState({
                activeStep: activeStep + 1,
                skipped,
                animation: 'slideOutLeft'
            });
        }
        
        
    };

    /**
     * Step back
     */
    handleBack = () => {
        const { activeStep } = this.state;
        this.props.handleBackClick(activeStep - 1);

        this.setState({
            activeStep: activeStep - 1,
            animation: 'slideOutRight'
        });
    };

    /**
     * Reset Stepper
     */
    handleReset = () => {
        this.props.handleReset();

        this.setState({
            activeStep: 0,
        });
    };

    

    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
                
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Button onClick={this.handleReset} className={classes.button}>
                                Start Over
                            </Button>
                        </div>
                    ) : (
                            <div>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={this.handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                </div>

                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const props = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...props}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

            </div>
        );
    }
}

export default withStyles(styles)(HorizontalLinearStepper);