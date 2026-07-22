import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layout/Layout.jsx';
import { HomePage } from '../features/home/page/HomePage.jsx';
import { AboutPage } from '../features/about/page/AboutPage.jsx';
import { BlogsPage } from '../features/blogs/page/BlogsPage.jsx';
import { BusinessSetupPage } from '../features/business-setup/page/BusinessSetupPage.jsx';
import { BusinessSetupDetailsPage } from '../features/business-setup/page/BusinessSetupDetailsPage.jsx';
import { ContactPage } from '../features/contact/page/ContactPage.jsx';
import { ServicesPage } from '../features/services/page/ServicesPage.jsx';
import { MainLandPage } from '../features/services/page/MainLandPage.jsx';
import { MainlandDetailsPage } from '../features/services/page/MainlandDetailsPage.jsx';
import { VisaServicesPage } from '../features/services/page/VisaServicesPage.jsx';
import { VisaDetailsPage } from '../features/services/page/VisaDetailsPage.jsx';
import { ProservicePage } from '../features/services/page/ProservicePage.jsx';
import { ProserviceDetailsPage } from '../features/services/page/ProserviceDetailsPage.jsx';
import { BusinessCenterPage } from '../features/services/page/BusinessCenterPage.jsx';
import { BusinessCenterDetailsPage } from '../features/services/page/BusinessCenterDetailsPage.jsx';
import { ErrorPage } from '../pages/ErrorPage.jsx';
import { PackagesPage } from '../features/packages/page/PackagesPage.jsx';

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
        path: 'packages',
        element: <PackagesPage />,
      },
      {
        path: 'business-setup',
        element: <BusinessSetupPage />,
      },
      {
        path: 'business-setup/:id',
        element: <BusinessSetupDetailsPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'services/mainland',
        element: <MainLandPage />,
      },
      {
        path: 'services/mainland/:id',
        element: <MainlandDetailsPage />,
      },
      {
        path: 'services/visa',
        element: <VisaServicesPage />,
      },
      {
        path: 'services/visa/:id',
        element: <VisaDetailsPage />,
      },
      {
        path: 'services/pro-services',
        element: <ProservicePage />,
      },
      {
        path: 'services/pro-services/:id',
        element: <ProserviceDetailsPage />,
      },
      {
        path: 'services/business-center',
        element: <BusinessCenterPage />,
      },
      {
        path: 'services/business-center/:id',
        element: <BusinessCenterDetailsPage />,
      },
    ],
  },
]);