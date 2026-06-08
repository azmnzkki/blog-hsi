'use client';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import DialogContentText from '@mui/material/DialogContentText';
import Pagination from '@mui/material/Pagination';

import { RouterLink } from 'src/routes/components';

import { getMockAuthUser } from 'src/utils/mock-auth';

import { POSTS } from 'src/_mock/_blog';

import Iconify from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import { PostListCardSkeletons } from '../post-skeleton';

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

const FILTER_STATUS_OPTIONS = [
  { value: 'all', label: 'Semua' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const FILTER_CATEGORY_OPTIONS = [
  { value: 'all', label: 'Semua' },
  { value: 'berita', label: 'Berita' },
  { value: 'artikel', label: 'Artikel' },
  { value: 'pengumuman', label: 'Pengumuman' },
];

// -----------------------------------------------

/**
 * Post Management View for HSI Dashboard
 * Features: Search, filters, table with actions, pagination
 */
export function PostManagementView() {
  // eslint-disable-next-line no-unused-vars
  const currentUser = getMockAuthUser();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get user's articles (hardcoded to first user for demo)
  const userArticles = useMemo(() => POSTS.filter((post) => post.author.id === 'author-1'), []);

  // Filter and search
  const filteredArticles = useMemo(() => {
    let filtered = [...userArticles];

    // Search by title
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((post) => post.status === filterStatus);
    }

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter((post) => post.category === filterCategory);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    return filtered;
  }, [userArticles, searchQuery, filterStatus, filterCategory]);

  // Pagination
  const paginatedArticles = filteredArticles.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Delete dialog handlers
  const handleOpenDeleteDialog = (postId) => {
    setSelectedPostId(postId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedPostId(null);
  };

  const handleConfirmDelete = () => {
    // Delete action (Phase B: implement with API)
    console.log('Delete post:', selectedPostId);
    handleCloseDeleteDialog();
  };

  const truncateText = (text, maxLength = 50) => text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Header with Button */}
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Artikel Saya
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Kelola semua artikel dan konten Anda
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            href="/dashboard/posts/new"
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            sx={{ backgroundColor: '#00A76F' }}
          >
            + Tulis Artikel Baru
          </Button>
        </Stack>

        {/* Filter Bar */}
        <Paper
          sx={{
            p: 3,
            backgroundColor: '#f9fafb',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Grid container spacing={2}>
            {/* Search */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Cari artikel by judul..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(0);
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 600);
                }}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <Iconify
                        icon="solar:magnifer-bold-duotone"
                        width={20}
                        sx={{ color: 'text.secondary' }}
                      />
                    </Box>
                  ),
                }}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  },
                }}
              />
            </Grid>

            {/* Status Filter */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Filter Status"
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setPage(0);
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 600);
                }}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  },
                }}
              >
                {FILTER_STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Category Filter */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Filter Kategori"
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setPage(0);
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 600);
                }}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  },
                }}
              >
                {FILTER_CATEGORY_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Paper>

        {/* Results Count */}
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Menampilkan <strong>{paginatedArticles.length}</strong> dari{' '}
          <strong>{filteredArticles.length}</strong> artikel
        </Typography>

        {/* Loading State */}
        {isLoading && (
          <Box sx={{ mb: 4 }}>
            <PostListCardSkeletons count={rowsPerPage} />
          </Box>
        )}

        {/* Table - Desktop View */}
        {!isLoading && (
          <Card sx={{ overflow: 'hidden', display: { xs: 'none', md: 'block' } }}>
          {paginatedArticles.length > 0 ? (
            <>
              <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 700, width: '5%' }}>Cover</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '35%' }}>Judul</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Kategori</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>Tanggal</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%', textAlign: 'center' }}>
                        Aksi
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedArticles.map((post) => {
                      const categoryStyle = CATEGORY_STYLES[post.category];
                      const statusStyle = STATUS_STYLES[post.status];

                      return (
                        <TableRow key={post.id} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                          {/* Cover Thumbnail */}
                          <TableCell>
                            <Avatar
                              variant="rounded"
                              src={post.coverUrl}
                              sx={{ width: 50, height: 50 }}
                            />
                          </TableCell>

                          {/* Judul + Excerpt */}
                          <TableCell>
                            <Stack spacing={0.5}>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600, color: 'text.primary' }}
                              >
                                {truncateText(post.title, 40)}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {truncateText(post.excerpt, 50)}
                              </Typography>
                            </Stack>
                          </TableCell>

                          {/* Kategori */}
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

                          {/* Status */}
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

                          {/* Tanggal */}
                          <TableCell>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {post.publishedAt.toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </Typography>
                          </TableCell>

                          {/* Aksi */}
                          <TableCell sx={{ textAlign: 'center' }}>
                            <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'center' }}>
                              <IconButton
                                size="small"
                                component={RouterLink}
                                href={`/dashboard/posts/${post.id}/edit`}
                                title="Edit"
                                sx={{
                                  '&:hover': {
                                    backgroundColor: 'action.hover',
                                  },
                                }}
                              >
                                <Iconify icon="eva:edit-fill" width={20} height={20} />
                              </IconButton>
                              <IconButton
                                size="small"
                                title="Hapus"
                                onClick={() => handleOpenDeleteDialog(post.id)}
                                sx={{
                                  '&:hover': {
                                    backgroundColor: 'error.lighter',
                                  },
                                }}
                              >
                                <Iconify
                                  icon="eva:trash-2-fill"
                                  width={20}
                                  height={20}
                                  sx={{ color: 'error.main' }}
                                />
                              </IconButton>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={filteredArticles.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Artikel per halaman:"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}–${to} dari ${count}`
                }
              />
            </>
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Iconify
                icon="eva:inbox-fill"
                width={64}
                height={64}
                sx={{ color: 'text.secondary', mb: 2 }}
              />
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                Tidak ada artikel ditemukan
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                Mulai tulis artikel pertama Anda atau ubah filter pencarian
              </Typography>
              <Button
                component={RouterLink}
                href="/dashboard/posts/new"
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{ backgroundColor: '#00A76F' }}
              >
                Tulis Artikel Baru
              </Button>
            </Box>
          )}
        </Card>
        )}

        {/* MOBILE CARD LIST - Mobile View Only */}
        {!isLoading && (
        <Stack spacing={2} sx={{ display: { xs: 'flex', md: 'none' } }}>
          {paginatedArticles.length > 0 ? (
            <>
              {paginatedArticles.map((post) => {
                const categoryStyle = CATEGORY_STYLES[post.category];
                const statusStyle = STATUS_STYLES[post.status];

                return (
                  <Card key={post.id} sx={{ p: 2 }}>
                    <Stack spacing={2}>
                      {/* Cover + Title */}
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          variant="rounded"
                          src={post.coverUrl}
                          sx={{ width: 60, height: 60, flexShrink: 0 }}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            {truncateText(post.title, 50)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                            {truncateText(post.excerpt, 60)}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Kategori & Status */}
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                        <Chip
                          label={categoryStyle.label}
                          size="small"
                          sx={{
                            backgroundColor: categoryStyle.bg,
                            color: categoryStyle.color,
                            fontWeight: 600,
                          }}
                        />
                        <Chip
                          label={statusStyle.label}
                          size="small"
                          sx={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                            fontWeight: 600,
                          }}
                        />
                      </Stack>

                      {/* Date & Actions */}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid', borderColor: 'divider', pt: 1.5 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', flex: 1 }}>
                          {post.publishedAt.toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Typography>
                        <Stack direction="row" spacing={0.5}>
                          <IconButton
                            size="small"
                            component={RouterLink}
                            href={`/dashboard/posts/${post.id}/edit`}
                            title="Edit"
                          >
                            <Iconify icon="eva:edit-fill" width={18} height={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            title="Hapus"
                            onClick={() => handleOpenDeleteDialog(post.id)}
                          >
                            <Iconify
                              icon="eva:trash-2-fill"
                              width={18}
                              height={18}
                              sx={{ color: 'error.main' }}
                            />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Card>
                );
              })}

              {/* Mobile Pagination */}
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                <Pagination
                  count={Math.ceil(filteredArticles.length / rowsPerPage)}
                  page={page + 1}
                  onChange={(e, newPage) => handleChangePage(e, newPage - 1)}
                  color="primary"
                />
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
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                Tidak ada artikel ditemukan
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                Mulai tulis artikel pertama Anda atau ubah filter pencarian
              </Typography>
              <Button
                component={RouterLink}
                href="/dashboard/posts/new"
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{ backgroundColor: '#00A76F' }}
              >
                Tulis Artikel Baru
              </Button>
            </Box>
          )}
        </Stack>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Hapus Artikel?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} variant="outlined">
              Batal
            </Button>
            <Button onClick={handleConfirmDelete} variant="contained" color="error" autoFocus>
              Hapus
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
}
