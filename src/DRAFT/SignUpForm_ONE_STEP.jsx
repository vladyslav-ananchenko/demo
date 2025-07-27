import { useState, useMemo } from 'react';
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
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate, Link } from 'react-router-dom';
import { MuiTelInput } from 'mui-tel-input';

const Requirement = ({ met, text }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      color: met ? 'success.main' : 'text.secondary',
    }}
  >
    {met ? (
      <CheckCircleIcon sx={{ fontSize: '1rem' }} />
    ) : (
      <CancelIcon sx={{ fontSize: '1rem' }} />
    )}
    <Typography variant="caption">{text}</Typography>
  </Box>
);

const SignUpForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    login: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '+380',
    agreedToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (prop) => (event) => {
    const value =
      prop === 'agreedToTerms' ? event.target.checked : event.target.value;
    setValues({ ...values, [prop]: value });
    if (errors[prop]) {
      setErrors({ ...errors, [prop]: '' });
    }
  };

  const handlePhoneChange = (newValue) => {
    setValues({ ...values, phone: newValue });
    if (errors.phone) {
      setErrors({ ...errors, phone: '' });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!values.login) tempErrors.login = 'Логін не може бути порожнім.';
    if (!values.email) tempErrors.email = 'Введіть вашу пошту.';
    else if (!/\S+@\S+\.\S+/.test(values.email))
      tempErrors.email = 'Некоректний формат пошти.';
    if (!values.password) tempErrors.password = 'Введіть пароль.';
    else if (values.password.length < 8)
      tempErrors.password = 'Пароль має бути мінімум 8 символів.';
    if (values.password !== values.confirmPassword)
      tempErrors.confirmPassword = 'Паролі не збігаються.';
    if (values.phone.length < 13)
      tempErrors.phone = 'Введіть повний номер телефону.';
    if (!values.agreedToTerms)
      tempErrors.agreedToTerms = 'Ви повинні погодитись з умовами.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log('Form submitted:', values);
      navigate('/sign-in');
    }
  };

  const requirements = useMemo(
    () => [
      { text: 'Мінімум 8 символів', met: values.password.length >= 8 },
      {
        text: 'Велика та мала літери (А-а)',
        met: /(?=.*[a-z])(?=.*[A-Z])/.test(values.password),
      },
      { text: 'Мінімум одна цифра (0-9)', met: /\d/.test(values.password) },
      {
        text: 'Спеціальний символ (!@#$)',
        met: /[!@#$%^&*]/.test(values.password),
      },
    ],
    [values.password]
  );

  return (
    <Container
      maxWidth="xs"
      sx={{ py: 2 }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: { xs: 2.5, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '16px',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          color="text.primary"
          sx={{ mb: 2.5 }}
        >
          Реєстрація
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ width: '100%' }}
        >
          <Stack spacing={1.5}>
            <TextField
              label="Логін"
              fullWidth
              value={values.login}
              onChange={handleChange('login')}
              error={!!errors.login}
              helperText={errors.login || '5-20 символів (літери та цифри)'}
              autoComplete="username"
            />
            <Box>
              <TextField
                label="Пароль"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={values.password}
                onChange={handleChange('password')}
                error={!!errors.password}
                helperText={errors.password || ' '}
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '2px 8px',
                  mt: 1,
                  pl: 0.5,
                }}
              >
                {requirements.map((req) => (
                  <Requirement
                    key={req.text}
                    met={req.met}
                    text={req.text}
                  />
                ))}
              </Box>
            </Box>
            <TextField
              label="Повторіть пароль"
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword || ' '}
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Електронна пошта"
              type="email"
              fullWidth
              value={values.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              helperText={errors.email || ' '}
              autoComplete="email"
            />
            <MuiTelInput
              variant="outlined"
              label="Фінансовий номер телефону"
              fullWidth
              value={values.phone}
              onChange={handlePhoneChange}
              error={!!errors.phone}
              helperText={errors.phone || ' '}
              defaultCountry="UA"
              autoComplete="tel"
            />
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.agreedToTerms}
                    onChange={handleChange('agreedToTerms')}
                    name="agreedToTerms"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="caption">
                    Я погоджуюсь на обробку персональних даних
                  </Typography>
                }
                sx={{ ml: -1.5, mt: -1, mb: -1 }}
              />
              <FormHelperText
                error
                sx={{ minHeight: '18px', ml: '14px', mt: -0.5 }}
              >
                {errors.agreedToTerms || ' '}
              </FormHelperText>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ py: 1.5, '&:hover': { backgroundColor: '#1565c0' } }}
            >
              Зареєструватись
            </Button>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Вже є акаунт?
              </Typography>
              <Button
                component={Link}
                to="/sign-in"
                variant="text"
                sx={{ ml: 0.5 }}
              >
                Увійти
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUpForm;
