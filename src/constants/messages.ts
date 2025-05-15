export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'Unauthorized access',
    SESSION_EXPIRED: 'Session expired',
  },
  VIDEO: {
    NOT_FOUND: 'Video not found',
    UPLOAD_FAILED: 'Failed to upload video',
  },
  PAYMENT: {
    FAILED: 'Payment processing failed',
    INVALID_AMOUNT: 'Invalid payment amount',
  },
} as const;

export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Login successful',
    REGISTER_SUCCESS: 'Registration successful',
  },
  VIDEO: {
    UPLOAD_SUCCESS: 'Video uploaded successfully',
  },
  PAYMENT: {
    SUCCESS: 'Payment successful',
  },
} as const;
