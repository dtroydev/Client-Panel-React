import React, { Component } from 'react';
import { withFirebase } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

class Login extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.submitRef = React.createRef();
    this.formRef = React.createRef();
    this.state = {
      login: {
        email: '',
        password: '',
      },
      alert: {
        show: false,
        text: '',
        type: '',
      },
      submit: {
        text: 'Login',
      },
    };
  }

  onChange = ({ target: { name, value } }) => {
    this.setState(prevState => ({ login: { ...prevState.login, [name]: value } }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { firebase } = this.props;
    const { login: { email, password } } = this.state;

    this.setState(prevState => ({
      ...prevState,
      showAlert: false,
      submit: { text: 'Logging in...' },
    }));

    this.submitRef.current.setAttribute('disabled', true);

    firebase.login({ email, password })
      .then(() => {
        this.setState(prevState => ({
          ...prevState,
          login: {
            email: '',
            password: '',
          },
          alert: {
            show: true,
            type: 'success',
            heading: '',
            text: 'Successful Login',
          },
        }));
        this.formRef.current.hidden = true;
        setTimeout(() => { this.props.history.push('/'); }, 1000);
      })
      .catch(() => {
        this.setState(prevState => ({
          ...prevState,
          login: {
            email: '',
            password: '',
          },
          alert: {
            show: true,
            type: 'danger',
            heading: 'Login Error',
            text: 'Invalid Login Credentials',
          },
          submit: {
            text: 'Login',
          },
        }));
        this.emailRef.current.focus();
        this.submitRef.current.removeAttribute('disabled');
      });
  }

  render() {
    const { login: { email, password }, alert, submit } = this.state;
    const { onChange, onSubmit } = this;

    return (
      <div className="row">
        <div className="col-md-6 mx-auto pt-3">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary"><i className="fas fa-lock"></i> Login</span>
              </h1>
              {alert.show
                && <Alert bsStyle={alert.type}>
                  <h4>{alert.heading}</h4>
                  <p>{alert.text}</p>
                </Alert>
              }
              <form ref={this.formRef} onSubmit={onSubmit}>
                <div className="form-group">
                  <label className="pl-1" htmlFor="email">Email</label>
                  <input type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    value={email}
                    placeholder="Enter your login email..."
                    required
                    ref={this.emailRef}
                    onChange={onChange} />
                </div>
                <div className="form-group">
                  <label className="pl-1" htmlFor="password">Password</label>
                  <input type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    value={password}
                    placeholder="Enter your login password..."
                    required
                    onChange={onChange} />
                </div>
                <button type="submit"
                  className="btn btn-primary btn-block"
                  ref={this.submitRef}
                >{submit.text}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Login);
