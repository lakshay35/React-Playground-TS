import React, { Component } from 'react';
import './Home.scss';

import { Terminal } from '../../components/Terminal/Terminal';
import { Logo } from '../../components/Logo/Logo';
import { Portfolio } from '../../components/Portfolio/Portfolio';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IProps } from './IProps';
import { IState } from './IState';

import {
    Route,
    Redirect,
    Switch,
    Link,
    withRouter,
    RouteComponentProps
} from 'react-router-dom';

import { Resume } from '../../components/Resume/Resume';

interface RouterProps extends RouteComponentProps<{}> {
}


class Home extends Component<IProps, IState> {




    constructor(props: IProps & RouterProps) {
        super(props);

        this.state = {
            showMobile: window.innerHeight <= 768
        }
        console.log(window.innerHeight);
    }


    render() {
        return (
            <div>

                <Container fluid className='root' style={this.getStyles()}>
                        <Row>
                            <Col sm={10} md={10} lg={10}>
                                <h1 id='name' className='home-text'>Lakshay Sharma</h1>
                            </Col>
                            <Col sm={2} md={2} lg={2}>
                                <Logo />
                            </Col>
                        </Row>
                    <br />
                    {/* <Row>
                        <Col sm={12} md={8} lg={8}>
                            <Switch>
                                <Route exact path='/' render={() => {
                                    document.body.style.background = '#bac5e6';
                                    return <Terminal title='Me' />
                                }} />

                                <Route exact path='/portfolio' render={() => {
                                    document.body.style.background = '#badce6';
                                    return <Portfolio />
                                }} />

                                <Route exact path='/experience' render={() => {
                                    document.body.style.background = '#b5c4a9';
                                    return <Experience />
                                }} />

                                <Route exact path='/resume' render={() => {
                                    document.body.style.background = '#bacfe6';
                                    return <Resume />
                                }} />

                                <Route render={() => {
                                    return <Redirect to='/' />
                                }} />
                            </Switch>
                        </Col>
                            <Col sm={0} md={4} lg={4}>

                                <Link to='/'>
                                    <h2 className='home-text'>
                                        About Me
                                </h2>
                                </Link>

                                <Link to='/portfolio'>
                                    <h2 className='home-text'>
                                        Portfolio
                                </h2>
                                </Link>

                                <Link to='/experience'>
                                <h2 className='home-text'>
                                    Experience
                                </h2>
                            </Link>

                                <Link to='/resume'>
                                    <h2 className='home-text'>
                                        Resume
                                </h2>
                                </Link>

                            </Col>
                    </Row> */}
                </Container>
            </div>
        );
    }

    getStyles = () => {
        return this.state.showMobile ? { padding: 0 } : {};
    }
}

export default Home;