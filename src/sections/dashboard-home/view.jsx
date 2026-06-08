'use client';

import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';

import { RouterLink } from 'src/routes/components';
import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { getMockAuthUser } from 'src/utils/mock-auth';
import { POSTS } from 'src/_mock/_blog';

// ----------------------------------------------------------------------

const CATEGORY_MAP = {
  berita: { label: 'Berita', color: 'info' },
  artikel: { label: 'Artikel', color: 'success' },
  pengumuman: { label: 'Pengumuman', color: 'warning' },
};

// ----------------------------------------------------------------------

function StatCard({ title, value, icon, color = 'primary' }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 56,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              bgcolor: `${color}.lighter`,
            }}
          >
            <Iconify icon={icon} width={28} sx={{ color: `${color}.main` }} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function DashboardHomeView() {
  const currentUser = getMockAuthUser();

  const myPosts = useMemo(
    () => POSTS.filter((p) => p.author?.id === currentUser?.id),
    [currentUser]
  );

  const published = myPosts.filter((p) => p.status === 'published');
  const drafts = myPosts.filter((p) => p.status === 'draft');
  const totalViews = myPosts.reduce((sum, p) => sum + (p.totalViews || 0), 0);
  const recentPosts = [...myPosts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <Container maxWidth="xl">
      {/* Greeting */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          Selamat datang, {currentUser?.name}! 👋
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {fDate(new Date())}
        </Typography>
      </Box>

      {/* Stats */}
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          mb: 5,
          gridTemplateColumns: {
            xs: '1fr 1fr',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        <StatCard
          title="Artikel Terbit"
          value={published.length}
          icon="solar:document-bold-duotone"
          color="success"
        />
        <StatCard
          title="Draft"
          value={drafts.length}
          icon="solar:file-text-bold-duotone"
          color="warning"
        />
        <StatCard
          title="Total Views"
          value={fShortenNumber(totalViews)}
          icon="solar:eye-bold-duotone"
          color="info"
        />
        <StatCard
          title="Total Artikel"
          value={myPosts.length}
          icon="solar:pen-bold-duotone"
          color="primary"
        />
      </Box>

      {/* Recent Posts Table */}
      <Card>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 3, py: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}
        >
          <Typography variant="h6">Artikel Terbaru Saya</Typography>
          <Button
            component={RouterLink}
            href="/dashboard/posts"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            size="small"
          >
            Lihat Semua
          </Button>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Judul</TableCell>
                <TableCell>Kategori</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Tanggal</TableCell>
                <TableCell align="right">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                    Belum ada artikel. Mulai menulis sekarang!
                  </TableCell>
                </TableRow>
              ) : (
                recentPosts.map((post) => {
                  const cat = CATEGORY_MAP[post.category] || CATEGORY_MAP.berita;
                  return (
                    <TableRow key={post.id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar
                            variant="rounded"
                            src={post.coverUrl}
                            alt={post.title}
                            sx={{ width: 40, height: 40 }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              maxWidth: 260,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {post.title}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Label color={cat.color} variant="soft">
                          {cat.label}
                        </Label>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={post.status === 'published' ? 'Terbit' : 'Draft'}
                          color={post.status === 'published' ? 'success' : 'default'}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {fDate(post.createdAt)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          component={RouterLink}
                          href={`/dashboard/posts/${post.id}/edit`}
                          size="small"
                        >
                          <Iconify icon="solar:pen-bold" width={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
