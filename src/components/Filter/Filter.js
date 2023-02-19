import React from 'react';
import s from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ onChange, value }) => {
  return (
    <p className={s.Filter}>
      Find contacts by name
      <input
        className={s.FilterInput}
        type="text"
        value={value}
        onChange={onChange}
      ></input>
    </p>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Filter;
