import React from 'react';
import Component from 'component';
import GenreStore from 'stores/genres';

export default class GenreList extends Component {
  _getInitialState() {
    return {
      genres: GenreStore.getAll()
    };
  }

  render() {
    return (
      <ul className="genres">
      {this.state.genres.map((genre) => {
        return (
          <li key={genre.id} onClick={this.clickHandler(genre)}>{genre.name}</li>
        );
      })}
      </ul>
    );
  }

  clickHandler(genre) {
    return this.props.onSelect.bind(null, genre.id);
  }
}

GenreList.propTypes = {
  onSelect: React.PropTypes.func.isRequired
};
