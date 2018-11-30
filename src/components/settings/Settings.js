import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import Setting from './Setting';

class Settings extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
  }

  // firestore user profile (webapp settings)
  handleClick = (settingName) => {
    const { settings, firebase } = this.props;
    const value = !settings[settingName].value;
    const newSetting = Object.assign({}, settings[settingName], { value });
    firebase.updateProfile({ settings: { ...settings, [settingName]: newSetting } });
  }

  render() {
    const {
      handleClick,
      props: {
        settings,
      },
    } = this;

    // const {
    //   balanceOnAdd,
    //   balanceOnEdit,
    //   allowRegistration,
    //   alphabeticNames,
    // } = settings;

    const settingsParamsArray = Object.keys(settings).reduce((acc, settingName) => {
      acc.push(
        {
          ...settings[settingName],
          handler: handleClick.bind(this, settingName),
        },
      );
      return acc;
    }, []);

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
                      <div className="col-lg-3 col-md-1 col-sm-0 col-0"></div>
                      <div className="col-lg-6 col-md-10 col-sm-12 col-12">
                        {
                          settingsParamsArray.map(settingParams => (
                            <Setting {...settingParams} />
                          ))
                        }
                        {/* <div className="row justify-content-end align-items-center">
                          <h5>Alphabetic Names</h5>
                          <div
                            className="d-inline-block ml-3 text-primary"
                            onClick={
                              handleClick.bind(this, 'alphabeticNames')
                            }
                          > {
                              alphabeticNames.value
                                ? <i className="far fa-check-square fa-2x"></i>
                                : <i className="far fa-square fa-2x"></i>
                            }</div>
                        </div>
                        <div className="row justify-content-end align-items-center">
                          <h5>Balance On Add</h5>
                          <div
                            className="d-inline-block ml-3 text-primary"
                            onClick={handleClick.bind(this, 'balanceOnAdd')}
                          >{
                              balanceOnAdd.value
                                ? <i className="far fa-check-square fa-2x"></i>
                                : <i className="far fa-square fa-2x"></i>
                            }</div>
                        </div>
                        <div className="row justify-content-end align-items-center">
                          <h5>Balance On Edit</h5>
                          <div
                            className="d-inline-block ml-3 text-primary"
                            onClick={handleClick.bind(this, 'balanceOnEdit')}
                          >{
                              balanceOnEdit.value
                                ? <i className="far fa-check-square fa-2x"></i>
                                : <i className="far fa-square fa-2x"></i>
                            }</div>
                        </div>
                        <div className="row justify-content-end align-items-center">
                          <h5>Allow Registration</h5>
                          <div
                            className="d-inline-block ml-3 text-primary"
                            onClick={
                              handleClick.bind(this, 'allowRegistration')
                            }
                          > {
                              allowRegistration.value
                                ? <i className="far fa-check-square fa-2x"></i>
                                : <i className="far fa-square fa-2x"></i>
                            }</div>
                        </div> */}
                      </div>
                      <div className="col-lg-3 col-md-1 col-sm-0 col-0"></div>
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
