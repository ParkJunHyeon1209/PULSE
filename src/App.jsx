import React from 'react';;
import { Route, Routes } from 'react-router-dom';;
import MainLayout from './components/layout/MainLayout';;
import MainPage from './pages/MainPage/MainPage';;
import CategoryPage from './pages/CategoriesPage/CategoryPage';
import CategoriesPage from './pages/CategoriesPage/components/CategoriesPage';;
import DetailPage from './pages/DetailPage/DetailPage';;
import LoginPage from './pages/LoginPage';;
import NotFoundPage from './pages/NotFoundPage';
import ShoppingCart from './pages/ShoppingCart';;

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/categories/" element={<CategoryPage />} />
          <Route path="/categories/:categoryName" element={<CategoriesPage />} />
          <Route path="/product/:id" element={<DetailPage />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
  );
}
