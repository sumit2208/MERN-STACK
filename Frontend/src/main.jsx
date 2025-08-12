import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { SnackbarProvider  } from 'notistack';


const queryclient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryclient}>
  <StrictMode>
    <BrowserRouter>
    <SnackbarProvider>
      <App />
      </SnackbarProvider>
    </BrowserRouter>
  </StrictMode>
  </QueryClientProvider>
);
