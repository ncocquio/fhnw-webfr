import React from 'react';
import {Button} from 'reactstrap';
import {IoMdAddCircleOutline, IoMdRefresh} from "react-icons/io";

export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
        this.increment = this.increment.bind(this);
        this.reset = this.reset.bind(this);
    }

    increment() {
        this.setState({counter: this.state.counter + 1});
    }

    reset() {
        this.setState({counter: 0});
    }

    render() {
        const nrStyle = {
            textAlign: 'center',
            fontSize: '320px',
            margin: '10px'
        };
        return (
            <div>
                <p style={nrStyle}>{this.state.counter}</p>
                <Button color="info" type="button" onClick={this.increment}>
                    <IoMdAddCircleOutline/> Increment
                </Button>&nbsp;
                <Button color="danger" type="button" onClick={this.reset}>
                    <IoMdRefresh/> Refresh
                </Button>&nbsp;
                {this.props.message}
            </div>
        )
    }
}