"use client";
import React, { Suspense } from 'react';
import AuthScreen from '../AuthScreen';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <AuthScreen initialMode="signin" />
    </Suspense>
  );
}
