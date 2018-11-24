import React from 'react';
import { Link } from 'react-router-dom';
import Toggle from '../layout/Toggle';

export default function ClientsList(props) {
  const {
    alphabeticOrder,
    alphabeticToggleHandler,
    totalOwed,
    clients,
    formatBalance,
  } = props;

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
