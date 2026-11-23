"use client";
import React, { Suspense } from 'react';
import AuthScreen from '../AuthScreen';

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <AuthScreen initialMode="signup" />
    </Suspense>
  );
}
