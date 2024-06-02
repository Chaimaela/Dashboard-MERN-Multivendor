import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import store from './store/index';
import { Toaster } from 'react-hot-toast';

const App = lazy(() => import('./App'));

// Call createRoot once with the container element
const root = createRoot(document.getElementById('root'));

// Render the app component within createRoot
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
        <Toaster
          toastOptions={{
            position: 'top-right',
            style: {
              background: '#283046',
              color: 'white'
            },
          }}
        />
      </Suspense>
    </Provider>
  </BrowserRouter>
);
