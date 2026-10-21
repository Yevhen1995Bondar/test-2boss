import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import {
  auth,
  db,
  signInWithGoogle,
  signOutUser,
  handleFirestoreError,
  OperationType
} from '../services/firebase';

interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  dogBreed?: string;
  dogSize?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateDogProfile: (dogBreed: string, dogSize: string) => Promise<void>;
  syncCartToCloud: (items: any[], subtotal: number) => Promise<void>;
  fetchCloudCart: () => Promise<any[] | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            setProfile(snap.data() as UserProfile);
          } else {
            const newProfile: UserProfile = {
              id: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'Milky Boss Fan',
              photoURL: currentUser.photoURL || ''
            };
            await setDoc(userDocRef, {
              ...newProfile,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
            setProfile(newProfile);
          }
        } catch (err) {
          console.warn('Profile sync fallback:', err);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Google Sign-in failed:', err);
    }
  };

  const logout = async () => {
    try {
      await signOutUser();
    } catch (err) {
      console.error('Sign-out failed:', err);
    }
  };

  const updateDogProfile = async (dogBreed: string, dogSize: string) => {
    if (!user) return;
    const path = `users/${user.uid}`;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(
        userDocRef,
        {
          dogBreed,
          dogSize,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );
      setProfile(prev => prev ? { ...prev, dogBreed, dogSize } : null);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const syncCartToCloud = async (items: any[], subtotal: number) => {
    if (!user) return;
    const path = `carts/${user.uid}`;
    try {
      const cartDocRef = doc(db, 'carts', user.uid);
      await setDoc(cartDocRef, {
        userId: user.uid,
        itemsJson: JSON.stringify(items),
        itemsCount: items.reduce((acc, i) => acc + (i.quantity || 1), 0),
        subtotal,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.warn('Cart cloud sync error:', err);
    }
  };

  const fetchCloudCart = async (): Promise<any[] | null> => {
    if (!user) return null;
    const path = `carts/${user.uid}`;
    try {
      const cartDocRef = doc(db, 'carts', user.uid);
      const snap = await getDoc(cartDocRef);
      if (snap.exists()) {
        const data = snap.data();
        if (data.itemsJson) {
          return JSON.parse(data.itemsJson);
        }
      }
    } catch (err) {
      console.warn('Fetch cloud cart error:', err);
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login,
        logout,
        updateDogProfile,
        syncCartToCloud,
        fetchCloudCart
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
