import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import withData from '../db';
import Spinner from '../layout/Spinner';

class EditClient extends Component {
  static collection = 'clients';

  constructor(props) {
    super(props);
    this.submitRef = createRef();
    this.state = {
      client: null,
    };
  }

  static getDerivedStateFromProps({ match: { params: { id } }, data: { clients } }, state) {
    if (!state.client) { // do not allow inbound updates after the initial async update
      const client = clients && clients[id]; // check for async inbound client data data
      if (client) return { ...state, client }; // add client to local state once the data arrives
    }
    return state;
  }

  onChange = ({ target: { name, value } }) => {
    this.setState(({ client }) => ({ client: { ...client, [name]: value } }));
  }

  onSubmit = (e) => {
    // TODO  Add Input Validation / Sanitisation

    e.preventDefault();

    this.submitRef.current.innerHTML = 'Updating...  <i class="fa fa-spinner fa-spin"></i>';
    this.submitRef.current.setAttribute('disabled', true);

    const { collection } = EditClient;
    const { client } = this.state;
    const {
      firestore,
      history,
      match: { params: { id: doc } },
    } = this.props;
    client.balance = client.balance || '0';
    firestore.update({ collection, doc }, client).then(() => history.push('/'));
  }

  render() {
    const { client } = this.state;
    if (client) {
      const {
        firstName, lastName, phone, balance, email,
      } = client;

      const { balanceOnEdit } = this.props.settings;

      return (
        <div>
          <div className="row">
            <div className="col-md-6 mt-4 mb-3">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left"></i>
                Back to Dashboard
            </Link>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              Edit Client
          </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    id="firstName"
                    minLength="2"
                    required
                    onChange={this.onChange}
                    value={firstName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    id="lastName"
                    minLength="2"
                    required
                    onChange={this.onChange}
                    value={lastName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    onChange={this.onChange}
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    minLength="8"
                    onChange={this.onChange}
                    value={phone}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    id="balance"
                    onChange={this.onChange}
                    value={balance}
                    disabled={!balanceOnEdit.value}
                  />
                </div>
                <div className="form-group">
                  <button ref={this.submitRef} className="btn btn-primary btn-block" type="submit">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div >
      );
    }
    return (
      <Spinner />
    );
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  settings: state.firebase.profile.settings,
});

export default compose(
  withData.bind(this, EditClient.collection),
  connect(mapStateToProps),
)(EditClient);
