import { useState, useMemo } from 'react';
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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

const Step1Account = ({ values, setValues, errors, setErrors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if (errors[prop]) setErrors({ ...errors, [prop]: '' });
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
    <Stack spacing={4}>
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
            gap: '4px 16px',
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

export default Step1Account;
