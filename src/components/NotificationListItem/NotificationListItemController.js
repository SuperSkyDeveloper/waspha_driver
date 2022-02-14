import React from 'react';
import PropTypes, {func} from 'prop-types';
import NotificationListItemView from './NotificationListItemView';
import {connect} from 'react-redux';

class NotificationListItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
  };
  static defaultProps = {};

  render() {
    return <NotificationListItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(NotificationListItemController);
