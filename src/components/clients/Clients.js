import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Clients extends Component {
  render() {
    const clients = [
      {
        id: 1,
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob@example.org',
        phone: '0400 000 111',
        balance: '30',
      },
      {
        id: 2,
        firstName: 'Karen',
        lastName: 'Brown',
        email: 'karen@example.org',
        phone: '0400 111 000',
        balance: '10',
      },
      {
        id: 3,
        firstName: 'Tom',
        lastName: 'Winston',
        email: 'tom@example.org',
        phone: '0411 111 222',
        balance: '50.25',
      },
    ];

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2><i className="fas fa-users"></i>Clients</h2>
            </div>
            <div className="col-md-6">
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
                  <td>{client.lastName}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td><Link to={`/client/${client.id}`} className="btn btn-secondary btn-sm">
                    <i className="fas fa-arrow-circle-right"></i>Details
                  </Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return <h1>Loading...</h1>;
  }
}
