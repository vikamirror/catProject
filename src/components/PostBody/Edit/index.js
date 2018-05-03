import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditButton from '../../Buttons/EditButton';
import DeleteButton from '../../Buttons/DeleteButton';

const mapStateToProps = state => ({member: state.member});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));
const Edit = ({member, author, handleEdit}) => {
    if (member.cuid !== author.cuid) {
        return '';
    }
    return (
        <div className="u-text-right line-height-32">
            <EditButton onClickEdit={() => handleEdit()} />
            <DeleteButton />
        </div>
    );
};
Edit.propTypes = {
    member: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);