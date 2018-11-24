import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import arraySort from 'array-sort';
import Spinner from '../layout/Spinner';
import Toggle from '../layout/Toggle';
import withData from '../db';

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
    const { formatBalance } = Clients;

    const {
      props: { data: { ordered: { clients } } },
      state: {
        totalOwed,
        alphabeticOrder,
      },
      alphabeticToggleHandler,
    } = this;

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-12 text-center">
              <h2><i className="fas fa-users"></i> Clients</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 pt-2">
              <Toggle checked={alphabeticOrder.enabled} handler={alphabeticToggleHandler} />
            </div>
            <div className="col-md-6 pt-2">
              <h5 className="text-right">Total Owed: <span className="text-primary">${totalOwed}</span>
              </h5>
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {(alphabeticOrder.enabled ? alphabeticOrder.data.clients : clients).map(client => (
                <tr key={client.id}>
                  <td>{client.firstName} {client.lastName}</td>
                  <td>{client.email}</td>
                  <td>${formatBalance(client.balance)}</td>
                  <td><Link to={`/client/${client.id}`} className="btn btn-secondary btn-sm">
                    <i className="fas fa-arrow-circle-right"></i>Details
                  </Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div >
      );
    }
    return <Spinner />;
  }
}

export default withData(Clients, Clients.collection);
