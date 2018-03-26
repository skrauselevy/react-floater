import React from 'react';
import PropTypes from 'prop-types';
import is from 'is-lite';

import CloseBtn from './CloseBtn';

const FloaterContainer = ({
  content,
  footer,
  handleClick,
  open,
  positionWrapper,
  showCloseButton,
  title,
  styles,
}) => {
  const output = {
    content: React.isValidElement(content)
      ? content
      : <div className="__tooltip__content" style={styles.content}>{content}</div>
  };

  if (title) {
    output.title = React.isValidElement(title)
      ? title
      : <div className="__tooltip__title" style={styles.title}>{title}</div>;
  }

  if (footer) {
    output.footer = React.isValidElement(footer)
      ? footer
      : <div className="__tooltip__footer" style={styles.footer}>{footer}</div>;
  }

  if (
    (showCloseButton || positionWrapper)
    && !is.boolean(open)
  ) {
    output.close = (
      <CloseBtn
        styles={styles.close}
        handleClick={handleClick}
      />
    );
  }
  console.log('Return container');
  return (
    <div className="__tooltip__container" style={styles.container}>
      {output.close}
      {output.title}
      {output.content}
      {output.footer}
    </div>
  );
};

FloaterContainer.propTypes = {
  content: PropTypes.node.isRequired,
  footer: PropTypes.node,
  handleClick: PropTypes.func.isRequired,
  open: PropTypes.bool,
  positionWrapper: PropTypes.bool.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
  styles: PropTypes.object.isRequired,
  title: PropTypes.node,
};

export default FloaterContainer;
