import React from 'react';

import CitySelect from './list/citySelect.jsx'
import CountrySelect from './list/countrySelect.jsx'

export default class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: this.props.data.country,
            countryID: this.props.data.countryID,
            city: this.props.data.city,
            change: '',
            error: ''
        }
        this.updateSelect = this.updateSelect.bind(this);
    }
    updateSelect(config) {
        this.setState(config);
      }
    validate(country,countryID,city) {
        let count = 0;
        if (country == '' || countryID == '' || city == '') {
            return 'Please pick country and city from suggest lists'
        } else {
            for (let i = 0; i < this.props.citiesData.length;i++) {
                if (country == this.props.countriesData[Number(countryID)-1].country && countryID == this.props.citiesData[i].countryID && city == this.props.citiesData[i].city ) {
                    count += 1;
                } 
            }
            if (count > 0) {
                return ''
            }
            else {
                return 'Please pick country and city from suggest lists'
            }
        }
    }
    prevStep() {
            this.props.prevStep();
        }
    nextStep() {
            let newError = this.validate(this.state.country,this.state.countryID,this.state.city);
            if (newError == '') {
                let newdata = {
                    country: this.state.country,
                    countryID: this.state.countryID,
                    city: this.state.city
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
            <div id="step2">
                <h1>Thanks! And now where I can find you?</h1>
                <CountrySelect data={this.props.data}  countriesData={this.props.countriesData} updateSelect={this.updateSelect} change={this.state.change}/>
                <CitySelect data={this.props.data} citiesData={this.props.citiesData} city={this.state.city} countryID={this.state.countryID} updateSelect={this.updateSelect} change={this.state.change} />
                <p className="error">{this.state.error}</p>
                <button className="prev" onClick={this.prevStep.bind(this)}>Prev</button>
                <button className="next" onClick={this.nextStep.bind(this)}>Next</button>
            </div>
        )
    }
}