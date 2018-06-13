/**
 *
 * Test
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import PaginatedList from 'components/PaginatedList';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import reducer from './reducer';
import saga from './saga';
import { loadData } from './actions';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    path: "",
    startIndex: 0,
    pageSize: 10,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  view() {
    this.setState({
      startIndex: 0
    }, this.getData.bind(this, true));
  }

  next() {
    const { startIndex, pageSize } = this.state;
    if (startIndex + pageSize < this.props.data.lineCount)
      this.setState({
        startIndex: startIndex + pageSize
      }, this.getData);
  }

  previous() {
    const { startIndex, pageSize } = this.state;
    if (startIndex > 0)
      this.setState({
        startIndex: startIndex - pageSize
      }, this.getData);
  }

  first() {
    this.setState({
      startIndex: 0,
    }, this.getData);
  }

  last() {
    const { startIndex, pageSize } = this.state;
    this.setState({
      startIndex: this.props.data.lineCount - (this.props.data.lineCount % pageSize !== 0 ? this.props.data.lineCount % pageSize : pageSize),
    }, this.getData);
  }

  getData(isFirstCall=false) {
    this.props.dispatch(loadData(this.state.path, this.state.startIndex, this.state.pageSize, isFirstCall));
  }

  render() {

    return (
      <div>
        <Helmet>
          <title>Property Guru Test</title>
          <meta name="description" content="Property Guru Test" />
        </Helmet>

        <div style={{ textAlign: 'center' }}>
          <div className="container">
            <h1>
              <FormattedMessage {...messages.header} />
            </h1>
            <h2>Log file viewer</h2>
            <div className="flex">
              <input
                onChange={(e) => {this.setState({ path: e.target.value })}}
                type="text"
                value={this.state.path}
                className="flex-10 padding-10"
                placeholder="Enter the path to a log file"/>
              <div className="flex-1"></div>
              <input
                type="button"
                value="View"
                className="flex-2 padding-10"
                onClick={this.view.bind(this)}/>
            </div>
            <div>
              {
                this.props.data.error?
                  <div className="border margin-t-10 padding-10">Invalid file path <span className="error">{this.state.path}</span></div>
                  :
                  <PaginatedList
                    data={this.props.data}
                    startIndex={this.state.startIndex}
                    next={this.next.bind(this)}
                    previous={this.previous.bind(this)}
                    first={this.first.bind(this)}
                    last={this.last.bind(this)}
                    />
              }

            </div>
          </div>
        </div>

      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { data: state.get("homePage").toJS() };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
