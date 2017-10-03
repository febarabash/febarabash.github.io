import React from 'react';

export default class CitySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: this.props.data.city,
            activeData: this.props.citiesData,
            show: false
        }
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleListItem = this.handleListItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.change !== this.state.change) {
            this.setState({
                city: ''
            })
        }
        this.setState({  
            countryID: nextProps.countryID,
            change: nextProps.change,           
        });
        if (nextProps.city !== '') {
            this.listHide('city-select-list');  
        } else if (nextProps.countryID !== '' && this.state.show == true) {
            this.listShow('city-select-list');
        }
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
        let newCity = e.target.getAttribute('data-value');
        this.setState({city: newCity});
        this.listHide('city-select-list');
        this.props.updateSelect({
            city: newCity
        })
    }
    handleChangeCity(e) {
        let newCity = e.target.value;
        this.setState({city: newCity});
        let newData = [];
        for (let i = 0; i < this.props.citiesData.length;i++) {
            if (this.props.citiesData[i].city.substr(0,newCity.length) == newCity && this.props.citiesData[i].countryID == this.state.countryID  && newCity !== '') {
                newData.push(this.props.citiesData[i])
            }
        }
        this.setState({ activeData: newData});
        this.props.updateSelect({
            city: ''
        })
        if (newCity !== '') {
            this.listShow('city-select-list');
        } 
    }
    render() {
        return (
            <div className="city-select">
                <input id="city" onChange={this.handleChangeCity} value ={this.state.city} placeholder="City" />
                <ul id="city-select-list" >
                    {
                        this.state.activeData.map((el) =>
                            <li onClick={this.handleListItem} data-value={el.city} key={el.id} >{el.city}</li>
                        )
                    }
                </ul>
                
            </div>
        )
    }
}