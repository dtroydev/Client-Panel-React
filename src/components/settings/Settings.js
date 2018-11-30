import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';

class Settings extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
  }

  // firestore user profile
  handleClick = (setting) => {
    const { settings } = this.props;
    const [name] = Object.keys(setting);
    const value = !setting[name];
    this.props.firebase.updateProfile({ settings: { ...settings, [name]: value } });
  }

  render() {
    const {
      handleClick,
      props: {
        settings,
      },
    } = this;

    const { balanceOnAdd, balanceOnEdit, allowRegistration } = settings;

    return (
      <div className="container">
        <div className="mt-5 row justify-content-center">
          <div className="col text-center">
            <div className="card">
              <div className="card-header">
                <h3>Settings</h3>
                <hr />
                <div className="card-body">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-4 col-md-3 col-sm-2 col-0"></div>
                      <div className="col-lg-4 col-md-6 col-sm-8 col-12">
                        <div className="row justify-content-end align-items-center">
                          <h5>Balance On Add</h5>
                          <div
                            className="d-inline-block ml-3 text-primary"
                            onClick={handleClick.bind(this, { balanceOnAdd })}
                            id="registration">{
                              balanceOnAdd
                                ? <i className="far fa-check-square fa-2x"></i>
                                : <i className="far fa-square fa-2x"></i>
                            }</div>
                        </div>
                        <div className="row justify-content-end align-items-center">
                          <h5>Balance On Edit</h5>
                          <div
                            className="d-inline-block ml-3 text-primary"
                            onClick={handleClick.bind(this, { balanceOnEdit })}
                            id="registration">{
                              balanceOnEdit
                                ? <i className="far fa-check-square fa-2x"></i>
                                : <i className="far fa-square fa-2x"></i>
                            }</div>
                        </div>
                        <div className="row justify-content-end align-items-center">
                          <h5>Allow Registration</h5>
                          <div
                            className="d-inline-block ml-3 text-primary"
                            onClick={
                              handleClick.bind(this, { allowRegistration })
                            }
                            id="registration" > {
                              allowRegistration
                                ? <i className="far fa-check-square fa-2x"></i>
                                : <i className="far fa-square fa-2x"></i>
                            }</div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-3 col-sm-2 col-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  settings: state.firebase.profile.settings,
});

export default compose(withFirebase, connect(mapStateToProps))(Settings);
