import React from 'react';

export default class CountrySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: this.props.data.country,
            activeData: this.props.countriesData,
            show: false
        }
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleListItem = this.handleListItem.bind(this);
    }
    listShow(elem) {
        if (this.state.show === false ) {
            document.getElementById(elem).style.display = 'block';
            this.setState({show : true}); 
        }
    }
    listHide(elem) {
        document.getElementById(elem).style.display = 'none';
        this.setState({show : false}); 
    }
    handleListItem(e) {
        let newCountry = e.target.getAttribute('data-value');
        let newID = e.target.getAttribute('id-value');
        this.setState({country: newCountry});
        this.listHide('country-select-list');
        this.props.updateSelect({
            country: newCountry,
            countryID: newID,
            change: !this.props.change
        })
    }
    handleChangeCountry(e) {
        let newCountry = e.target.value;
        this.setState({country: newCountry});
        let newData = [];
        for (let i = 0; i < this.props.countriesData.length;i++) {
            if (this.props.countriesData[i].country.substr(0,newCountry.length) == newCountry && newCountry !== '') {
                newData.push(this.props.countriesData[i])
            }
        }
        this.setState({ activeData: newData});
        if (newCountry !== '') {
            this.listShow('country-select-list');
        }
        this.props.updateSelect({
            countryID: '',
            city: ''
        })
    }
    render() {
        return (
            <div className="country-select">
                <input id="country" onChange={this.handleChangeCountry} value ={this.state.country} placeholder="Country" />
                <ul id="country-select-list" >
                    {
                        this.state.activeData.map((el) =>
                            <li onClick={this.handleListItem} data-value={el.country} id-value={el.id} key={el.id} >{el.country}</li>
                        )
                    }
                </ul>
                
            </div>
        )
    }
}