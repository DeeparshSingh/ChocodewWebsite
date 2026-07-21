'use client';

import dynamic from 'next/dynamic';
import type { BeanFieldProps } from './bean-field';

/**
 * three.js is heavy; the bean field streams in after hydration and never
 * blocks first paint. The hero is fully designed without it.
 */
export const BeanFieldLazy = dynamic<BeanFieldProps>(
  () => import('./bean-field'),
  { ssr: false, loading: () => null }
);
