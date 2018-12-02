import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditButton from '../../Buttons/EditButton';
import DeleteButton from '../../Buttons/DeleteButton';
import { backUpAndEdit } from '../../../redux/post';

const mapStateToProps = state => ({
    member: state.member,
    post: state.post,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    backUpAndEdit: backUpAndEdit,
}, dispatch));
const Edit = ({member, post, isEdit, backUpAndEdit, scrollToTop, handleDelete}) => {
    if (!member.cuid || 
        member.cuid !== post.author.cuid) {
        return '';
    }
    if (isEdit) {
        return '';
    }
    const handleEdit = () => {
        backUpAndEdit();
        setTimeout(() => {
            scrollToTop();
        }, 300);
    };
    return (
        <div className="u-text-right line-height-32">
            <EditButton onClickEdit={() => handleEdit()} />
            <DeleteButton onClickDelete={() => handleDelete()} />
            <hr className="hr-line-style1" />
        </div>
    );
};
Edit.propTypes = {
    member: PropTypes.shape({
        cuid: PropTypes.string,
    }),
    post: PropTypes.shape({
        author: PropTypes.shape({
            cuid: PropTypes.string
        }),
        cuid: PropTypes.string
    }),
    isEdit: PropTypes.bool.isRequired,
    backUpAndEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);