import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class Clients extends Component {
  state = {
    totalOwed: 0,
  }

  static getDerivedStateFromProps({ clients }, state) {
    if (clients === undefined) return state;
    const totalOwed = clients
      .reduce((total, { balance }) => total + parseFloat(balance), 0)
      .toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    return { totalOwed };
  }

  render() {
    const { clients } = this.props;
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
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
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

const mapStateToProps = ({ firestore: { ordered: { clients } } }) => ({ clients });

Clients.propTypes = {
  clients: PropTypes.array,
};

export default compose(firestoreConnect(['clients']), connect(mapStateToProps))(Clients);
