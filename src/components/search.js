import React, { Component } from 'react';
import { SearchOutlined } from '@ant-design/icons';

class search extends Component {
  render() {
    return (
      <div
        className="modal fade custom_search_pop"
        id="exampleModalCenter"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="serch_form">
              <input type="text" placeholder="What are you looking for?" />
              <button type="submit"><SearchOutlined/>&nbsp;Search</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default search;
