import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './App.jsx';
import SignInForm from './DRAFT/SignInForm.jsx';
import SignUpWizard from './DRAFT/SignUpWizard.jsx';
import ClientVerificationInput from './DRAFT/ClientVerificationInput.jsx';

import { theme } from './theme/index.js';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ClientVerificationInput />,
      },
      {
        path: 'sign-in',
        element: <SignInForm />,
      },
      {
        path: 'sign-up',
        element: <SignUpWizard />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
