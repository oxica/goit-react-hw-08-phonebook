const getLoggedIn = state => state.auth.isLoggedIn;

const getUserEmail = state => state.auth.user.email;

export { getLoggedIn, getUserEmail };
