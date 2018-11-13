import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class Clients extends Component {
  render() {
    if (this.props.clients) {
      return (
        <div>
          <div className="row">
            <h2 className="col-md-12 text-center"><i className="fas fa-users"></i> Clients</h2>
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
              {this.props.clients.map(client => (
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
