import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import { withFirestore } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class AddClient extends Component {
  constructor(props) {
    super(props);
    this.submitRef = createRef();
    this.db = this.props.firestore;
    this.redirect = this.props.history.push;
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
    this.setState((prevState) => {
      const { client } = prevState;
      client[name] = value;
      return { client };
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.submitRef.current.innerHTML = 'Submitting...  <i class="fa fa-spinner fa-spin"></i>';
    const { client } = this.state;
    client.balance = client.balance || '0';
    this.db.add({ collection: 'clients' }, client).then(() => this.redirect('/'));
  }

  render() {
    const {
      client: {
        firstName, lastName, phone, balance, email,
      },
    } = this.state;

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
};

export default withFirestore(AddClient);
