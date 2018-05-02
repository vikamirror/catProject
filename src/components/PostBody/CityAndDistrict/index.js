import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CitySelect from '../../FormInputs/CitySelect';
import DistrictSelect from '../../FormInputs/DistrictSelect';
// import { inputPost } from '../../../redux/post';
// import OnBlurListener from '../../OnBlurListener';
import getDistricts from '../../../fetch/cityCodes';

const mapStateToProps = state => ({
    citySelect: state.citySelect,
});
const mapDispatchToProps = dispatch => (bindActionCreators({ }, dispatch));
class CityAndDistrict extends Component {
    constructor () {
        super();
        this.state = {
            city: '台北市',
            districts: ['松山區','大安區','大同區','中山區','內湖區','南港區','士林區','北投區','信義區','中正區','萬華區','文山區','松山區']
        };
    }
    componentDidMount () {
        if (this.props.city !== this.state.city) {
            this.updateDistrictSelectOptions(this.props.city);
        }
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.city !== this.state.city) {
            this.updateDistrictSelectOptions(nextProps.city);
        }
    }
    updateDistrictSelectOptions (city) {
        const districts = getDistricts(city).districts;
        this.setState({
            city: city,
            districts: districts
        });
    }
    onChangeCity (city) {
        if (city !== this.props.city) {
            this.updateDistrictSelectOptions(city);
            this.props.handleState('city', city);
            setTimeout(() => {
                this.onChangeDistrict(this.state.districts[0]);
            }, 300);
        }
    }
    onChangeDistrict (district) {
        if (district !== this.props.district) {
            this.props.handleState('district', district);
        }
    }
    render () {
        const {isEdit, city, district} = this.props;
        if (isEdit) {
            return (
                <div>
                    <div className="row">
                        <label className="col-xs-4" htmlFor="">縣市</label>
                        <div className="col-xs-7 group-info">
                            <CitySelect
                                city={city}
                                onChangeCity={(city) => this.onChangeCity(city)}
                            />
                        </div>
                    </div>
                    <hr className="hr-line-style1" />
                    <div className="row">
                        <label className="col-xs-4" htmlFor="">行政區</label>
                        <div className="col-xs-7 group-info">
                            <DistrictSelect 
                                district={district}
                                districts={this.state.districts}
                                onChangeDistrict={(district) => this.onChangeDistrict(district)}
                            />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="row">
                        <label className="col-xs-4" htmlFor="">縣市</label>
                        <div className="col-xs-7 group-info text">{city}</div>
                    </div>
                    <hr className="hr-line-style1" />
                    <div className="row">
                        <label className="col-xs-4" htmlFor="">行政區</label>
                        <div className="col-xs-7 group-info text">{district}</div>
                    </div>
                </div>
            );
        }
    }
};

CityAndDistrict.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    city: PropTypes.string.isRequired,
    district: PropTypes.string.isRequired,
    handleState: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(CityAndDistrict);