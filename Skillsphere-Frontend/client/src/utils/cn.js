import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Define the `cn` function without type annotations
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}