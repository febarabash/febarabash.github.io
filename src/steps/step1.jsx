import React from 'react';

export default class Step1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name,
            email: this.props.data.email,
            error: ''
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
    }
    handleChangeName(e) {
        this.setState({name: e.target.value})
    }
    handleChangeEmail(e) {
        this.setState({email: e.target.value})
    }
    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    validateName(name) {
        let re = /^[а-яА-ЯёЁa-zA-Z ]{2,30}$/;
        return re.test(name);
    }
    validate(name,email) {
        if (this.validateName(name) == true && this.validateEmail(email) == true) {
            return '';
        } else if (this.validateName(name) == true && this.validateEmail(email) == false) {
            return 'Somethig wrong with your email Sir... Try to look on placeholder example.'
        } else if (this.validateName(name) == false && this.validateEmail(email) == true) {
            return 'Oh.. Sir sorry.. Your name is too long or you are Bender. '
        } else {
            return 'Sir! Your email and name wrong... Try to look on placeholder example.'
        }
    }
    nextStep() {
        let newError = this.validate(this.state.name,this.state.email);
        if (newError == '') {
            let newdata = {
                name: this.state.name,
                email: this.state.email
            }
            this.setState({
                error: newError
            });
            this.props.updateData(newdata);
            this.props.nextStep();
        } else {
            this.setState({
                error: newError
            });
        }
    }
    render() {
        return (
            <div id="step1" className="clear">
                <h1>Hi sir! Let me know your name and email?</h1>
                <input id="name"  value={this.state.name} onChange={this.handleChangeName} type="text" placeholder="Name Surname"/>
                <input id="email" value={this.state.email} onChange={this.handleChangeEmail} type="email" placeholder="youremail@example.com" />
                <p className="error">{this.state.error}</p>
                <button className="next" onClick={this.nextStep.bind(this)}>Next</button>
            </div>
        )
    }
}