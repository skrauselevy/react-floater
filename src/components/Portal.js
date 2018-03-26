import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { canUseDOM, isReact16 } from '../utils';

export default class Portal extends React.Component {
  constructor(props) {
    console.log('constructor');
    super(props);

    if (!canUseDOM) return;

    this.node = document.createElement('div');
    this.node.style.zIndex = 1;
    if (props.id) {
      this.node.id = props.id;
    }

    document.body.appendChild(this.node);
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array,
    ]),
    hasChildren: PropTypes.bool,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    placement: PropTypes.string,
    setRef: PropTypes.func.isRequired,
    status: PropTypes.string,
    target: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
  };

  componentDidMount() {
    console.log('componentDidMount');
    if (!canUseDOM) return;

    if (!isReact16) {
      this.renderPortal();
    }
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
    if (!canUseDOM) return;

    const { placement, status } = this.props;

    if (
      !isReact16
      && (prevProps.status !== status || prevProps.placement !== placement)
    ) {
      this.renderPortal();
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    if (!canUseDOM || !this.node) return;

    if (!isReact16) {
      ReactDOM.unmountComponentAtNode(this.node);
    }

    document.body.removeChild(this.node);
  }

  renderPortal() {
    if (!canUseDOM) return null;

    const { children, setRef } = this.props;

    /* istanbul ignore else */
    if (isReact16) {
      return ReactDOM.createPortal(
        children,
        this.node,
      );
    }

    const portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      children.length > 1 ? <div>{children}</div> : children[0],
      this.node,
    );

    setRef(portal);

    return null;
  }

  renderReact16() {
    const { hasChildren, placement, target } = this.props;

    if (!hasChildren) {
      if ((target || placement === 'center')) {
        return this.renderPortal();
      }

      return null;
    }

    return this.renderPortal();
  }

  render() {
    if (!isReact16) {
      return null;
    }

    return this.renderReact16();
  }
}
