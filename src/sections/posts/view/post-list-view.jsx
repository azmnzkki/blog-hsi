'use client';

import { useState, useMemo } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { POSTS } from 'src/_mock/_blog';

import { PostCard } from '../post-card';
import { PostGridSkeleton } from '../post-skeleton';

// ----------------------------------------------------------------------

const ITEMS_PER_PAGE = 9;

const TABS = [
  { value: 'all', label: 'Semua' },
  { value: 'berita', label: 'Berita' },
  { value: 'artikel', label: 'Artikel' },
  { value: 'pengumuman', label: 'Pengumuman' },
];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Terbaru' },
  { value: 'oldest', label: 'Terlama' },
  { value: 'popular', label: 'Paling Populer' },
];

// ----------------------------------------------------------------------

export function PostListView() {
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (_, val) => {
    setCategory(val);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };

  const publishedPosts = useMemo(
    () => POSTS.filter((p) => p.status === 'published'),
    []
  );

  const filtered = useMemo(() => {
    let result = category === 'all' ? publishedPosts : publishedPosts.filter((p) => p.category === category);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.author?.name.toLowerCase().includes(q)
      );
    }

    const sorted = [...result];
    if (sortBy === 'latest') sorted.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    else if (sortBy === 'oldest') sorted.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    else if (sortBy === 'popular') sorted.sort((a, b) => (b.totalViews || 0) - (a.totalViews || 0));

    return sorted;
  }, [category, sortBy, search, publishedPosts]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
          Semua Artikel & Berita
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Temukan artikel, berita, dan pengumuman terbaru dari HSI Boarding School
        </Typography>
      </Box>

      {/* Category Tabs */}
      <Tabs
        value={category}
        onChange={handleTabChange}
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        {TABS.map((t) => (
          <Tab key={t.value} value={t.value} label={t.label} />
        ))}
      </Tabs>

      {/* Search & Sort */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Cari artikel atau penulis..."
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="solar:magnifer-bold-duotone" width={18} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" sx={{ minWidth: 180, flexShrink: 0 }}>
          <InputLabel>Urutkan</InputLabel>
          <Select value={sortBy} onChange={handleSortChange} label="Urutkan">
            {SORT_OPTIONS.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Result count */}
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Menampilkan <strong>{filtered.length}</strong> artikel
      </Typography>

      {/* Grid */}
      {loading ? (
        <PostGridSkeleton count={9} />
      ) : paged.length > 0 ? (
        <>
          <Grid container spacing={3} sx={{ mb: 5 }}>
            {paged.map((post) => (
              <Grid key={post.id} item xs={12} sm={6} md={4}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Stack alignItems="center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, v) => {
                  setPage(v);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Stack>
          )}
        </>
      ) : (
        <EmptyContent
          filled
          title={search ? `Tidak ada hasil untuk "${search}"` : 'Belum ada artikel'}
          description={
            search
              ? 'Coba ubah kata kunci pencarian atau pilih kategori lain'
              : 'Belum ada artikel yang dipublikasikan dalam kategori ini'
          }
          sx={{ py: 10 }}
        />
      )}
    </Container>
  );
}
