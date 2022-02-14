import React from 'react';
import PropTypes from 'prop-types';
import FAQSView from './FAQSView';
import {connect} from 'react-redux';
import {faqsRequest} from '../../actions/GeneralActions';

class FAQSController extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: null,
      isLoading: true,
    };
  }
  static propTypes = {faqs: []};
  static defaultProps = {};

  handleIndex = (index) => {
    const pressForClose = index === this.state.activeIndex;
    if (pressForClose) {
      this.setState({
        activeIndex: null,
      });
    } else {
      this.setState({
        activeIndex: index,
      });
    }
  };

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    const {appLanguage} = this.props;
    // initial request
    this.props.faqsRequest({language: appLanguage}, () => {
      this.setState({
        isLoading: false,
      });
    });
  };

  render() {
    const {activeIndex, isLoading} = this.state;
    return (
      <FAQSView
        isLoading={isLoading}
        handleIndex={this.handleIndex}
        activeIndex={activeIndex}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({general}) => ({
  faqs: general.faqs,
  appLanguage: general.appLanguage,
});

const actions = {faqsRequest};

export default connect(mapStateToProps, actions)(FAQSController);
