'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';
import { Editor } from 'src/components/editor';
import { toast } from 'src/components/snackbar';

// -----------------------------------------------

const CATEGORY_OPTIONS = [
  { value: 'berita', label: 'Berita' },
  { value: 'artikel', label: 'Artikel' },
  { value: 'pengumuman', label: 'Pengumuman' },
];

// -----------------------------------------------

/**
 * Article Creation/Editing Form for HSI Dashboard
 * Supports: metadata (title, category, tags, cover), rich text editing, preview
 */
export function PostNewEditForm({ currentPost }) {
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState(currentPost?.title || '');
  const [category, setCategory] = useState(currentPost?.category || 'berita');
  const [tags, setTags] = useState(currentPost?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [coverUrl, setCoverUrl] = useState(currentPost?.coverUrl || null);
  const [coverPreview, setCoverPreview] = useState(currentPost?.coverUrl || null);
  const [status, setStatus] = useState(currentPost?.status || 'draft');
  const [content, setContent] = useState(currentPost?.content || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  // -----------------------------------------------
  // HANDLE COVER IMAGE UPLOAD
  // -----------------------------------------------

  const handleCoverDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      setCoverUrl(objectUrl);
      setCoverPreview(objectUrl);
    }
  }, []);

  const handleCoverClick = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      setCoverUrl(objectUrl);
      setCoverPreview(objectUrl);
    }
  }, []);

  const handleRemoveCover = useCallback(() => {
    setCoverUrl(null);
    setCoverPreview(null);
  }, []);

  // -----------------------------------------------
  // HANDLE TAGS
  // -----------------------------------------------

  const handleAddTag = useCallback(() => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  }, [tagInput, tags]);

  const handleRemoveTag = useCallback((tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  }, [tags]);

  const handleKeyPressTag = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  }, [handleAddTag]);

  // -----------------------------------------------
  // HANDLE SAVE & PUBLISH
  // -----------------------------------------------

  const handleSaveDraft = useCallback(async () => {
    if (!title.trim() || !content.trim()) {
      toast.warning('Judul dan konten harus diisi');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate save
      await new Promise((resolve) => setTimeout(resolve, 800));

      const articleData = {
        id: currentPost?.id || `post-${Date.now()}`,
        title,
        category,
        tags,
        coverUrl,
        status: 'draft',
        content,
        publishedAt: currentPost?.publishedAt || new Date(),
        createdAt: currentPost?.createdAt || new Date(),
      };

      console.log('Draft saved:', articleData);
      toast.success('Artikel disimpan sebagai draft');
      router.push('/dashboard/posts');
    } catch (error) {
      console.error(error);
      toast.error('Gagal menyimpan draft');
    } finally {
      setIsSubmitting(false);
    }
  }, [title, content, category, tags, coverUrl, currentPost, router]);

  const handlePublish = useCallback(async () => {
    if (!title.trim() || !content.trim()) {
      toast.warning('Judul dan konten harus diisi');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate publish
      await new Promise((resolve) => setTimeout(resolve, 800));

      const articleData = {
        id: currentPost?.id || `post-${Date.now()}`,
        title,
        category,
        tags,
        coverUrl,
        status: 'published',
        content,
        publishedAt: new Date(),
        createdAt: currentPost?.createdAt || new Date(),
      };

      console.log('Article published:', articleData);
      toast.success('Artikel dipublikasikan');
      router.push('/dashboard/posts');
    } catch (error) {
      console.error(error);
      toast.error('Gagal mempublikasikan artikel');
    } finally {
      setIsSubmitting(false);
    }
  }, [title, content, category, tags, coverUrl, currentPost, router]);

  // -----------------------------------------------
  // RENDER
  // -----------------------------------------------

  return (
    <>
      <Box sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* LEFT SIDEBAR - METADATA */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* TITLE */}
              <Card sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Judul Artikel
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Masukkan judul artikel di sini..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    inputProps={{ style: { fontSize: 16, fontWeight: 600 } }}
                    sx={{ '& .MuiOutlinedInput-root': { p: 2 } }}
                  />
                </Stack>
              </Card>

              {/* CATEGORY */}
              <Card sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Kategori
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    size="small"
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Card>

              {/* TAGS */}
              <Card sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Tags
                  </Typography>
                  <Stack spacing={1.5}>
                    <TextField
                      size="small"
                      placeholder="Tambahkan tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleKeyPressTag}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <IconButton size="small" onClick={handleAddTag} edge="end">
                              <Iconify icon="eva:plus-fill" />
                            </IconButton>
                          ),
                        },
                      }}
                    />
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      {tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          onDelete={() => handleRemoveTag(tag)}
                          color="primary"
                          variant="filled"
                          size="small"
                        />
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Card>

              {/* COVER IMAGE */}
              <Card sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Cover Image
                  </Typography>

                  {coverPreview ? (
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          position: 'relative',
                          borderRadius: 1,
                          overflow: 'hidden',
                          backgroundColor: '#f0f0f0',
                          aspectRatio: '16 / 9',
                        }}
                      >
                        <Avatar
                          src={coverPreview}
                          variant="rounded"
                          sx={{ width: '100%', height: '100%', borderRadius: 1 }}
                        />
                        <IconButton
                          onClick={handleRemoveCover}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                          }}
                        >
                          <Iconify icon="eva:trash-2-fill" />
                        </IconButton>
                      </Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Klik icon sampah untuk mengganti cover
                      </Typography>
                    </Stack>
                  ) : (
                    <Box
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleCoverDrop}
                      sx={{
                        border: '2px dashed #ddd',
                        borderRadius: 1,
                        p: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#00A76F',
                          backgroundColor: 'rgba(0, 167, 111, 0.05)',
                        },
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverClick}
                        style={{ display: 'none' }}
                        id="cover-input"
                      />
                      <label htmlFor="cover-input" style={{ cursor: 'pointer', display: 'block' }}>
                        <Iconify
                          icon="eva:cloud-upload-fill"
                          width={48}
                          height={48}
                          sx={{ color: 'primary.main', mb: 1 }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Drag & drop atau klik untuk upload
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Format: JPG, PNG (Max 5MB)
                        </Typography>
                      </label>
                    </Box>
                  )}
                </Stack>
              </Card>

              {/* STATUS & ACTIONS */}
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      Status
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">Draft</Typography>
                      <Switch
                        checked={status === 'published'}
                        onChange={(e) => setStatus(e.target.checked ? 'published' : 'draft')}
                      />
                      <Typography variant="body2">Publish</Typography>
                    </Box>
                  </Box>

                  <Divider />

                  <Stack direction="row" spacing={2}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleSaveDraft}
                      disabled={isSubmitting}
                      startIcon={<Iconify icon="eva:save-fill" />}
                    >
                      Simpan Draft
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handlePublish}
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      sx={{ backgroundColor: '#00A76F' }}
                      startIcon={<Iconify icon="eva:checkmark-circle-fill" />}
                    >
                      Publish
                    </Button>
                  </Stack>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setPreviewOpen(true)}
                    startIcon={<Iconify icon="eva:eye-fill" />}
                  >
                    Preview
                  </Button>
                </Stack>
              </Card>
            </Stack>
          </Grid>

          {/* RIGHT SIDE - EDITOR */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Konten Artikel
                </Typography>
                <Editor
                  value={content}
                  onChange={setContent}
                  sx={{
                    '& .ProseMirror': {
                      minHeight: 500,
                      p: 2,
                      border: '1px solid #ddd',
                      borderRadius: 1,
                    },
                  }}
                />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* PREVIEW DIALOG */}
      <Dialog fullScreen open={previewOpen} onClose={() => setPreviewOpen(false)}>
        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #ddd',
            }}
          >
            <Typography variant="h6">Preview Artikel</Typography>
            <IconButton onClick={() => setPreviewOpen(false)}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Box>

          <Box sx={{ maxWidth: 900, mx: 'auto', py: 4, px: 2 }}>
            {/* Cover Image */}
            {coverPreview && (
              <Box
                sx={{
                  mb: 4,
                  borderRadius: 1,
                  overflow: 'hidden',
                  backgroundColor: '#f0f0f0',
                }}
              >
                <Avatar
                  src={coverPreview}
                  variant="rounded"
                  sx={{
                    width: '100%',
                    height: { xs: 250, sm: 350, md: 450 },
                    borderRadius: 0,
                  }}
                />
              </Box>
            )}

            {/* Article Header */}
            <Box sx={{ mb: 3 }}>
              <Chip
                label={category.charAt(0).toUpperCase() + category.slice(1)}
                size="small"
                sx={{ mb: 2 }}
                color="primary"
              />
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                {title || 'Judul artikel belum diisi'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  📅 {new Date().toLocaleDateString('id-ID')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  ⏱️ {Math.ceil((content?.split(/\s+/).length || 0) / 200)} menit baca
                </Typography>
              </Box>
            </Box>

            {/* Content */}
            <Box
              sx={{
                '& h1, & h2, & h3, & h4, & h5, & h6': { my: 2, fontWeight: 700 },
                '& p': { my: 1.5, lineHeight: 1.8 },
                '& ul, & ol': { pl: 3, my: 2 },
                '& li': { my: 1 },
                '& a': { color: '#00A76F', textDecoration: 'none' },
                '& img': { maxWidth: '100%', borderRadius: 1, my: 2 },
                '& blockquote': {
                  borderLeft: '4px solid #00A76F',
                  pl: 2,
                  py: 1,
                  my: 2,
                  fontStyle: 'italic',
                  backgroundColor: '#f5f5f5',
                },
              }}
              dangerouslySetInnerHTML={{ __html: content || '<p>Konten masih kosong</p>' }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #ddd' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                  Tags
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {tags.map((tag) => (
                    <Chip key={tag} label={`#${tag}`} variant="outlined" size="small" />
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
