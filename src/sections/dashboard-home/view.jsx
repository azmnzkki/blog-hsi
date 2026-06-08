'use client';

import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';

import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { getMockAuthUser } from 'src/utils/mock-auth';
import { POSTS } from 'src/_mock/_blog';
import Avatar from '@mui/material/Avatar';
import { PostListCardSkeletons } from 'src/sections/posts/post-skeleton';
import { AnimateCountUp } from 'src/components/animate';

// -----------------------------------------------

const CATEGORY_STYLES = {
  berita: {
    bg: 'rgba(21, 101, 192, 0.1)',
    color: '#1565C0',
    label: 'Berita',
  },
  artikel: {
    bg: 'rgba(0, 167, 111, 0.1)',
    color: '#00A76F',
    label: 'Artikel',
  },
  pengumuman: {
    bg: 'rgba(255, 152, 0, 0.1)',
    color: '#FF9800',
    label: 'Pengumuman',
  },
};

const STATUS_STYLES = {
  published: {
    bg: 'rgba(34, 197, 94, 0.1)',
    color: '#22C55E',
    label: 'Published',
  },
  draft: {
    bg: 'rgba(156, 163, 175, 0.1)',
    color: '#9CA3AF',
    label: 'Draft',
  },
};

// -----------------------------------------------

/**
 * Dashboard Home View for HSI News Portal
 * Shows greeting, summary stats, and recent articles
 */
