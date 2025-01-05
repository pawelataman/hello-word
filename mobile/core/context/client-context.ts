import { createContext } from 'react';
import { HttpClient } from '@/core/api/http-client';

export const HttpClientContext = createContext<HttpClient | null>(null);