import React, { PropTypes } from 'react';

export default class ProgressBar {
  static propTypes = {
    current: PropTypes.number.isRequired,
    maximum: PropTypes.number.isRequired
  }

  render() {
    const { current, maximum } = this.props;
    const progress = (maximum === 0 ? 0 : Math.round((current / maximum) * 100));
    const style = {
      width: `${progress}%`
    };

    return (
      <div className="progress">
        <div className="progress-bar" style={style} />
      </div>
    );
  }
}
