import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import { setDistrict } from '../../../redux/citySelect';

const DistrictSelect = ({district, districts, onChangeDistrict}) => {
    return (
    <div className="district-select select-wrapper">
        <select className="select font-size-16" onChange={(evt) => onChangeDistrict(evt.target.value)} value={district}>
            {
                districts.map((district,index) => (
                    <option key={index} value={district}>{district}</option>
                ))
            }
        </select>
    </div>);
};
DistrictSelect.propTypes = {
    district: PropTypes.string.isRequired,
    districts: PropTypes.array.isRequired,
    onChangeDistrict: PropTypes.func.isRequired
};

export default DistrictSelect;