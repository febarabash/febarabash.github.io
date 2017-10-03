import React from 'react';

import CheckBox from './checkbox/checkBox.jsx'

export default class Step3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urls : this.props.data.urls,
            urlsCheck: this.props.data.urlsCheck,
            error: ''
        }
    }
    componentDidMount() {
        for(let id = 0; id < 4; id++) {
            this.inputsController(id);
        }
    }
    componentWillUpdate() {
        for(let id = 0; id < 4; id++) {
            this.inputsController(id);
        }
    }
    inputsController(id) {
        if (id == 0) {
            if (this.state.urlsCheck[id] == true) {
                document.getElementById('fburl').style.display = 'block';
            } else {
                
                document.getElementById('fburl').style.display = 'none';
            }
        } else if (id == 1) {
            if (this.state.urlsCheck[id] == true) {
                document.getElementById('vkurl').style.display = 'block';
            } else {
                document.getElementById('vkurl').style.display = 'none';
            }
        } else if (id == 2) {
            if (this.state.urlsCheck[id] == true) {
                document.getElementById('twurl').style.display = 'block';
            } else {
                document.getElementById('twurl').style.display = 'none';
            }
        } else if (id == 3) {
            if (this.state.urlsCheck[id] == true) {
                document.getElementById('odurl').style.display = 'block';
            } else {
                document.getElementById('odurl').style.display = 'none';
            }
        }
    }
    handleCheckBox(id,e) {
        e.stopPropagation();
        let newCheck = this.state.urlsCheck;
        newCheck[id] = !newCheck[id];
        if( newCheck[id] == false) {
            let newUrl = this.state.urls;
            newUrl[id] = '';
            this.setState({
                urls: newUrl
            })
        }
        this.setState({
            urlsCheck: newCheck
        })
    }
    handleInputChecked(id,e) {
        let newUrls = this.state.urls;
        newUrls[id] = e.target.value;
        this.setState({
            urls: newUrls
        })
    }
    validate() {
        let count = 0;
        for(let i = 0; i<4; i++) {
            if (this.state.urls[i].length > 30) {
                count++;
            } else if (this.state.urls[i].length == 0 && this.state.urlsCheck[i] == true ) {
                count = count - 10;
            }
        }
        return count;
    }
    prevStep() {
        this.props.prevStep();
    }
    nextStep() {
        if (this.validate() > 0 ) {
            this.setState({
                error: 'Mmm make shure that yours url < 30 symbols...'
            })
        } else if (this.validate() < 0 ) {
            this.setState({
                error: 'Opps... But u check the social and dont add link... '
            })
        } else {
            this.props.updateData({
                urlsCheck: this.state.urlsCheck,
                urls: this.state.urls
            });
            this.props.nextStep();
        }
    }
    render() {
        return (
            <div id="step3">
                <h1>Good job! Are you use this social?</h1>
                <div className="line clear">
                    <div className="checkbox">
                        <CheckBox onChange={this.handleCheckBox.bind(this,0)} id="fb" status={this.state.urlsCheck[0]} />
                        <label htmlFor="fb">Facebook</label>
                    </div>
                    <input id="fburl" type="text" onChange={this.handleInputChecked.bind(this,0)} value={this.state.urls[0]} placeholder="Your facebok link"/>
                </div>
                <div className="line clear">
                    <div className="checkbox">
                        <CheckBox onChange={this.handleCheckBox.bind(this,1)} id="vk" status={this.state.urlsCheck[1]} />
                        <label htmlFor="vk">Vkontakte</label>
                    </div>
                    <input id="vkurl" type="text" onChange={this.handleInputChecked.bind(this,1)} value={this.state.urls[1]} placeholder="Your vkontakte link" />
                </div>
                <div className="line clear">
                    <div className="checkbox">
                        <CheckBox onChange={this.handleCheckBox.bind(this,2)} id="tw" status={this.state.urlsCheck[2]} />
                        <label htmlFor="tw">Twitter</label>
                    </div>
                    
                    <input id="twurl" type="text" onChange={this.handleInputChecked.bind(this,2)} value={this.state.urls[2]} placeholder="Your twitter link" />
                </div>
                <div className="line clear">
                    <div className="checkbox">
                        <CheckBox onClick={this.handleCheckBox.bind(this,3)} id="od" status={this.state.urlsCheck[3]} />
                        <label htmlFor="od">Odnoklaskiki</label>
                    </div>
                    <input id="odurl" type="text" onChange={this.handleInputChecked.bind(this,3)} value={this.state.urls[3]} placeholder="Your odnoklaskiki link" />
                </div>
                <p className="error">{this.state.error}</p>
                <button className="prev" onClick={this.prevStep.bind(this)}>Prev</button>
                <button className="next" onClick={this.nextStep.bind(this)}>Next</button>
            </div>
        )
    }
}