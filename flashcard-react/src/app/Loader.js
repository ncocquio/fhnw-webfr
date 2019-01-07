import React from 'react';

export class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    render() {
        return (
            <div>
                Loading...
            </div>
        )
    }
}