import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Stack,
  Link as MuiLink,
  Divider,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import Step1Account from './Step1_Account';
import Step2Final from './Step2Final';

const steps = ['Акаунт', 'Контакти та згода'];

const SignUpWizard = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState({
    login: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '+380',
    agreedToTerms: false,
  });
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (validate(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    if (validate(activeStep)) {
      console.log('Form Submitted:', values);
      navigate('/sign-in');
    }
  };

  const validate = (step) => {
    let tempErrors = {};
    switch (step) {
      case 0:
        if (!values.login) tempErrors.login = 'Логін не може бути порожнім';
        if (!values.password) tempErrors.password = 'Введіть пароль';
        else if (values.password.length < 8)
          tempErrors.password = 'Пароль має бути мінімум 8 символів';
        if (values.password !== values.confirmPassword)
          tempErrors.confirmPassword = 'Паролі не співпадають';
        break;
      case 1:
        if (!values.email) tempErrors.email = 'Введіть вашу пошту';
        else if (!/\S+@\S+\.\S+/.test(values.email))
          tempErrors.email = 'Некоректний формат електронної адреси';
        if (values.phone.length < 13)
          tempErrors.phone = 'Введіть повний номер телефону';
        if (!values.agreedToTerms)
          tempErrors.agreedToTerms = 'Ви повинні погодитись з умовами';
        break;
      default:
        break;
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Step1Account
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 1:
        return (
          <Step2Final
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ py: 2 }}
    >
      <Paper
        elevation={3}
        sx={{ padding: { xs: 3, sm: 4 }, borderRadius: '16px' }}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          sx={{ mb: 3 }}
        >
          Реєстрація
        </Typography>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: 3,
            '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
              borderColor: 'primary.main',
            },
            '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
              borderColor: 'primary.main',
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box
          component="form"
          noValidate
          sx={{
            minHeight: 320,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Назад
            </Button>
            <Button
              variant="contained"
              onClick={
                activeStep === steps.length - 1 ? handleSubmit : handleNext
              }
            >
              {activeStep === steps.length - 1 ? 'Зареєструватись' : 'Далі'}
            </Button>
          </Box>
          {activeStep === 0 && (
            <>
              <Divider sx={{ my: 2 }} />
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
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUpWizard;
