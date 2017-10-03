import React from 'react';
import ReactDOM from 'react-dom';

export default class Step4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarUrl: this.props.data.avatarUrl,
            error: ''
        }
    }
    componentDidMount() {
        let imgs = document.getElementById('step4').getElementsByTagName('img');
        for(let id = 0; id < 4; id++) {
            if (imgs[id].getAttribute('src') == this.props.data.avatarUrl) {
                imgs[id].classList.add('myavatar');
            }
        }
    }
    handleImg(id ,e) {
        let imgs = document.getElementById('step4').getElementsByTagName('img');
        for (let i = 0; i < 4; i++) {
            if (imgs[i].classList.contains('myavatar')) {
                imgs[i].classList.remove('myavatar')
            }
        }
        e.target.classList.add('myavatar');
        this.setState({
            avatarUrl: e.target.getAttribute('src')
            })
    }
    prevStep() {
        this.props.prevStep();
    }
    nextStep() {
        if ( this.state.avatarUrl == './img/1.jpg') {
            this.setState({
                error: 'Oh my god... Try more)'
            })
        } else {
            this.props.updateData({
                avatarUrl: this.state.avatarUrl
            })
            this.props.nextStep();
        }

    }

    render() {
        return (
            <div id="step4">
                <h1>Bender shall not pass! Choose any cat :) </h1>
                <img src="./img/1.jpg" onClick={this.handleImg.bind(this,0)}  style={{float: 'left'}} />
                <img src="./img/2.jpg" onClick={this.handleImg.bind(this,1)}  style={{float: 'right'}}/>
                <img src="./img/3.jpg" onClick={this.handleImg.bind(this,2)}  style={{float: 'left'}} />
                <img src="./img/4.jpg" onClick={this.handleImg.bind(this,3)}  style={{float:'right'}} />
                <p className="error">{this.state.error}</p>
                <button className="prev" onClick={this.prevStep.bind(this)}>Prev</button>
                <button className="next" onClick={this.nextStep.bind(this)}>Finish</button>
            </div>
        )
    }
}