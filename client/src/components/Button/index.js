import React from 'react';
import cx from 'classnames';

import styles from './style.pcss';

const Button = ({ className, children, active, ...props }) => {
  const classes = cx(styles.container, className, {
    [styles.active]: active,
  });

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
