import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Spinner from '../layout/Spinner';
import withData from '../db';

class ClientDetails extends Component {
  static collection = 'clients';

  constructor(props) {
    super(props);
    this.submitRef = createRef();
    this.state = {
      balance: {
        update: false,
        amount: '',
      },
    };
  }

  onDeleteClick = (e) => {
    e.preventDefault();
    const { collection } = ClientDetails;
    const { firestore, history } = this.props;
    const { id: doc } = this.client;
    firestore.delete({ collection, doc }).then(() => history.push('/'));
  }

  onBalanceEdit = ({ target: { value: amount } }) => {
    this.setState(({ balance }) => ({ balance: { ...balance, amount } }));
  }

  onBalanceSubmit = (e) => {
    e.preventDefault();
    this.submitRef.current.innerHTML = 'Submitting...  <i class="fa fa-spinner fa-spin"></i>';
    this.submitRef.current.setAttribute('disabled', true);
    const { collection } = ClientDetails;
    const { amount } = this.state.balance;
    const { update } = this.props.firestore;
    const { id: doc, originalBalance } = this.client;
    const newBalance = parseFloat(amount || originalBalance).toFixed(2);
    const clientUpdate = { balance: newBalance };
    update({ collection, doc }, clientUpdate).then(() => {
      this.setState(({ balance }) => ({ balance: { ...balance, update: false, amount: '' } }));
    });
  }

  toggleBalanceView = () => {
    this.setState(({ balance }) => ({ balance: { ...balance, update: !balance.update } }));
  }

  get client() {
    const { data: { clients }, match: { params: { id } } } = this.props;
    const client = clients && clients[id];
    if (client) client.id = id;
    return client;
  }

  static formatBalance(balance) {
    return parseFloat(balance).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  render() {
    const { formatBalance } = ClientDetails;
    const { onBalanceEdit, onBalanceSubmit } = this;

    const {
      client,
      toggleBalanceView,
      state: { balance: { update, amount } },
    } = this;
    let balanceForm = null;
    if (update) {
      balanceForm = (
        <form onSubmit={onBalanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Set New Balance"
              onChange={onBalanceEdit}
              value={amount} />
            <div className="input-group-append">
              <button ref={this.submitRef} type="submit" className="btn btn-outline-dark">Submit</button>
            </div>
          </div>
        </form>
      );
    }
    if (client) {
      return (
        <div>
          <div className="row mt-4 mb-3">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left"></i>
                Back to Dashboard
            </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={this.onDeleteClick}>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h3>Client ID: <span className="text-secondary">{client.id}</span></h3>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="float-right">

                    Balance: <span
                      style={{ whiteSpace: 'nowrap' }}
                      className={classNames({
                        'text-danger': parseFloat(client.balance) > 0,
                        'text-success': parseFloat(client.balance) === 0,
                      })}>{`$ ${formatBalance(client.balance)} `}

                      <small><a href="#!" onClick={toggleBalanceView}>
                        <i className="fas fa-pencil-alt"></i>
                      </a></small>
                    </span>
                    {balanceForm}
                  </h3>
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item"><h4>Contact Email: <span className="text-secondary">{client.email}</span></h4></li>
                <li className="list-group-item"><h4>Contact Phone: <span className="text-secondary">{client.phone}</span></h4></li>
              </ul>
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

export default withData(ClientDetails.collection, ClientDetails);
