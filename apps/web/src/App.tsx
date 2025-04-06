import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from './routes';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from './Context/user-context';

function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <AuthProvider>
        <Routers />
      </AuthProvider>
    </Suspense>
  );
}

export default App;