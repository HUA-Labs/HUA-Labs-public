'use client';

import { signIn } from 'next-auth/react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function LoginModal({ isOpen, onClose, className }: LoginModalProps) {
  const handleLogin = async (provider: string) => {
    try {
      await signIn(provider, { 
        callbackUrl: '/',
        redirect: true 
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[425px] ${className || ''} bg-white dark:bg-[#181818] border-none shadow-2xl`}>
        <DialogTitle className="text-2xl font-bold text-center">
          로그인
        </DialogTitle>
        <div className="flex flex-col items-center gap-4 py-4">
          <p className="text-sm text-muted-foreground">
            서비스를 이용하기 위해 로그인해주세요
          </p>
          <div className="flex flex-col gap-2 w-full">
            {/*
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleLogin('google')}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Google로 계속하기
            </Button>
            */}
            <Button
              variant="outline"
              className="w-full bg-yellow-300 hover:bg-yellow-400 text-black border-none shadow-md transition"
              onClick={() => handleLogin('kakao')}
            >
              <RiKakaoTalkFill className="mr-2 h-5 w-5" />
              Kakao로 계속하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 