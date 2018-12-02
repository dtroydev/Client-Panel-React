import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
        <div className="col-md-6 mt-4 mb-3">
          <Link to="/" className="btn btn-link">
            <i className="fas fa-arrow-circle-left"></i>
            Back to Dashboard
            </Link>
        </div>
        <div className="mt-1 row justify-content-center">
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
                          settingsParamsArray.map((settingParams, i) => (
                            <Setting key={i} {...settingParams} />
                          ))
                        }
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
