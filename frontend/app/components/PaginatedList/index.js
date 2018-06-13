/**
*
* PaginatedList
*
*/

import React from 'react';
import './scss/style.scss';
import PropTypes from 'prop-types';

class PaginatedList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  renderNoRecords() {
    return (
      <div className="border list-wrapper padding-10 error">No data</div>
    );
  }

  renderData() {
    return (
      <div>
        <div className="border list-wrapper">
          {
            this.props.data.list.map((item, index) => {
              return <div className="list-row">
                        <div className="row-index">{this.props.startIndex + index + 1}</div>
                        <div className="row-item">{item}</div>
                     </div>;
            })
          }
        </div>
        <div className="list-row border rounded-coner ">
          <div onClick={this.props.first} className="pagination-button">{`|<`}</div>
          <div onClick={this.props.previous} className="pagination-button">{`<`}</div>
          <div onClick={this.props.next} className="pagination-button">{`>`}</div>
          <div onClick={this.props.last} className="pagination-button">{`>|`}</div>
        </div>
      </div>
    );
  }

  render() {
    return this.props.data.list.length > 0 ? this.renderData() : this.renderNoRecords();
  }
}

PaginatedList.propTypes = {
  data: PropTypes.object,
  first: PropTypes.func,
  previous: PropTypes.func,
  next: PropTypes.func,
  last: PropTypes.func,
};

export default PaginatedList;
