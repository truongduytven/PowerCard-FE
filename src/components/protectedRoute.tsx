"use client";

import { useAuthStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from './ui/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken, fetchMe, user } = useAuthStore();
  const [started, setStarted] = useState(true);
  const router = useRouter();
  
  const init = async () => {
    if (accessToken && !user) {
      await fetchMe();
    }
    setStarted(false);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!started && !accessToken) {
      router.replace('/sign-in');
    }
  }, [started, accessToken, router]);

  if (started) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner className="size-8" />
      </div>
    );
  }
  
  if (!accessToken) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
