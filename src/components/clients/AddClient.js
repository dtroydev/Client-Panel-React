import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import { withFirestore } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

class AddClient extends Component {
  static collection = 'clients';

  constructor(props) {
    super(props);
    this.submitRef = createRef();
    this.state = {
      client: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: '',
      },
    };
  }

  onChange = ({ target: { name, value } }) => {
    this.setState(({ client }) => ({ client: { ...client, [name]: value } }));
  }

  onSubmit = (e) => {
    // TODO  Add Input Validation / Sanitisation

    e.preventDefault();
    this.submitRef.current.innerHTML = 'Submitting...  <i class="fa fa-spinner fa-spin"></i>';
    this.submitRef.current.setAttribute('disabled', true);
    const { push: redirect } = this.props.history;
    const { client } = this.state;
    const { firestore } = this.props;
    client.balance = client.balance || '0';
    firestore.add({ collection: AddClient.collection }, client).then(() => redirect('/'));
  }

  render() {
    const {
      client: {
        firstName, lastName, phone, balance, email,
      },
    } = this.state;

    const { balanceOnAdd } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left"></i>
              Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            AddClient
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
                  disabled={!balanceOnAdd.value}
                />
              </div>
              <div className="form-group">
                <button ref={this.submitRef} className="btn btn-primary btn-block" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div >
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  settings: state.firebase.profile.settings,
});

export default compose(withFirestore, connect(mapStateToProps))(AddClient);
