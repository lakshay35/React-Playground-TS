import React, { Component } from 'react'
import './Terminal.scss'
import { IProps } from './IProps'
import { IState } from './IState';

import Typist from 'react-typist';
import { Link } from 'react-router-dom';


export class Terminal extends Component<IProps, IState> {

    render() {
        return (
            <div className='bash'>
                <div className='header'>
                    <div className='button close'></div>
                    <div className='button minimize'></div>
                    <div className='button expand'></div>
                    <span id='title'>{this.props.title}</span>
                </div>
                <div className='body'>
                    <Typist avgTypingDelay={5} cursor={{hideWhenDone: true}}>
                        <Typist.Delay ms={600} />
                        <span>$ npm start</span>
                        <Typist.Delay ms={300} />
                        <br />
                        <span>
                            Hi there! Welcome to my website! This is where you can learn 
                            more about who I am and what I do.
                        </span>
                        <Typist.Delay ms={200} />
                        <br />
                        <span>
                            I am a Full-Stack developer and love 
                            building new things and learning about different kinds of software systems. 
                        </span>
                        <Typist.Delay ms={300} />
                        <p></p>
                        <p>$ npm run-script about.me</p>
                        <p>
                            <Link to='/resume'>
                                Resume: <span style={{ color: '#1795e3'}}>View</span>
                            </Link>
                        </p>
                        <p>
                            LinkedIn: <a rel="noopener noreferrer" target='_blank' href='https://www.linkedin.com/in/sharma-lakshay/'>View</a>
                        </p>
                        <p>
                            Email: <a href="mailto:lakshay35@gmail.com">lakshay35@gmail.com</a>
                        </p>
                        <p>
                            GitHub: <a rel="noopener noreferrer" target='_blank' href='https://github.com/lakshay35'>View</a>
                        </p>
                    </Typist>
                    
                </div>
            </div>
        );
    }
}