import React, { Component } from 'react';
import arraySort from 'array-sort';
import escapeRe from 'escape-string-regexp';
import commaNumber from 'comma-number';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Spinner from '../layout/Spinner';
import withData from '../db';
import ClientsList from './ClientsList';

class Clients extends Component {
  static collection = 'clients';

  state = {
    totalOwed: 0,
    displayClients: null,
    searchFilter: null,
    sorting: {
      alphabeticNames: this.props.settings.alphabeticNames.value,
    },
  }

  alphabeticToggleHandler = (checked) => {
    this.setState(({ sorting }) => ({ sorting: { ...sorting, alphabeticNames: checked } }));
  }

  filterHandler = ({ target: { value } }) => {
    this.setState({ searchFilter: value });
  }

  static formatBalance(balance) {
    return commaNumber(parseFloat(balance).toFixed(2));
  }

  static getDerivedStateFromProps({
    data: { clients: unOrderedClients, ordered: { clients: orderedClients } },
  }, state) {
    // data not ready, keep waiting
    if (orderedClients === undefined) return state;

    // Couple of data set issues that required resolution:
    // 1) ordered client list length is sometimes temporarily set to 1 after client edit
    //    submission. This seems to happen more often when developer tools are closed
    //    (ie. normal use) and it causes the recently updated client to appear on its own
    //    briefly before the full list comes in. To fix this this flash of a single client
    //    issue, we wait until ordered and unordered list lengths are equal.
    // 2) unordered data list marks a newly deleted client as a null rather than removing
    //    the entire key. To fix this, keys set to null must not be counted below

    const unOrderedClientsNoNullLength = Object.keys(unOrderedClients)
      .reduce((a, e) => (a + (unOrderedClients[e] !== null ? 1 : 0)), 0);

    if (orderedClients.length !== unOrderedClientsNoNullLength) return state;

    const { sorting: { alphabeticNames }, searchFilter } = state;

    let displayClients = null;
    let filteredClients = null;

    if (searchFilter) {
      const searchRe = RegExp(`${escapeRe(searchFilter).trim()}`, 'i');
      filteredClients = orderedClients.filter(({ firstName, lastName, email }) => (
        firstName.match(searchRe) || lastName.match(searchRe) || email.match(searchRe)
      ));
    }

    // arraySort mutates, we do not want to mutate clients in props
    // (which are mapped from redux in withData HOC)
    if (alphabeticNames) {
      displayClients = arraySort(filteredClients || orderedClients.slice(0), ['firstName', 'lastName']);
    } else {
      displayClients = filteredClients || orderedClients;
    }

    const totalOwed = Clients.formatBalance(
      displayClients.reduce((total, { balance }) => total + parseFloat(balance), 0),
    );

    return {
      ...state,
      totalOwed,
      displayClients,
    };
  }

  render() {
    const { displayClients } = this.state;

    const clientsListProps = {
      formatBalance: Clients.formatBalance,
      clients: displayClients,
      totalOwed: this.state.totalOwed,
      alphabeticOrder: this.state.sorting.alphabeticNames,
      alphabeticToggleHandler: this.alphabeticToggleHandler,
      filterHandler: this.filterHandler,
    };

    if (displayClients) {
      return (
        <ClientsList {...clientsListProps} />
      );
    }
    return <Spinner />;
  }
}

const mapStateToProps = state => ({
  settings: state.firebase.profile.settings,
});

export default compose(
  withData.bind(this, Clients.collection),
  connect(mapStateToProps),
)(Clients);
