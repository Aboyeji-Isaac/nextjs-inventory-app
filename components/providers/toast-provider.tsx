"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#000',
          color: '#fff',
          border: '1px solid #27272a',
          borderRadius: '0.5rem',
        },
        success: {
          iconTheme: {
            primary: '#22c55e',
            secondary: '#000',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#000',
          },
        },
      }}
    />
  );
}