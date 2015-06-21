import React from 'react';
import { debounce } from '../utils';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };
  }

  render() {
    return (
      <input
        type="search" ref="search"
        className="search-box {this.props.className}"
        placeholder={this.props.placeholder}
        onKeyUp={this.updateSearch.bind(this)} />
    );
  }

  updateSearch() {
    let now = Date.now();
    if (!this.updateTimer) {
      this.updateTimer = setTimeout(this.doUpdate.bind(this), 100);
    }
  }

  doUpdate() {
    let searchTerm = this.refs.search.getDOMNode().value;
    this.props.onChange(searchTerm);
    delete this.updateTimer;
  }
}
SearchBox.propTypes = {
  className:   React.PropTypes.string,
  onChange:    React.PropTypes.func,
  placeholder: React.PropTypes.string
};

export default SearchBox;
