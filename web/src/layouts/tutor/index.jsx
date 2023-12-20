import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { connectSocket, disconnectSocket } from 'src/app/socket/socket.action';

import Nav from './nav';
import Main from './main';
import Header from '../common/header';

// ----------------------------------------------------------------------

export default function TutorLayout({ children }) {
  const dispatch = useDispatch();

  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    dispatch(connectSocket());
    return () => dispatch(disconnectSocket());
  });

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}

TutorLayout.propTypes = {
  children: PropTypes.node,
};
