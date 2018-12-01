import React, { Component, createRef } from 'react';
import { withFirebase } from 'react-redux-firebase';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { defaultUserProfile } from './Config';

class Register extends Component {
  constructor(props) {
    super(props);
    this.submitRef = createRef();
    this.formRef = createRef();
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      alert: {
        show: false,
        text: '',
        type: '',
      },
      submit: {
        text: 'Register',
      },
    };
  }

  componentDidMount() {
    const {
      formRef: { current: formElement },
      props: {
        isLoggedIn,
      },
    } = this;

    if (isLoggedIn) {
      formElement.hidden = true;

      this.setState({
        alert: {
          show: true,
          type: 'success',
          heading: '',
          text: 'Your account has been registered. Going to Dashboard..',
        },
      });
    }
  }

  onChange = ({ target: { name, value } }) => {
    this.setState(({ user }) => ({ user: { ...user, [name]: value } }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      formRef: { current: formElement },
      submitRef: { current: submitElement },
      state: {
        user: {
          firstName,
          lastName,
          email,
          password,
          passwordConfirmation,
        },
      },
      props: {
        history,
      },
    } = this;

    const { firebase } = this.props;

    this.setState({
      showAlert: false,
      submit: { text: 'Registering...' },
    });

    submitElement.setAttribute('disabled', true);

    if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || email.trim() === '@') {
      this.setState({
        alert: {
          show: true,
          type: 'danger',
          heading: 'Registration Error',
          text: 'Invalid Input',
        },
        submit: {
          text: 'Register',
        },
      });
      submitElement.removeAttribute('disabled');
    } else if (password !== passwordConfirmation) {
      this.setState({
        login: {
          password: '',
          passwordConfirmation: '',
        },
        alert: {
          show: true,
          type: 'danger',
          heading: 'Registration Error',
          text: 'Passwords Don\'t Match',
        },
        submit: {
          text: 'Register',
        },
      });
      submitElement.removeAttribute('disabled');
    } else {
      this.setState({
        alert: {
          show: true,
          type: 'warning',
          heading: '',
          text: 'Thank you for your details. Please stand by..',
        },
      });
      firebase.createUser(
        { email, password },
        { ...defaultUserProfile, info: { firstName, lastName } },
      ).then(() => {
        history.push('/');
      })
        .catch(({ message }) => {
          this.setState({
            login: {
              password: '',
              passwordConfirmation: '',
            },
            alert: {
              show: true,
              type: 'danger',
              heading: 'Registration Error',
              text: message,
            },
            submit: {
              text: 'Register',
            },
          });
          formElement.hidden = false;
          submitElement.removeAttribute('disabled');
        });
    }
  }

  render() {
    const {
      formRef,
      submitRef,
      onChange,
      onSubmit,
      state: {
        user: {
          firstName,
          lastName,
          email,
          password,
          passwordConfirmation,
        },
        alert,
        submit,
      },
    } = this;

    return (
      <div className="container">
        <div className="row>">
          <div className="col-md-8 col-lg-6 mx-auto pt-3">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center pb-4 pt-3">
                  <span className="text-primary"><i className="fas fa-lock"></i>{' '}Register</span>
                </h1>
                {alert.show
                  && <Alert data-testid="alert" bsStyle={alert.type}>
                    <h4>{alert.heading}</h4>
                    <p>{alert.text}</p>
                  </Alert>
                }
                <form ref={formRef} onSubmit={onSubmit}>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      id="firstName"
                      minLength="2"
                      required
                      onChange={onChange}
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
                      onChange={onChange}
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
                      onChange={onChange}
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      onChange={onChange}
                      value={password}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordConfirmation">Re-enter your Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="passwordConfirmation"
                      id="passwordConfirmation"
                      onChange={onChange}
                      value={passwordConfirmation}
                    />
                  </div>
                  <div className="form-group">
                    <button ref={submitRef} className="btn btn-primary btn-block" type="submit">{submit.text}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  profile: state.firebase.profile,
});

export default compose(withFirebase, connect(mapStateToProps))(Register);
