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
    filterHandler,
  } = props;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h2><i className="fas fa-users"></i> Clients</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2 align-self-center text-center text-md-left">
          <Toggle checked={alphabeticOrder} handler={alphabeticToggleHandler} />
        </div>
        <div className="col-md-7 align-self-center mb-3 mb-md-0">
          <input className="form-control" type="text" placeholder="Search text.." onChange={filterHandler} />
        </div>
        <div className="col-md-3 align-self-center text-center text-md-right">
          <h5>Total Owed
          <p className="text-primary">${totalOwed}</p>
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
              <td className="text-right">${formatBalance(client.balance)}</td>
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
