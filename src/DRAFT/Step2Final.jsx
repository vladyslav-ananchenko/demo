import {
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  FormHelperText,
  Box,
} from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';

const Step2Final = ({ values, setValues, errors, setErrors }) => {
  const handleChange = (prop) => (event) => {
    const value =
      prop === 'agreedToTerms' ? event.target.checked : event.target.value;
    setValues({ ...values, [prop]: value });
    if (errors[prop]) setErrors({ ...errors, [prop]: '' });
  };

  const handlePhoneChange = (newValue) => {
    setValues({ ...values, phone: newValue });
    if (errors.phone) setErrors({ ...errors, phone: '' });
  };

  return (
    <Stack spacing={2.5}>
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
            <Typography variant="body2">
              Я погоджуюсь на обробку персональних даних
            </Typography>
          }
        />
        <FormHelperText
          error
          sx={{ minHeight: '20px', ml: '14px', mt: -2 }}
        >
          {errors.agreedToTerms || ' '}
        </FormHelperText>
      </Box>
    </Stack>
  );
};

export default Step2Final;
