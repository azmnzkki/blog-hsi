/**
 * Mock Authentication Utility for HSI News Portal
 * Phase A (UI): Uses localStorage to simulate authentication
 * Will be replaced with real Supabase Auth in Phase B
 */

// Mock users for demo
const MOCK_USERS = [
  {
    id: 'user-1',
    name: 'Imam Fauzi',
    email: 'imam@hsi.ac.id',
    role: 'Kepala Sekolah',
    avatarUrl: '/assets/images/avatars/avatar_1.jpg',
  },
  {
    id: 'user-2',
    name: 'Hendra Wijaya',
    email: 'hendra@hsi.ac.id',
    role: 'Wali Kelas',
    avatarUrl: '/assets/images/avatars/avatar_2.jpg',
  },
  {
    id: 'user-3',
    name: 'Siti Nurhaliza',
    email: 'siti@hsi.ac.id',
    role: 'Guru',
    avatarUrl: '/assets/images/avatars/avatar_3.jpg',
  },
];

// Storage key
const AUTH_STORAGE_KEY = 'hsi_mock_auth_user';
const DEFAULT_USER_ID = 'user-1';

/**
 * Get current authenticated user from localStorage
 * If no user is stored, default to first mock user (Imam Fauzi)
 */
export function getMockAuthUser() {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to parse stored auth user:', error);
  }

  // Default to first mock user
  const defaultUser = MOCK_USERS.find((u) => u.id === DEFAULT_USER_ID);
  if (defaultUser) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(defaultUser));
  }
  return defaultUser || null;
}

/**
 * Set mock auth user
 */
export function setMockAuthUser(userId) {
  const user = MOCK_USERS.find((u) => u.id === userId);
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  }
  return null;
}

/**
 * Clear mock auth session
 */
export function clearMockAuthSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

/**
 * Get all available mock users
 */
export function getMockUsers() {
  return MOCK_USERS;
}

/**
 * Check if user is authenticated (mock version)
 */
export function isMockAuthenticateд() {
  const user = getMockAuthUser();
  return !!user;
}

/**
 * Mock login (for demo purposes)
 */
export function mockLogin(email, password) {
  // In mock version, just accept any email
  const user = MOCK_USERS.find((u) => u.email === email);
  if (user) {
    setMockAuthUser(user.id);
    return user;
  }
  return null;
}

/**
 * Mock logout
 */
export function mockLogout() {
  clearMockAuthSession();
}
