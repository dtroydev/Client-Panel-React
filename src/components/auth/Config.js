export const defaultUserProfile = {
  settings: {
    alphabeticNames: { value: false, description: 'Alphabetic Name Default Order' },
    allowRegistration: { value: false, description: 'Allow New User Registration' },
    balanceOnAdd: { value: true, description: 'Allow Balance Setting for New Clients' },
    balanceOnEdit: { value: true, description: 'Allow Balance Setting for Existing Clients' },
  },
  info: {
    firstName: '',
    lastName: '',
  },
};

export default defaultUserProfile;
