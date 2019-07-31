import React, { Component } from "react";
import ReactDOM from "react-dom";
import './style.scss';
import RightArrow from './right-arrow';
import LeftArrow from './left-arrow';
import Slide from './slide'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                "assets/1.jpg",
                "assets/2.jpg",
                "assets/3.jpg",
                "assets/4.jpg",
                "assets/5.jpg",
                "assets/6.jpg",
                "assets/7.jpg",
                "assets/8.jpg",
                "assets/9.jpg",
                "assets/10.jpg",
            ],
            currentIndex: 0,
            translateValue: 0
        }
    }

    gotoPreviousSlide = () => {
        if (this.state.currentIndex === 0)
            return;

        this.setState(prevState => ({
            currentIndex: prevState.currentIndex - 1,
            translateValue: prevState.translateValue + this.slidWidth()
        }))
    }

    gotoNextSlide = () => {
        if (this.state.currentIndex === this.state.images.length - 1) {
            return this.setState({
                currentIndex: 0,
                translateValue: 0
            })
        }

        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1,
            translateValue: prevState.translateValue + -(this.slidWidth())
        }));
    }

    slidWidth = () => {
        return document.querySelector('.slide').clientWidth
    }

    render() {
        return (
            <div className="slider">
                <div className="slider-wrapper"
                    style={{
                        transform: `translateX(${this.state.translateValue}px)`,
                        transition: `transform ease-out 0.45s`
                    }}>

                    {
                        this.state.images.map((image, i) => (
                            <Slide key={i} image={image} />
                        ))
                    }
                </div>
                <LeftArrow
                    gotoPreviousSlide={this.gotoPreviousSlide}
                />

                <RightArrow
                    gotoNextSlide={this.gotoNextSlide}
                />

            </div>
        );
    }
}

// const App = () => 'Ok';

ReactDOM.render(<App />, document.getElementById('root'));