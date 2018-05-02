import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import { updateDistricts } from '../../../redux/citySelect';

const cities = [
    '台北市','台中市','台南市','高雄市','基隆市',
    '新竹市','嘉義市','新北市','桃園市','新竹縣',
    '宜蘭縣','苗栗縣','彰化縣','南投縣','雲林縣',
    '嘉義縣','屏東縣','澎湖縣','花蓮縣','台東縣',
    '金門縣','連江縣'
];

const CitySelect = ({city, onChangeCity}) => (
    <div className="country-select">
        <select className="select" onChange={(evt) => onChangeCity(evt.target.value)} value={city}>
            {
                cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                ))
            }
        </select>
        <div className="icon-btn"><i className="icon icon-down-open" /></div>
    </div>
)

CitySelect.propTypes = {
    city: PropTypes.string.isRequired,
    onChangeCity: PropTypes.func.isRequired
};
export default CitySelect;