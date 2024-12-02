import { Outlet } from 'react-router';
import { Header } from '../components/shared/header/Header';
import { Footer } from '../components/shared/Footer';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
