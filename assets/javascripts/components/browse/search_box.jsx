import React from 'react';
import Component from 'component';
import debounce from 'lib/debounce';

export default class SearchBox extends Component {
  _getInitialState() {
    return {
      searchTerm: null
    };
  }

  componentWillMount() {
    this.sendUpdateLater = debounce(this.sendUpdate, 150);
  }

  render() {
    return (
      <input
        type="search" ref="search"
        className="search-box"
        placeholder="Search by Artist, Album or Track"
        value={this.state.searchTerm}
        onChange={this.doSearch} />
    );
  }

  doSearch() {
    let searchTerm = this.refs.search.getDOMNode().value;
    this.setState({ searchTerm });
    this.sendUpdateLater();
  }

  sendUpdate() {
    this.props.onUpdate(this.state.searchTerm);
  }
}

SearchBox.propTypes = {
  onUpdate: React.PropTypes.func.isRequired
};
