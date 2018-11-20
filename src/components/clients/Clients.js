import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import withData from '../db';

class Clients extends Component {
  static collection = 'clients';

  state = {
    totalOwed: 0,
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
    return { totalOwed: Clients.formatBalance(totalOwed) };
  }

  render() {
    const { formatBalance } = Clients;
    const { clients } = this.props.data.ordered;
    const { totalOwed } = this.state;
    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2><i className="fas fa-users"></i> Clients</h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">Total Owed: <span className="text-primary">${totalOwed}</span>
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
              {clients.map(client => (
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
