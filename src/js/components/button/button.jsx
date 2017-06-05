/**
 * Created by Denis on 02.06.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  static get propTypes() {
    return {
      btnProps: PropTypes.object.isRequired
    };
  }
  render() {
    const styles = require('./button.scss');
    return (
      <input
        type="button"
        className={styles.button}
        value={this.props.btnProps.label}
      />
    );
  }
}
