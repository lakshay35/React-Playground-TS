import React, { Component } from 'react'
import './Logo.scss';
import { IProps } from './IProps';

export class Logo extends Component<IProps> {
    
    render() {
        return ( 
            <h2 id='logo' style={this.getStyles()}>
                LS
            </h2>
            
        )
    }

    getStyles = () => {
        if(this.props.style === 'secondary') {
            return {
                    backgroundColor: '#fff',
                    color: '#495f70'
                }
        }

        return {};
    }
}