'use client';

import { useState, useMemo } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';

import { POSTS, _postsByCategory } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import { PostCard } from '../post-card';
import { PostGridSkeleton } from '../post-skeleton';

// -----------------------------------------------

const ITEMS_PER_PAGE = 12;

const SORT_OPTIONS = [
  { value: 'latest', label: 'Terbaru' },
  { value: 'oldest', label: 'Terlama' },
  { value: 'popular', label: 'Paling Banyak Dilihat' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'Semua Kategori' },
  { value: 'berita', label: 'Berita' },
  { value: 'artikel', label: 'Artikel' },
  { value: 'pengumuman', label: 'Pengumuman' },
];

// -----------------------------------------------

export function PostListView() {
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading delay when applying filters
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setCurrentPage(1);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 600);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 600);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 600);
  };

  // Filter dan sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = POSTS;

    // Filter by category
    if (category !== 'all') {
      filtered = _postsByCategory(category);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.name.toLowerCase().includes(query)
      );
    }

    // Sort
    let sorted = [...filtered];
    if (sortBy === 'latest') {
      sorted.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else if (sortBy === 'oldest') {
      sorted.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    } else if (sortBy === 'popular') {
      sorted.sort((a, b) => b.totalViews - a.totalViews);
    }

    return sorted;
  }, [category, sortBy, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedPosts = filteredAndSortedPosts.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: 'text.primary',
          }}
        >
          Semua Artikel & Berita
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Temukan artikel dan berita terbaru dari HSI Boarding School
        </Typography>
      </Box>

      {/* Filter Bar */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: '#f9fafb',
          border: '1px solid',
          borderColor: 'divider',
          overflowX: 'auto',
        }}
      >
        <Grid container spacing={2}>
          {/* Search Input */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Cari artikel, judul, atau penulis..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                    <Iconify icon="solar:magnifer-bold-duotone" width={20} sx={{ color: 'text.secondary' }} />
                  </Box>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                },
              }}
            />
          </Grid>

          {/* Category Filter */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Kategori"
              value={category}
              onChange={handleCategoryChange}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                },
              }}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Sort Filter */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Urutkan"
              value={sortBy}
              onChange={handleSortChange}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                },
              }}
            >
              {SORT_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Loading State */}
      {isLoading ? (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Memuat artikel...
            </Typography>
          </Box>
          <PostGridSkeleton count={12} />
        </>
      ) : (
        <>
          {/* Results Count */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Menampilkan{' '}
              <strong>
                {displayedPosts.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, filteredAndSortedPosts.length)}
              </strong>{' '}
              dari <strong>{filteredAndSortedPosts.length}</strong> artikel
            </Typography>
          </Box>

          {/* Posts Grid */}
          {displayedPosts.length > 0 ? (
            <>
              <Grid container spacing={3} sx={{ mb: 6 }}>
                {displayedPosts.map((post) => (
                  <Grid key={post.id} item xs={12} sm={6} md={4}>
                    <PostCard post={post} />
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <Stack sx={{ alignItems: 'center', py: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </Stack>
              )}
            </>
          ) : (
            /* Empty State */
            <Paper
              sx={{
                p: 6,
                textAlign: 'center',
                backgroundColor: '#f9fafb',
                border: '1px dashed',
                borderColor: 'divider',
              }}
            >
              <EmptyContent
                filled={false}
                imgUrl={`${process.env.NEXT_PUBLIC_ASSETS_DIR || '/assets'}/icons/empty/ic-content.svg`}
                title={searchQuery ? `Tidak ada hasil untuk "${searchQuery}"` : 'Belum ada artikel'}
                description={
                  searchQuery
                    ? 'Coba ubah kata kunci pencarian atau filter kategori'
                    : 'Mulai dengan menulis artikel pertama atau ubah filter pencarian'
                }
                action={
                  searchQuery ? null : (
                    <Typography variant="caption" sx={{ color: 'text.secondary', mt: 2, display: 'block' }}>
                      Kembali dan coba kategori atau urutan yang berbeda
                    </Typography>
                  )
                }
                sx={{ py: 4 }}
              />
            </Paper>
          )}
        </>
      )}
    </Container>
  );
}
