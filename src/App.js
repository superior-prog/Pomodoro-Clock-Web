import './App.css';
import SetTimer from "./components/SetTimer";
import React, {Component} from 'react';

const audio = document.getElementById("beep");

class App extends Component {
    constructor(props) {
        super(props);
        this.loop = undefined;
    }

    state = {
        breakCount: 5,
        sessionCount: 25,
        clockCount: 25 * 60,
        currentTimer: 'Session',
        isPlay: false,
    }

    convertToTime = (count) => {
        const minutes = Math.floor(count / 60);
        let seconds = count % 60;
        seconds = seconds < 10 ? ('0' + seconds) : seconds
        return `${minutes}:${seconds}`
    }

    handlePlayPause = () => {
        const {isPlay} = this.state;
        if (isPlay) {
            clearInterval(this.loop);
            this.setState({
                isPlay: false,
            });
        } else {
            this.setState({
                isPlay: true,
            });
            this.loop = setInterval(() => {
                const {clockCount, currentTimer, breakCount, sessionCount} = this.state;

                if (clockCount === 0) {
                    this.setState({
                        currentTimer: (currentTimer === 'Session') ? 'Break' : 'Session',
                        clockCount: (currentTimer === 'Session') ? (breakCount * 60) : (sessionCount * 60),
                    });
                } else {
                    this.setState({
                        clockCount: clockCount - 1,
                    });
                }
            }, 1000);
        }
    }

    handleReset = () => {
        this.setState({
            breakCount: 5,
            sessionCount: 25,
            clockCount: 25 * 60,
            currentTimer: 'Session',
            isPlay: false,
        })
        clearInterval(this.loop);
    }

    componentWillUnmount() {
        clearInterval(this.loop);
    }

    handleBreakIncrease = () => {
        const {breakCount, currentTimer} = this.state;
        if (breakCount < 60 && currentTimer === 'Session') {
            this.setState({
                breakCount: breakCount + 1,
                // clockCount: (breakCount + 1) * 60,
            })
        }
    }
    handleBreakDecrease = () => {
        const {breakCount, currentTimer, isPlay} = this.state;
        if (breakCount > 1 && currentTimer === 'Session') {
            this.setState({
                breakCount: breakCount - 1,
                // clockCount: (breakCount - 1) * 60,
            })
        }
    }
    handleSessionIncrease = () => {
        const {sessionCount, currentTimer, isPlay} = this.state;
        if (sessionCount < 60 && !isPlay && currentTimer === 'Session') {
            this.setState({
                sessionCount: sessionCount + 1,
                clockCount: (sessionCount + 1) * 60,
            })
        }
    }
    handleSessionDecrease = () => {
        const {sessionCount, currentTimer, isPlay} = this.state;
        if (sessionCount > 1 && !isPlay && currentTimer === 'Session') {
            this.setState({
                sessionCount: sessionCount - 1,
                clockCount: (sessionCount - 1) * 60,
            })
        }
    }


    render() {
        const {
            breakCount,
            sessionCount,
            clockCount,
            currentTimer,
            isPlay,
        } = this.state;

        const breakProps = {
            title: "Break",
            isPlay: isPlay,
            count: breakCount,
            handleIncrease: this.handleBreakIncrease,
            handleDecrease: this.handleBreakDecrease,
        }

        const sessionProps = {
            title: "Session",
            isPlay: isPlay,
            count: sessionCount,
            handleIncrease: this.handleSessionIncrease,
            handleDecrease: this.handleSessionDecrease,
        }
        return (
            <div>
                <h1>Pomodoro Clock</h1>
                <div className="flex">

                    <SetTimer {...breakProps}/>

                    <SetTimer {...sessionProps}/>

                </div>
                <div className="clock-container">
                    <h1 id="timer-label">{currentTimer}</h1>

                    {/*<div className="btn-tab-group">*/}
                    {/*    <button id="session" className="btn">*/}
                    {/*        Session*/}
                    {/*    </button>*/}

                    {/*    <button id="break" className="btn">*/}
                    {/*        Break*/}
                    {/*    </button>*/}
                    {/*</div>*/}


                    <span id="time-left">{this.convertToTime(clockCount)}</span>


                    <div className="flex">
                        <button id="start-stop" className="btn btn-action" onClick={this.handlePlayPause}>
                            <i className={`fa fa-${isPlay ? 'pause' : 'play'}`}/>
                            {
                                (isPlay)
                                    ? 'Pause' : 'Start'
                            }
                        </button>

                        <button id="reset" className="btn btn-action" onClick={this.handleReset}>
                            <i className="fa fa-repeat"/> Reset
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

