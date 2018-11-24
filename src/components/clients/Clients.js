import React, { Component } from 'react';
import arraySort from 'array-sort';
import escapeRe from 'escape-string-regexp';
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
      alphabeticNames: false,
    },
  }

  alphabeticToggleHandler = (checked) => {
    this.setState(prevState => ({
      ...prevState,
      sorting: {
        ...prevState.sorting,
        alphabeticNames: checked,
      },
    }));
  }

  filterHandler = ({ target: { value } }) => {
    this.setState({ searchFilter: value });
  }

  static formatBalance(balance) {
    return parseFloat(balance).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  static getDerivedStateFromProps({ data: { ordered: { clients } } }, state) {
    if (clients === undefined) return state;

    const { sorting: { alphabeticNames }, searchFilter } = state;

    let displayClients = null;
    let filteredClients = null;

    if (searchFilter) {
      const searchRe = RegExp(`${escapeRe(searchFilter).trim()}`, 'i');
      filteredClients = clients.filter(({ firstName, lastName, email }) => (
        firstName.match(searchRe) || lastName.match(searchRe) || email.match(searchRe)
      ));
    }

    // arraySort mutates, we do not want to mutate clients in props
    // (which are mapped from redux in withData HOC)
    if (alphabeticNames) {
      displayClients = arraySort(filteredClients || clients.slice(0), ['firstName', 'lastName']);
    } else {
      displayClients = filteredClients || clients;
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

export default withData(Clients, Clients.collection);
