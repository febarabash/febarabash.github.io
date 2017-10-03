import React from 'react';

export default class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.status 
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            checked: nextProps.status
        })
    }

    render() {
        return <input checked={this.state.checked} type="checkbox" {...this.props} />
    }
}