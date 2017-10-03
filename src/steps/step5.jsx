import React from 'react';
import ReactDOM from 'react-dom';

export default class Step5 extends React.Component {
    constructor(props) {
        super(props);
    }
    nextStep() {
        this.props.nextStep();
        this.props.updateData({
            name: '',
            email: '',
            country: '',
            countryID: '',
            city: '',
            urls: ['','','',''],
            urlsCheck: [false,false,false,false],
            avatarUrl: ''
        })
    }
    render() {
        return (
            <div id="step5">
                <img src={this.props.data.avatarUrl} alt="avatar"/>
                <h2>{this.props.data.name}</h2>
                <p>{this.props.data.email}</p>
                <p className="split">{this.props.data.city+' ,'+this.props.data.country}</p>
                <p>{this.props.data.urls[0] !== '' ? 'Facebook: '+this.props.data.urls[0] : '' }</p>
                <p>{this.props.data.urls[1] !== '' ? 'Vkonkakte: '+this.props.data.urls[1] : '' }</p>
                <p>{this.props.data.urls[2] !== '' ? 'Twitter: '+this.props.data.urls[2] : '' }</p>
                <p>{this.props.data.urls[3] !== '' ? 'Odnoklasniki: '+this.props.data.urls[3] : '' }</p>
                <button className="next" onClick={this.nextStep.bind(this)}>RESTART</button>
            </div>
        )
    }
}