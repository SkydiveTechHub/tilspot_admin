import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login

const BlogLanding = Loadable(lazy(() => import('pages/MultiSiteApplication/Vendors/BlogLanding')));
const VendorSiteLanding = Loadable(lazy(() => import('pages/MultiSiteApplication/Vendors/Vendors')));
const VendorGalleryA = Loadable(lazy(() => import('pages/MultiSiteApplication/Vendors/GalleryA')));
const VendorGalleryB = Loadable(lazy(() => import('pages/MultiSiteApplication/Vendors/GalleryB')));
const EditModeVendor = Loadable(lazy(() => import('pages/MultiSiteApplication/Vendors/EditModeVendor')));
const TemplateEditMode = Loadable(lazy(() => import('pages/MultiSiteApplication/Vendors/TemplateEditMode')));
const EditVendorTheme = Loadable(lazy(() => import('pages/MultiSiteApplication/Vendors/EditVendorTheme')));
// Blog Vendor Site
const BlogVendorApplication = Loadable(lazy(() => import('pages/MultiSiteApplication/Blogs/BlogMultisite')));
const BlogVendorHome = Loadable(lazy(() => import('pages/MultiSiteApplication/Blogs/BlogHome')));
const ArticlePage = Loadable(lazy(() => import('pages/MultiSiteApplication/Blogs/article-page/index')));

// ==============================|| AUTH ROUTING ||============================== //

const SiteRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'article-blog',
      element: <BlogLanding />
    },
    {
      path: 'vendor-site',
      element: <VendorSiteLanding />
    },
    {
      path: 'vendor-gallery-one',
      element: <VendorGalleryA />
    },
    {
      path: 'vendor-gallery-two',
      element: <VendorGalleryB />
    },
    {
      path: 'edit-mode-vendor',
      element: <EditModeVendor />
    },
    {
      path: 'edit-vendor-theme',
      element: <EditVendorTheme />
    },
    {
      path: 'template-edit-mode',
      element: <TemplateEditMode />
    },
    {
      path: 'blog-vendor-multisite',
      element: <BlogVendorApplication />
    },
    {
      path: 'blog-vendor-home',
      element: <BlogVendorHome />
    },
    {
      path: 'ideas',
      children: [
        {
          path: 'article-page/:slug',
          element: <ArticlePage />
        }
      ]
    }
  ]
};

export default SiteRoutes;
