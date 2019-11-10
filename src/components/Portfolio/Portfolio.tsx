import React, { Component } from 'react'
import './Portfolio.scss';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.scss';
import Carousel from 'react-bootstrap/Carousel';

import ChatIcon from '@material-ui/icons/Chat';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import WbSunnyTwoToneIcon from '@material-ui/icons/WbSunnyTwoTone'




export class Portfolio extends Component {

    render() {
        return (
            <div className='portfolio-container'>
                <VerticalTimeline layout='1-column'>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        icon={<ChatIcon />}
                    >
                        <h3 className="vertical-timeline-element-title">
                            Chat Express
                        </h3>

                        <h6 className="vertical-timeline-element-subtitle">
                            Node.js, Express.js, React.js, Socket.io
                        </h6>

                        <p>
                            Chat Express entails a platform that allows users to 
                            chat with one another. This project allowed me to practice 
                            using websockets with socket.io. I used an Express.js 
                            backend and React.js frontend, which allowed me to 
                            understand each framework in more detail.
                        </p>
                        <br></br>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="Chat/0.png"
                                alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="Chat/1.png"
                                alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="Chat/2.png"
                                alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="Chat/3.png"
                                alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="Chat/4.png"
                                alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        icon={<InsertChartIcon />}
                    >
                        <h3 className="vertical-timeline-element-title">Trade Assistant</h3>
                        <h6 className="vertical-timeline-element-subtitle">React.js, MySQL, Express.js, Redux</h6>
                        <p>
                            Trade Assistant is a web application that offers users the ability to track
                            stock market trade, offer insights into trading habits, suggestions 
                            for performance improvement, a portfolio building tool, and graphical 
                            ticker analysis.
                        </p>
                        <br></br>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="TradeAssistant/1.png"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="TradeAssistant/2.png"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="TradeAssistant/3.png"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="TradeAssistant/4.png"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="TradeAssistant/5.png"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        icon={<WbSunnyTwoToneIcon />}
                    >
                        <h3 className="vertical-timeline-element-title">Weather Forecaster</h3>
                        <h4 className="vertical-timeline-element-subtitle">React.js</h4>
                        <p>
                            This application uses a public temperature api to return a 
                            5-day forecast based on city names.
                        </p>

                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="WeatherApp/0.png"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="WeatherApp/2.png"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="WeatherApp/3.png"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
        )
    }
}