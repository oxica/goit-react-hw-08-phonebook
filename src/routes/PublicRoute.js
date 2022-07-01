import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { getLoggedIn } from 'redux/auth/authSelectors';

const PublicRoute = ({ restricted = false, redirectTo }) => {
  const isLoggedIn = useSelector(getLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  return shouldRedirect ? <Navigate to={redirectTo} /> : <Outlet />;
};

export default PublicRoute;

PublicRoute.propTypes = {
  restricted: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
