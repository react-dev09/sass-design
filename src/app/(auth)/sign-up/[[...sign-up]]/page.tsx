'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader, Mail, Check } from 'lucide-react';
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

const inputStyle: React.CSSProperties = {
  background: 'rgba(30, 30, 35, 0.8)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  width: '100%',
  paddingLeft: '2.5rem',
  paddingRight: '1rem',
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

const demoBoxStyle: React.CSSProperties = {
  background: 'rgba(16, 185, 129, 0.08)',
  border: '1px solid rgba(16, 185, 129, 0.3)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  borderRadius: '0.75rem',
  padding: '1rem',
  marginTop: '1.5rem',
  position: 'relative',
};

const demoBoxGlowStyle: React.CSSProperties = {
  position: 'absolute',
  inset: -1,
  borderRadius: '0.75rem',
  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1), transparent 80%)',
  pointerEvents: 'none',
  zIndex: -1,
};

const demoContentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.75rem',
};

const demoIconStyle: React.CSSProperties = {
  width: '1rem',
  height: '1rem',
  color: 'rgb(52, 211, 153)',
  flexShrink: 0,
  marginTop: '0.125rem',
};

const demoTextStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: 'rgb(110, 231, 183)',
  fontWeight: 500,
};

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to sign up');
      }

      router.push('/dashboard');
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
        button:hover:not(:disabled) {
          transform: translateY(-4px);
          background: linear-gradient(135deg, #7C3AED 0%, #A855F7 100%) !important;
          box-shadow: 0 0 30px rgba(109, 40, 217, 0.7), 0 0 60px rgba(139, 92, 246, 0.4) !important;
        }
        button:active:not(:disabled) {
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

            <div style={demoBoxStyle}>
              <div style={demoBoxGlowStyle} />
              <div style={demoContentStyle}>
                <Check style={demoIconStyle} />
                <p style={demoTextStyle}>
                  Demo Mode: Enter any email to explore the dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
