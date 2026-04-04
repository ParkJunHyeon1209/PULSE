import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import MainPage from './pages/MainPage/MainPage';
import CategoryPage from './pages/CategoriesPage/CategoryPage';
import CategoriesPage from './pages/CategoriesPage/components/CategoriesPage';
import DetailPage from './pages/DetailPage/DetailPage';
import BrandPage from './pages/BrandPage/BrandPage';
import LoginPage from './pages/LogInpage/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import CursorTrail from './components/common/CursorTrail';
import ScrollToTop from './components/common/ScrollToTop';
import MyPage from './pages/MyPage/MyPage';
import ScrollToTopButton from './components/common/ScrollToTopButton';

export default function App() {
  return (
    <>
      <CursorTrail />
      <ScrollToTop />
      <ScrollToTopButton />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/brand" element={<BrandPage />} />
          <Route path="/categories/" element={<CategoryPage />} />
          <Route path="/categories/:categoryName" element={<CategoriesPage />} />
          <Route path="/product/:id" element={<DetailPage />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
