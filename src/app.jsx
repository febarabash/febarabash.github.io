import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './scss/style.scss'

import Step1 from './steps/step1.jsx'
import Step2 from './steps/step2.jsx'
import Step3 from './steps/step3.jsx'
import Step4 from './steps/step4.jsx'
import Step5 from './steps/step5.jsx'

let data = {
    name: '',
    email: '',
    country: '',
    countryID: '',
    city: '',
    urls: ['','','',''],
    urlsCheck: [false,false,false,false],
    avatarUrl: ''
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.prevStep = this.prevStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.state = {
            step: 0
        }
        this.loadData(); 
    }

    updateData(newdata) {
        return function () {
            data = Object.assign({}, data, newdata)
        }.bind(this)()
    }
    loadData() {
        axios.get(`countries.json`)
        .then(res => {
          let countriesData = [] ;
          for (let el in res.data) {
            countriesData.push({
                id: el,
                country: res.data[el]
            })
        };
          this.setState({countriesData: countriesData});
        });
        axios.get(`cities.json`)
        .then(res => {
          const citiesData = [];
          for (let el in res.data) {
            citiesData.push({
                id: el,
                countryID: res.data[el].country,
                city: res.data[el].name
            })
        };
          this.setState({citiesData: citiesData});
        });
    }
    nextStep() {
        switch (this.state.step) {
            case 0:
            case 1:
            case 2:
            case 3:
                this.setState({ step: this.state.step + 1 })
                break;
            case 4:
                this.setState({ step: 0 })
                break;
        }
    }
    prevStep() {
        this.setState({ step: this.state.step - 1 })
    }
    render() {
        let activeStep;
        switch (this.state.step) {
            case 0:
                activeStep = (<Step1 data={data}
                                     updateData={this.updateData}
                                     nextStep={this.nextStep} />)
                break;
            case 1:
                activeStep = (<Step2 data={data}
                                     citiesData={this.state.citiesData}
                                     countriesData={this.state.countriesData}
                                     updateData={this.updateData}
                                     prevStep={this.prevStep}
                                     nextStep={this.nextStep} />)
                break;
            case 2:
                activeStep = (<Step3 data={data}
                                     updateData={this.updateData}
                                     prevStep={this.prevStep}
                                     nextStep={this.nextStep} />)
                break;
            case 3:
                activeStep = (<Step4 data={data}
                                     updateData={this.updateData}
                                     prevStep={this.prevStep}
                                     nextStep={this.nextStep} />)
                break;
            case 4:
                activeStep = (<Step5 data={data}
                                     nextStep={this.nextStep} />)
                break;
        }
        return (
            <div id="workplace">
                {activeStep}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
