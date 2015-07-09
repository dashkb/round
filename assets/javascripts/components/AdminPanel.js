import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'redux/react';
import { adminActions } from '../actions';

@connect(state => ({
  isAdmin: state.Admin.isAdmin,
  status:  state.Status.playing
}))
export default class AdminPanel {
  static propTypes = {
    isAdmin: PropTypes.bool.isRequired
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render() {
    if (!this.props.isAdmin) {
      return (
        <section id="admin">
          <div className="btn-group">
            <button className="btn btn-default login">
              <i onClick={this.login.bind(this)} className="fa fa-2x fa-gear"></i>
            </button>
          </div>
        </section>
      );
    }

    const actions = bindActionCreators(adminActions, this.props.dispatch);

    let toggleButton;
    if (this.props.playing) {
      toggleButton = <button className="btn btn-default pause" onClick={actions.pause}><i className="fa fa-2x fa-pause"/></button>
    } else {
      toggleButton = <button className="btn btn-default play" onClick={actions.play}><i className="fa fa-2x fa-play"/></button>
    }

    return (
      <section id="admin">
        <div className="btn-group">
          {toggleButton}
          <button className="btn btn-default skip" onClick={actions.skip}><i className="fa fa-2x fa-forward"/></button>
          <button className="btn btn-default dash" onClick={this.clickTo('admin')}><i className="fa fa-2x fa-dashboard"/></button>
        </div>
      </section>
    );
  }

  login() {
    let password = prompt('Enter your password!');
    this.props.dispatch(adminActions.login(password));
  }

  clickTo(page) {
    return () => this.context.router.transitionTo(page);
  }
}
