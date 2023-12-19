import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { connectWS } from 'src/utils/socket';

import Nav from './nav';
import Main from './main';
import Header from '../common/header';

// ----------------------------------------------------------------------

export default function TutorLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const socket = connectWS();
    return () => {
      socket.disconnect();
    };
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
