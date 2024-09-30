import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage, Navbar, Footer, ProductPage, AdminDashboard,ProductInfo } from './components';

function App(): React.ReactElement {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/products/:id" element={<ProductInfo />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;