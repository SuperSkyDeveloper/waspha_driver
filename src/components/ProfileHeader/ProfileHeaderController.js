import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ProfileHeaderView from './ProfileHeaderView';
import {updateAvatarRequest} from '../../actions/UserActions';
import {helper, constains} from '../../s3Helper';
class ProfileHeaderController extends React.Component {
  constructor() {
    super();
    this.state = {
      isImgUploadVisible: false,
      loading: false,
    };
  }
  static propTypes = {
    user: PropTypes.object.isRequired,
  };
  static defaultProps = {};
  setValue = (key) => {
    this.setState(key);
  };

  closeImageModal = () => {
    this.setState({isImgUploadVisible: false});
  };

  updateProfileImage = async (image) => {
    let imagePayload = {
      uri: image.path,
      fileType: image.mime,
    };
    this.setState({loading: true});

    let imageLink = await helper.uploadImageOnS3(
      imagePayload,
      constains.folderList.DRIVER,
    );

    const {updateAvatarRequest} = this.props;
    const payload = {
      avatar: imageLink,
    };
    updateAvatarRequest(payload, (response) => {
      if (response) {
        this.setState({isImgUploadVisible: false});
      }
      this.setState({loading: false});
    });
  };

  render() {
    const {isImgUploadVisible, loading} = this.state;
    return (
      <ProfileHeaderView
        isImgUploadVisible={isImgUploadVisible}
        loading={loading}
        setValue={this.setValue}
        closeImageModal={this.closeImageModal}
        updateProfileImage={this.updateProfileImage}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {
  updateAvatarRequest,
};

export default connect(mapStateToProps, actions)(ProfileHeaderController);
