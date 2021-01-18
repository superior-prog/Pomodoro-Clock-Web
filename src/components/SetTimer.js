import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

function SetTimer(props) {

    const id = props.title.toLowerCase();

    return (
        <div className="timer-container">
            <h1 id={`${id}-label`}>{props.title} Length</h1>

            <div className="flex action-wrapper">
                <button className="btn" id={`${id}-decrement`} onClick={props.handleDecrease}>
                    <i className="fa fa-arrow-down"/>
                </button>

                <span id={`${id}-length`}>{props.count}</span>

                <button className="btn"  id={`${id}-increment`} onClick={props.handleIncrease}>
                    <i className="fa fa-arrow-up"/>
                </button>
            </div>
        </div>
    );
}

export default SetTimer;
