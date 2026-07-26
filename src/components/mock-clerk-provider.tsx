'use client';

import React from 'react';

interface MockUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface MockSession {
  user: MockUser;
}

interface MockClerkContextValue {
  isSignedIn: boolean;
  user: MockUser | null;
  session: MockSession | null;
  signOut: () => void;
}

const MockClerkContext = React.createContext<MockClerkContextValue>({
  isSignedIn: false,
  user: null,
  session: null,
  signOut: () => {},
});

export function MockClerkProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [user, setUser] = React.useState<MockUser | null>(null);

  const mockUser: MockUser = {
    id: 'mock_user_123',
    email: 'demo@designpulse.ai',
    firstName: 'Demo',
    lastName: 'User',
  };

  return (
    <MockClerkContext.Provider
      value={{
        isSignedIn,
        user: isSignedIn ? mockUser : null,
        session: isSignedIn ? { user: mockUser } : null,
        signOut: () => setIsSignedIn(false),
      }}
    >
      {children}
    </MockClerkContext.Provider>
  );
}

export function useMockClerk() {
  return React.useContext(MockClerkContext);
}
