import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const App = () => (
  <Box
    sx={{
      display: 'flex',
      minHeight: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Outlet />
  </Box>
);

export default App;
