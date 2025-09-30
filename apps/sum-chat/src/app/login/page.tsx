'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaComment } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    signIn('kakao', { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-background rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            서비스를 이용하기 위해 로그인해주세요
          </p>
        </div>
        <div className="mt-8 space-y-4">
          {/*
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FaGoogle className="mr-2" />
            Google로 로그인
          </button>
          */}
          <button
            onClick={handleKakaoLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 shadow-md transition"
          >
            <FaComment className="mr-2" />
            카카오로 로그인
          </button>
        </div>
      </div>
    </div>
  );
} 