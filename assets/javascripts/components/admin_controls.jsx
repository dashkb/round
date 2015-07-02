import React from 'react';
import Component from 'component';
import Mixins from 'mixins';
import * as AdminActions from 'actions/admin';
import AdminStore from 'stores/admin';

export default class AdminControls extends Component {
  _getInitialState() {
    return {
      isAdmin: false
    };
  }

  tryToLogin() {
    let password = prompt('I need a password.');
    AdminActions.login(password);
  }

  render() {
    return (
      <section id="admin">{this.state.isAdmin ? this.renderController() : this.renderLogin()}</section>
    );
  }

  renderController() {
    let toggleButton;
    if (this.state.status === 'playing') {
      toggleButton = <button className="btn btn-default pause"><i onClick={AdminActions.pause} className="fa fa-2x fa-pause"/></button>
    } else {
      toggleButton = <button className="btn btn-default play"><i onClick={AdminActions.play} className="fa fa-2x fa-play"/></button>
    }

    return (
      <div className="btn-group">
        {toggleButton}
        <button className="btn btn-default skip"><i onClick={AdminActions.skip} className="fa fa-2x fa-forward"/></button>
      </div>
    );
  }

  renderLogin() {
    return (
      <div className="btn-group">
        <button className="btn btn-default login">
          <i onClick={this.tryToLogin} className="fa fa-2x fa-gear"></i>
        </button>
      </div>
    );
  }
}

Mixins(AdminControls, [
  AdminStore.listen('isAdmin', AdminStore.isAdmin)
]);
