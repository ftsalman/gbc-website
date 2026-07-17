import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layout/Layout.jsx';
import { HomePage } from '../features/home/page/HomePage.jsx';
import { AboutPage } from '../features/about/page/AboutPage.jsx';
import { BlogsPage } from '../features/blogs/page/BlogsPage.jsx';
import { BusinessSetupPage } from '../features/business-setup/page/BusinessSetupPage.jsx';
import { ContactPage } from '../features/contact/page/ContactPage.jsx';
import { ServicesPage } from '../features/services/page/ServicesPage.jsx';
import { ErrorPage } from '../pages/ErrorPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'blogs',
        element: <BlogsPage />,
      },
      {
        path: 'business-setup',
        element: <BusinessSetupPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
    ],
  },
]);