/**
 * Created by Denis on 09.06.2017.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MainNav extends Component {
  render() {
    return (
      <ul>
        <li><Link to="/airports">Airports</Link></li>
        <li><Link to="/arrival">Arrival</Link></li>
        <li><Link to="/departure">Departure</Link></li>
      </ul>
    );
  }
}
