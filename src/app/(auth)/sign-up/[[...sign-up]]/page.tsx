'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { PremiumSaaSWaves } from '@/components/premium-saas-waves';

const containerStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: '#0B0B0F',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  overflow: 'hidden',
  position: 'relative',
};

const cardWrapperStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  maxWidth: '28rem',
  zIndex: 10,
};

const premiumCardStyle: React.CSSProperties = {
  animation: 'fadeInUp 0.6s ease-out',
  background: 'rgba(20, 20, 24, 0.82)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  borderRadius: '1rem',
  padding: '2rem',
  position: 'relative',
};

const cardGlowStyle: React.CSSProperties = {
  position: 'absolute',
  inset: -1,
  borderRadius: '1rem',
  background: 'radial-gradient(circle at top left, rgba(139, 92, 246, 0.15), transparent 80%)',
  pointerEvents: 'none',
  zIndex: -1,
};

const headingStyle: React.CSSProperties = {
  fontSize: '1.875rem',
  fontWeight: 'bold',
  color: 'white',
  marginBottom: '0.5rem',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  color: 'rgb(156, 163, 175)',
};

const formStyle: React.CSSProperties = {
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
};

const formGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: 'rgb(209, 213, 219)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const inputWrapperStyle: React.CSSProperties = {
  position: 'relative',
};

const inputIconStyle: React.CSSProperties = {
  position: 'absolute',
  left: '0.75rem',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '1rem',
  height: '1rem',
  color: 'rgb(107, 114, 128)',
  pointerEvents: 'none',
};

const eyeIconStyle: React.CSSProperties = {
  position: 'absolute',
  right: '0.75rem',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '1rem',
  height: '1rem',
  color: 'rgb(107, 114, 128)',
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  padding: 0,
};

const inputStyle: React.CSSProperties = {
  background: 'rgba(30, 30, 35, 0.8)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  width: '100%',
  paddingLeft: '2.5rem',
  paddingRight: '2.5rem',
  paddingTop: '0.75rem',
  paddingBottom: '0.75rem',
  borderRadius: '0.5rem',
  color: 'white',
  outline: 'none',
  fontSize: '1rem',
};

const buttonStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 0 20px rgba(109, 40, 217, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
  width: '100%',
  color: 'white',
  fontWeight: 600,
  paddingTop: '0.75rem',
  paddingBottom: '0.75rem',
  borderRadius: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
};

const errorBoxStyle: React.CSSProperties = {
  padding: '0.75rem',
  borderRadius: '0.5rem',
  background: 'rgba(239, 68, 68, 0.1)',
  border: '1px solid rgba(239, 68, 68, 0.3)',
};

const errorTextStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: 'rgb(248, 113, 113)',
};

const dividerStyle: React.CSSProperties = {
  position: 'relative',
  textAlign: 'center',
  margin: '1.5rem 0',
  fontSize: '0.75rem',
  color: 'rgb(107, 114, 128)',
  fontWeight: 500,
};

const signinTextStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: 'rgb(156, 163, 175)',
  textAlign: 'center',
};

const signinLinkStyle: React.CSSProperties = {
  color: 'rgb(96, 165, 250)',
  fontWeight: 600,
  transition: 'color 250ms ease',
  textDecoration: 'none',
};

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up');
      }

      // Redirect to sign-in after successful registration
      router.push('/sign-in?registered=1');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        input:focus {
          border-color: #8B5CF6 !important;
          background: rgba(30, 30, 35, 0.95) !important;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2), inset 0 0 20px rgba(139, 92, 246, 0.1) !important;
        }
        button[type="submit"]:hover:not(:disabled) {
          transform: translateY(-4px);
          background: linear-gradient(135deg, #7C3AED 0%, #A855F7 100%) !important;
          box-shadow: 0 0 30px rgba(109, 40, 217, 0.7), 0 0 60px rgba(139, 92, 246, 0.4) !important;
        }
        button[type="submit"]:active:not(:disabled) {
          transform: translateY(-2px);
        }
      `}</style>
      <div style={containerStyle}>
        <PremiumSaaSWaves />

        <div style={cardWrapperStyle}>
          <div style={premiumCardStyle}>
            <div style={cardGlowStyle} />

            <div style={{ marginBottom: '2rem' }}>
              <h1 style={headingStyle}>Create Account</h1>
              <p style={subtitleStyle}>
                Sign up to start auditing your website with AI-powered insights.
              </p>
            </div>

            <form onSubmit={handleSignUp} style={formStyle}>
              {/* Email */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>Email Address</label>
                <div style={inputWrapperStyle}>
                  <Mail style={inputIconStyle} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="your@email.com"
                    required
                    disabled={loading}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>Password</label>
                <div style={inputWrapperStyle}>
                  <Lock style={inputIconStyle} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="Min. 6 characters"
                    required
                    disabled={loading}
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={eyeIconStyle}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff style={{ width: '1rem', height: '1rem' }} /> : <Eye style={{ width: '1rem', height: '1rem' }} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>Confirm Password</label>
                <div style={inputWrapperStyle}>
                  <Lock style={inputIconStyle} />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="Re-enter your password"
                    required
                    disabled={loading}
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    style={eyeIconStyle}
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff style={{ width: '1rem', height: '1rem' }} /> : <Eye style={{ width: '1rem', height: '1rem' }} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div style={errorBoxStyle}>
                  <p style={errorTextStyle}>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={buttonStyle}
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div style={dividerStyle}>
              <span style={{ position: 'relative', zIndex: 1, backgroundColor: 'rgba(20, 20, 24, 0.82)', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                OR
              </span>
            </div>

            <p style={signinTextStyle}>
              Already have an account?{' '}
              <Link href="/sign-in" style={signinLinkStyle}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
