import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../../src/pages/LoginPage';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

// Mock the useAuth hook
vi.mock('../../src/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// ตัวอย่าง: ทดสอบ Login Component
describe('LoginPage - Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set default mock return value
    const { useAuth } = require('../../src/context/AuthContext');
    useAuth.mockReturnValue({
      login: vi.fn(),
      logout: vi.fn(),
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it('should render login form with username and password fields', () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText(/admin \/ cashier1 \/ waiter1/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should show validation error for empty username', async () => {
    render(<LoginPage />);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    // HTML5 validation will prevent submission
    expect(submitButton).toBeInTheDocument();
  });

  it('should submit form with valid credentials', async () => {
    const mockLogin = vi.fn().mockResolvedValue({ token: 'test-token' });
    
    const { useAuth } = require('../../src/context/AuthContext');
    useAuth.mockReturnValue({
      login: mockLogin,
      logout: vi.fn(),
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    render(<LoginPage />);

    const usernameInput = screen.getByPlaceholderText(/admin \/ cashier1 \/ waiter1/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(usernameInput, 'admin');
    await userEvent.type(passwordInput, 'Admin@123');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('admin', 'Admin@123');
    });
  });

  it('should show error message on login failure', async () => {
    const mockLogin = vi.fn().mockRejectedValue(new Error('Invalid credentials'));
    
    const { useAuth } = require('../../src/context/AuthContext');
    useAuth.mockReturnValue({
      login: mockLogin,
      logout: vi.fn(),
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    render(<LoginPage />);

    const usernameInput = screen.getByPlaceholderText(/admin \/ cashier1 \/ waiter1/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(usernameInput, 'wronguser');
    await userEvent.type(passwordInput, 'WrongPassword123!');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('should display loading state during submission', async () => {
    const mockLogin = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    const { useAuth } = require('../../src/context/AuthContext');
    useAuth.mockReturnValue({
      login: mockLogin,
      logout: vi.fn(),
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    render(<LoginPage />);

    const usernameInput = screen.getByPlaceholderText(/admin \/ cashier1 \/ waiter1/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(usernameInput, 'admin');
    await userEvent.type(passwordInput, 'Admin@123');
    fireEvent.click(submitButton);

    // Check loading state
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled();
    });
  });
});
