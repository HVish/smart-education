import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectProfile } from 'src/app/auth/auth.selector';

console.log('ProtectedRoute');

const ProtectedRoute = ({ children }) => {
  const profile = useSelector(selectProfile);
  const navigate = useNavigate();
  useEffect(() => {
    if (!profile) {
      navigate('/login');
    }
  }, [navigate, profile]);
  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
