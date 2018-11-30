import { withFirestore } from 'react-redux-firebase';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

const wrapWithListener = collection => Wrapped => class withListener extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.firestore.setListener({ collection });
  }

  componentWillUnmount() {
    this.props.firestore.unsetListener({ collection });
  }

  render() {
    return <Wrapped {...this.props} />;
  }
};

const mapStateToProps = collection => ({ firestore }) => ({
  data: {
    [collection]: firestore.data[collection],
    ordered: { [collection]: firestore.ordered[collection] },
  },
});

export default (collection, Wrapped) => compose(
  withFirestore,
  connect(mapStateToProps(collection)),
  wrapWithListener(collection),
)(Wrapped);
