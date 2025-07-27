import { useState, useMemo } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Chip,
  InputAdornment,
  Paper,
} from '@mui/material';
import FindInPageIcon from '@mui/icons-material/FindInPage';

const ClientVerificationInput = () => {
  const [searchValue, setSearchValue] = useState('');

  const { codeType, isValid, chipLabel, chipColor } = useMemo(() => {
    const len = searchValue.length;

    if (len < 8)
      return {
        isValid: false,
        chipLabel: `${len} / 8`,
        chipColor: 'default',
        codeType: null,
      };

    if (len === 8)
      return {
        isValid: true,
        chipLabel: 'ЄДРПОУ',
        chipColor: 'success',
        codeType: 'ЄДРПОУ',
      };

    if (len === 9)
      return {
        isValid: false,
        chipLabel: `${len} / 10`,
        chipColor: 'default',
        codeType: null,
      };

    if (len === 10)
      return {
        isValid: true,
        chipLabel: 'РНОКПП',
        chipColor: 'success',
        codeType: 'РНОКПП',
      };

    return {
      isValid: false,
      chipLabel: `${len} / 10`,
      chipColor: 'default',
      codeType: null,
    };
  }, [searchValue]);

  const handleValueChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    setSearchValue(value);
  };

  const handleSearch = () => {
    if (isValid) {
      console.log('Пошук клієнта...', {
        type: codeType,
        code: searchValue,
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: 2, fontSize: '1.35rem' }}
        >
          Введіть код ЄДРПОУ або РНОКПП для пошуку
        </Typography>

        <Box sx={{ width: '100%', maxWidth: '500px' }}>
          <Paper
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            elevation={2}
            sx={{
              display: 'flex',
              width: '100%',
              borderRadius: '8px',
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Наприклад: 12345678"
              value={searchValue}
              onChange={handleValueChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '56px',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  '& fieldset': { border: 'none' },
                  fontSize: '1.1rem',
                },
              }}
              inputProps={{
                maxLength: 10,
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
              InputProps={{
                endAdornment: searchValue && (
                  <InputAdornment
                    position="end"
                    sx={{ mr: 1 }}
                  >
                    <Chip
                      label={chipLabel}
                      color={chipColor}
                      size="small"
                    />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={!isValid}
              startIcon={<FindInPageIcon fontSize="large" />}
              sx={{
                height: '56px',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: '7px',
                borderBottomRightRadius: '7px',
                flexShrink: 0,
                px: 3,
                boxShadow: 'none',
                transition: 'transform 0.1s ease-in-out, background-color 0.2s',
                '&:hover': {
                  backgroundColor: '#1565c0',

                  boxShadow: 'none',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
            >
              Перевірити
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default ClientVerificationInput;
