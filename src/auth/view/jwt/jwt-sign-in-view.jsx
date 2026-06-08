'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { setMockAuthUser, getMockUsers } from 'src/utils/mock-auth';
import { FormHead } from '../../components/form-head';

// -----------------------------------------------

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email harus diisi!' })
    .email({ message: 'Email harus valid!' }),
  password: zod
    .string()
    .min(1, { message: 'Password harus diisi!' })
    .min(6, { message: 'Password minimal 6 karakter!' }),
});

// -----------------------------------------------

/**
 * HSI News Portal - Mock Sign In View
 * Phase A (UI): Simple mock authentication
 * Accepts any email and redirects to dashboard
 */
export function JwtSignInView() {
  const router = useRouter();

  const showPassword = useBoolean();

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get mock users for display
  const mockUsers = getMockUsers();

  const defaultValues = {
    email: 'imam@hsi.ac.id',
    password: '123456',
  };

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      // Mock login: find user by email or use first mock user
      const matchedUser = mockUsers.find((u) => u.email === data.email);
      const userToLogin = matchedUser || mockUsers[0];

      // Set mock auth session
      setMockAuthUser(userToLogin.id);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Redirect to dashboard
      router.push(paths.dashboard.root);
    } catch (error) {
      console.error(error);
      setErrorMessage('Login gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  });

  const renderForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Field.Text
        name="email"
        label="Email"
        slotProps={{ inputLabel: { shrink: true } }}
        placeholder="Masukkan email Anda"
      />

      <Box sx={{ gap: 1.5, display: 'flex', flexDirection: 'column' }}>
        <Field.Text
          name="password"
          label="Password"
          placeholder="Masukkan password"
          type={showPassword.value ? 'text' : 'password'}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    <Iconify
                      icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading || isSubmitting}
        loadingIndicator="Memproses..."
        sx={{
          backgroundColor: '#00A76F',
          '&:hover': {
            backgroundColor: '#009157',
          },
        }}
      >
        Masuk
      </Button>
    </Box>
  );

  return (
    <>
      <FormHead
        title="HSI News Portal"
        description="Masuk ke dashboard penulis"
        sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 3 }}
      />

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Mode Demo (Phase A):</strong>
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
          Masuk dengan email apapun (misalnya: imam@hsi.ac.id)
        </Typography>
        <Typography variant="caption">Password: apa saja (minimal 6 karakter)</Typography>
      </Alert>

      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      {/* Mock Users Reference */}
      <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'text.secondary' }}>
          <strong>Pengguna Tersedia (Fase A):</strong>
        </Typography>
        <Box sx={{ gap: 0.5, display: 'flex', flexDirection: 'column' }}>
          {mockUsers.map((user) => (
            <Typography key={user.id} variant="caption" sx={{ color: 'text.secondary' }}>
              • {user.email} ({user.role})
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  );
}
