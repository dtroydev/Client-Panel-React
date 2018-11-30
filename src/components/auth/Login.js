import React, { Component, createRef } from 'react';
import { withFirebase } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Login extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
  }

  static defaultUserProfileSettings = {
    alphabeticNames: { value: false, description: 'Alphabetic Name Default Order' },
    allowRegistration: { value: false, description: 'Allow New User Registration' },
    balanceOnAdd: { value: true, description: 'Allow Balance Setting for New Clients' },
    balanceOnEdit: { value: true, description: 'Allow Balance Setting for Existing Clients' },
  };

  static getDerivedStateFromProps(props, state) {
    return state;
  }

  constructor(props) {
    super(props);
    this.emailRef = createRef();
    this.submitRef = createRef();
    this.formRef = createRef();
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

  componentDidMount() {
    const {
      formRef: { current: formElement },
      emailRef: { current: emailElement },
      props: {
        history,
        isLoggedIn,
        profile,
        firebase,
      },
    } = this;

    if (isLoggedIn) {
      formElement.hidden = true;

      this.setState({
        alert: {
          show: true,
          type: 'success',
          heading: '',
          text: 'You\'re logged in. Going to Dashboard..',
        },
      });

      if (profile.settings === undefined) {
        console.log('No user profile settings detected, setting defaults');
        firebase.updateProfile({ settings: Login.defaultUserProfileSettings });
      }

      setTimeout(() => { history.push('/'); }, 500);
    }

    emailElement.focus();
  }

  onChange = ({ target: { name, value } }) => {
    this.setState(({ login }) => ({ login: { ...login, [name]: value } }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      emailRef: { current: emailElement },
      submitRef: { current: submitElement },
      props: {
        firebase,
      },
      state: {
        login: {
          email, password,
        },
      },
    } = this;

    this.setState({
      showAlert: false,
      submit: { text: 'Logging in...' },
    });

    submitElement.setAttribute('disabled', true);

    firebase.login({ email, password })
      .catch(() => {
        this.setState({
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
        });
        emailElement.focus();
        submitElement.removeAttribute('disabled');
      });
  }

  render() {
    const {
      formRef,
      emailRef,
      submitRef,
      onChange,
      onSubmit,
      state: {
        login: {
          email,
          password,
        },
        alert,
        submit,
      },
    } = this;

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
              <form ref={formRef} onSubmit={onSubmit}>
                <div className="form-group">
                  <label className="pl-1" htmlFor="email">Email</label>
                  <input type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    value={email}
                    placeholder="Enter your login email..."
                    required
                    ref={emailRef}
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
                  ref={submitRef}
                >{submit.text}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default compose(withFirebase, connect(mapStateToProps))(Login);
