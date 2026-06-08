'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { getMockAuthUser } from 'src/utils/mock-auth';

import { Iconify } from 'src/components/iconify';
import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// -----------------------------------------------

// Profile Update Schema
const ProfileSchema = zod.object({
  name: zod.string().min(3, { message: 'Nama harus minimal 3 karakter' }),
  email: zod.string().email({ message: 'Email tidak valid' }),
  bio: zod.string().max(500, { message: 'Bio maksimal 500 karakter' }),
});

// Password Schema
const PasswordSchema = zod.object({
  oldPassword: zod.string().min(1, { message: 'Password lama harus diisi' }),
  newPassword: zod.string().min(6, { message: 'Password baru minimal 6 karakter' }),
  confirmPassword: zod.string().min(6, { message: 'Konfirmasi password minimal 6 karakter' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Password baru dan konfirmasi harus sama',
  path: ['confirmPassword'],
});

// -----------------------------------------------

export function ProfileView() {
  const currentUser = getMockAuthUser();
  const [avatarPreview, setAvatarPreview] = useState(currentUser?.avatarUrl);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  // Profile Form
  const profileMethods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      bio: currentUser?.bio || '',
    },
  });

  const { handleSubmit: handleProfileSubmit } = profileMethods;

  // Password Form
  const passwordMethods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit: handlePasswordSubmit, reset: resetPasswordForm } = passwordMethods;

  // -----------------------------------------------
  // AVATAR UPLOAD
  // -----------------------------------------------

  const handleAvatarClick = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
    }
  }, []);

  const handleRemoveAvatar = useCallback(() => {
    setAvatarPreview(currentUser?.avatarUrl);
  }, [currentUser?.avatarUrl]);

  // -----------------------------------------------
  // PROFILE SUBMIT
  // -----------------------------------------------

  const onProfileSubmit = handleProfileSubmit(async (data) => {
    setIsSubmittingProfile(true);
    try {
      // Simulate save
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log('Profile updated:', { ...data, avatar: avatarPreview });
      toast.success('Profil berhasil diperbarui');
    } catch (error) {
      console.error(error);
      toast.error('Gagal memperbarui profil');
    } finally {
      setIsSubmittingProfile(false);
    }
  });

  // -----------------------------------------------
  // PASSWORD SUBMIT
  // -----------------------------------------------

  const onPasswordSubmit = handlePasswordSubmit(async (data) => {
    setIsSubmittingPassword(true);
    try {
      // Simulate save
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log('Password changed:', {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      toast.success('Password berhasil diubah');
      resetPasswordForm();
    } catch (error) {
      console.error(error);
      toast.error('Gagal mengubah password');
    } finally {
      setIsSubmittingPassword(false);
    }
  });

  // -----------------------------------------------
  // RENDER
  // -----------------------------------------------

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* AVATAR CARD */}
        <Card>
          <CardHeader title="Foto Profil" sx={{ mb: 3 }} />
          <Divider />

          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Stack spacing={3} sx={{ alignItems: 'center' }}>
              {/* Avatar */}
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={avatarPreview}
                  sx={{
                    width: 120,
                    height: 120,
                    border: '3px solid #00A76F',
                    fontSize: 48,
                  }}
                >
                  {currentUser?.name?.charAt(0)}
                </Avatar>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#00A76F',
                    borderRadius: '50%',
                    p: 1,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#008c5e',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarClick}
                    style={{ display: 'none' }}
                    id="avatar-input"
                  />
                  <label htmlFor="avatar-input" style={{ cursor: 'pointer' }}>
                    <Iconify icon="eva:camera-fill" width={24} height={24} sx={{ color: 'white' }} />
                  </label>
                </Box>
              </Box>

              {/* User Info */}
              <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {currentUser?.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {currentUser?.role}
                </Typography>
              </Stack>

              {/* Remove Button */}
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={handleRemoveAvatar}
                startIcon={<Iconify icon="eva:trash-2-fill" />}
              >
                Hapus Foto
              </Button>
            </Stack>
          </Box>
        </Card>

        {/* PROFILE FORM */}
        <Card>
          <CardHeader title="Edit Profil" sx={{ mb: 3 }} />
          <Divider />

          <Form methods={profileMethods} onSubmit={onProfileSubmit}>
            <Stack spacing={3} sx={{ p: 3 }}>
              {/* Name */}
              <Field.Text
                name="name"
                label="Nama Lengkap"
                placeholder="Masukkan nama lengkap"
              />

              {/* Email */}
              <Field.Text
                name="email"
                label="Email"
                placeholder="Email address"
                disabled
                helperText="Email tidak bisa diubah"
              />

              {/* Bio */}
              <Field.Text
                name="bio"
                label="Bio / Deskripsi Singkat"
                placeholder="Ceritakan sedikit tentang Anda..."
                multiline
                rows={4}
                helperText="Maksimal 500 karakter"
              />

              {/* Submit Button */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  loading={isSubmittingProfile}
                  sx={{ backgroundColor: '#00A76F' }}
                  startIcon={<Iconify icon="eva:checkmark-circle-fill" />}
                >
                  Simpan Perubahan
                </Button>
              </Box>
            </Stack>
          </Form>
        </Card>

        {/* CHANGE PASSWORD CARD */}
        <Card>
          <CardHeader title="Ganti Password" sx={{ mb: 3 }} />
          <Divider />

          <Form methods={passwordMethods} onSubmit={onPasswordSubmit}>
            <Stack spacing={3} sx={{ p: 3 }}>
              {/* Old Password */}
              <Field.Text
                name="oldPassword"
                label="Password Lama"
                placeholder="Masukkan password lama"
                type="password"
              />

              {/* New Password */}
              <Field.Text
                name="newPassword"
                label="Password Baru"
                placeholder="Masukkan password baru"
                type="password"
              />

              {/* Confirm Password */}
              <Field.Text
                name="confirmPassword"
                label="Konfirmasi Password Baru"
                placeholder="Konfirmasi password baru"
                type="password"
              />

              {/* Submit Button */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  loading={isSubmittingPassword}
                  sx={{ backgroundColor: '#00A76F' }}
                  startIcon={<Iconify icon="eva:key-fill" />}
                >
                  Ganti Password
                </Button>
              </Box>
            </Stack>
          </Form>
        </Card>
      </Stack>
    </Container>
  );
}
