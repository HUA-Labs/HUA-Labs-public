'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import StartChat from '@/components/StartChat';

export default function Home() {
  return <StartChat />;
}
