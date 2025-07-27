import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Link as MuiLink,
  Divider,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignInForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({ login: '', password: '' });
  const [errors, setErrors] = useState({ login: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if (errors[prop]) {
      setErrors({ ...errors, [prop]: '' });
    }
  };

  const validate = () => {
    let tempErrors = { login: '', password: '' };
    let isValid = true;
    if (!values.login) {
      tempErrors.login = 'Логін не може бути порожнім.';
      isValid = false;
    }
    if (!values.password) {
      tempErrors.password = 'Введіть ваш пароль.';
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log('Form submitted:', values);
      navigate('/dashboard');
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: { xs: 3, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '16px',
          width: '100%',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          color="text.primary"
          sx={{ mb: 3 }}
        >
          Вхід
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ width: '100%' }}
        >
          <Stack spacing={2}>
            <TextField
              label="Логін"
              variant="outlined"
              fullWidth
              autoComplete="username"
              value={values.login}
              onChange={handleChange('login')}
              error={!!errors.login}
              helperText={errors.login || ' '}
            />
            <TextField
              label="Пароль"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange('password')}
              error={!!errors.password}
              helperText={errors.password || ' '}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ width: '100%', textAlign: 'right' }}>
              <MuiLink
                component={Link}
                to="/forgot-password"
                variant="body2"
              >
                Забули пароль?
              </MuiLink>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ py: 1.5, '&:hover': { backgroundColor: '#1565c0' } }}
            >
              Увійти
            </Button>
          </Stack>

          <Divider sx={{ my: 2.5 }} />

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Новий користувач?
            </Typography>
            <Button
              component={Link}
              to="/sign-up"
              variant="text"
              sx={{ ml: 0.5 }}
            >
              Зареєструйтесь
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignInForm;
