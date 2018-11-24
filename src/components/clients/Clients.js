import React, { Component } from 'react';
import arraySort from 'array-sort';
import Spinner from '../layout/Spinner';
import withData from '../db';
import ClientsList from './ClientsList';

class Clients extends Component {
  static collection = 'clients';

  state = {
    totalOwed: 0,
    alphabeticOrder: {
      enabled: false,
      data: { clients: null },
    },
  }

  alphabeticToggleHandler = (checked) => {
    this.setState(prevState => ({
      ...prevState,
      alphabeticOrder: {
        ...prevState.alphabeticOrder,
        enabled: checked,
      },
    }));
  }

  static formatBalance(balance) {
    return parseFloat(balance).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  static getDerivedStateFromProps({ data: { ordered: { clients } } }, state) {
    if (clients === undefined) return state;

    const totalOwed = clients
      .reduce((total, { balance }) => total + parseFloat(balance), 0);

    const { alphabeticOrder } = state;

    let alphabeticClients = null;

    if (alphabeticOrder.enabled) {
      alphabeticClients = arraySort(clients.slice(0), ['firstName', 'lastName']);
    }

    return {
      ...state,
      totalOwed: Clients.formatBalance(totalOwed),
      alphabeticOrder: {
        ...state.alphabeticOrder,
        data: { clients: alphabeticClients },
      },
    };
  }

  render() {
    const {
      state: {
        alphabeticOrder,
        alphabeticOrder: {
          data: {
            clients: alphabeticClients,
          },
        },
      },
      props: {
        data: {
          ordered: {
            clients,
          },
        },
      },
    } = this;

    const clientsListProps = {
      formatBalance: Clients.formatBalance,
      clients: alphabeticOrder.enabled ? alphabeticClients : clients,
      totalOwed: this.state.totalOwed,
      alphabeticOrder: this.state.alphabeticOrder,
      alphabeticToggleHandler: this.alphabeticToggleHandler,
    };

    if (clients) {
      return (
        <ClientsList {...clientsListProps} />
      );
    }
    return <Spinner />;
  }
}

export default withData(Clients, Clients.collection);
