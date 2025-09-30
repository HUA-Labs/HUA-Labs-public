import React from 'react';
import { FaComment } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

export default function GuestHome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 p-8 rounded-xl shadow-lg bg-white/95 border">
        {React.createElement(FaComment as any, { size: 48, className: "text-yellow-400 mb-2" })}
        <h1 className="text-2xl font-bold text-gray-900">숨챗에 오신 것을 환영합니다!</h1>
        <p className="text-gray-600 text-center max-w-xs">
          숨챗은 AI와 함께하는 감응형 대화 서비스입니다.<br />
          로그인을 하시면 대화, 세션 저장 등 모든 기능을 이용하실 수 있습니다.
        </p>
        <button
          onClick={() => signIn('kakao', { callbackUrl: '/' })}
          className="mt-2 px-6 py-2 rounded-lg bg-yellow-300 hover:bg-yellow-400 text-black font-semibold shadow-md transition"
        >
          카카오로 로그인
        </button>
      </div>
    </div>
  );
} 