export function DashboardHomeView() {
  const currentUser = getMockAuthUser();

  // Get current date for greeting
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get user's articles (hardcoded to first user for demo)
  const userArticles = useMemo(() => {
    return POSTS.filter((post) => post.author.id === 'author-1').sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const published = userArticles.filter((p) => p.status === 'published').length;
    const drafts = userArticles.filter((p) => p.status === 'draft').length;
    const totalViews = userArticles.reduce((sum, p) => sum + p.totalViews, 0);

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const thisMonthPosts = userArticles.filter((p) => {
      const postDate = new Date(p.publishedAt);
      return postDate.getMonth() === currentMonth && postDate.getFullYear() === currentYear;
    }).length;

    return {
      published,
      drafts,
      totalViews,
      thisMonthPosts,
    };
  }, [userArticles, today]);

  // Get recent articles (5 latest)
  const recentArticles = userArticles.slice(0, 5);

  const renderStatCard = (icon, label, value, color = '#00A76F') => (
    <Card sx={{ p: 3, flex: 1, minWidth: 200 }}>
      <Stack spacing={2}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {label}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: `rgba(0, 167, 111, 0.1)`,
              color: color,
            }}
          >
            <Iconify icon={icon} width={24} height={24} />
          </Box>
        </Stack>
        <AnimateCountUp
          to={value}
          variant="h4"
          sx={{ fontWeight: 700 }}
          duration={2}
        />
      </Stack>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Greeting Section */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Selamat datang, {currentUser?.name}! 👋
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {dateFormatted}
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            {renderStatCard('eva:file-text-fill', 'Total Artikel Terbit', stats.published)}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {renderStatCard('eva:edit-fill', 'Total Draft', stats.drafts, '#FF9800')}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {renderStatCard('eva:eye-fill', 'Total Views', stats.totalViews.toLocaleString('id-ID'), '#1565C0')}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {renderStatCard('eva:calendar-fill', 'Artikel Bulan Ini', stats.thisMonthPosts, '#22C55E')}
          </Grid>
        </Grid>

        {/* Recent Articles Table - Desktop View */}
        {(
        <Card sx={{ overflow: 'hidden', display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Artikel Terbaru Saya
            </Typography>
          </Box>

          {recentArticles.length > 0 ? (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 700 }}>Judul</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Kategori</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tanggal</TableCell>
                      <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Aksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentArticles.map((article) => {
                      const categoryStyle = CATEGORY_STYLES[article.category];
                      const statusStyle = STATUS_STYLES[article.status];

                      return (
                        <TableRow key={article.id} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, maxWidth: 250 }} noWrap>
                              {article.title}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={categoryStyle.label}
                              size="small"
                              sx={{
                                backgroundColor: categoryStyle.bg,
                                color: categoryStyle.color,
                                fontWeight: 600,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={statusStyle.label}
                              size="small"
                              sx={{
                                backgroundColor: statusStyle.bg,
                                color: statusStyle.color,
                                fontWeight: 600,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {article.publishedAt.toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'center' }}>
                              <IconButton
                                size="small"
                                component={RouterLink}
                                href={`/dashboard/posts/${article.id}/edit`}
                                title="Edit"
                              >
                                <Iconify icon="eva:edit-fill" width={20} height={20} />
                              </IconButton>
                              <IconButton
                                size="small"
                                title="Hapus"
                                onClick={() => {
                                  // Delete action (Phase B: implement)
                                  console.log('Delete:', article.id);
                                }}
                              >
                                <Iconify icon="eva:trash-2-fill" width={20} height={20} sx={{ color: 'error.main' }} />
                              </IconButton>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* View All Button */}
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
                <Button
                  component={RouterLink}
                  href="/dashboard/posts"
                  variant="outlined"
                  endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                >
                  Lihat Semua Artikel
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Iconify
                icon="eva:inbox-fill"
                width={64}
                height={64}
                sx={{ color: 'text.secondary', mb: 2 }}
              />
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Belum ada artikel
              </Typography>
              <Button
                component={RouterLink}
                href="/dashboard/posts/new"
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Tulis Artikel Baru
              </Button>
            </Box>
          )}
        </Card>
        )}

        {/* Recent Articles Mobile Card List - Mobile View Only */}
        {(
        <Card sx={{ overflow: 'hidden', display: { xs: 'block', md: 'none' } }}>
          <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Artikel Terbaru Saya
            </Typography>
          </Box>

          {recentArticles.length > 0 ? (
            <Stack spacing={2} sx={{ p: 2 }}>
              {recentArticles.map((article) => {
                const categoryStyle = CATEGORY_STYLES[article.category];
                const statusStyle = STATUS_STYLES[article.status];

                return (
                  <Card key={article.id} sx={{ p: 2, backgroundColor: 'action.hover' }}>
                    <Stack spacing={1.5}>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                        <Avatar variant="rounded" src={article.coverUrl} sx={{ width: 50, height: 50, flexShrink: 0 }} />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.25, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {article.title.length > 40 ? `${article.title.substring(0, 40)}...` : article.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.75 }}>
                            {article.publishedAt.toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                        <Chip
                          label={categoryStyle.label}
                          size="small"
                          sx={{
                            backgroundColor: categoryStyle.bg,
                            color: categoryStyle.color,
                            fontWeight: 600,
                            height: 24,
                          }}
                        />
                        <Chip
                          label={statusStyle.label}
                          size="small"
                          sx={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                            fontWeight: 600,
                            height: 24,
                          }}
                        />
                      </Stack>

                      <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end', borderTop: '1px solid', borderColor: 'divider', pt: 1 }}>
                        <IconButton
                          size="small"
                          component={RouterLink}
                          href={`/dashboard/posts/${article.id}/edit`}
                          title="Edit"
                        >
                          <Iconify icon="eva:edit-fill" width={18} height={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          title="Hapus"
                          onClick={() => {
                            console.log('Delete:', article.id);
                          }}
                        >
                          <Iconify icon="eva:trash-2-fill" width={18} height={18} sx={{ color: 'error.main' }} />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Card>
                );
              })}
            </Stack>
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Iconify
                icon="eva:inbox-fill"
                width={64}
                height={64}
                sx={{ color: 'text.secondary', mb: 2 }}
              />
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Belum ada artikel
              </Typography>
              <Button
                component={RouterLink}
                href="/dashboard/posts/new"
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Tulis Artikel Baru
              </Button>
            </Box>
          )}
        </Card>
        )}
      </Stack>
    </Container>
  );
}
