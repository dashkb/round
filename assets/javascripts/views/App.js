import React from 'react';
import {Link} from 'react-router';
import AdminPanel from '../components/AdminPanel';
import NowPlaying from '../components/NowPlaying';

export default class App {
  render() {
    return (
      <div>
        <section id="content">
          {this.props.children}
        </section>

        <AdminPanel />
        <NowPlaying id="status" />
      </div>
    );
  }
}
