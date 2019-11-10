import React, { Component } from 'react';
import './Resume.scss';

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';

export class Resume extends Component {

    state = {
        height: String,
        width: String
    }
    render() {
        return (
            <iframe width="100%" title='resume' height="800px" src="https://www.docdroid.net/krsXBBw/resume.pdf" frameBorder="0"></iframe>
            // <Container>
            //     <Row>
            //         <iframe
            //             title='resume'
            //             id='resume'
            //             width='100%'
            //             height='800px'
            //             src="Resume.pdf"
            //             frameBorder='0'
            //         >
            //         </iframe>
            //     </Row>
            // </Container>
        );
    }
}