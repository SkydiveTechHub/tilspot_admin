import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ProfAccount from 'pages/my-account/prof-account/index';

// render - dashboard
const MyPages = Loadable(lazy(() => import('pages/dashboard/Pages/MyPages/index')));
const CreatePage = Loadable(lazy(() => import('pages/dashboard/Pages/MyPages/CreatePage')));
const EditPage = Loadable(lazy(() => import('pages/dashboard/Pages/MyPages/EditPage')));
const AdminTemplates = Loadable(lazy(() => import('pages/dashboard/Pages/AdminTemplates/index')));
const AdminThemes = Loadable(lazy(() => import('pages/dashboard/Pages/AdminThemes/index')));
const AdminDesigns = Loadable(lazy(() => import('pages/dashboard/Pages/AdminDesigns/index')));
const DemoTemplates = Loadable(lazy(() => import('pages/dashboard/Pages/DemoTemplates/index')));
// const BlogLanding = Loadable(lazy(() => import('pages/blogSite/BlogLanding')));
const BusinessCategory = Loadable(lazy(() => import('pages/dashboard/Categories/BusinessCategory/index')));
const BlogCategory = Loadable(lazy(() => import('pages/dashboard/Categories/BlogCategory/index')));
const UploadBlog = Loadable(lazy(() => import('../components/categoryForm/index')));
const PageStructure = Loadable(lazy(() => import('pages/dashboard/Categories/PageStructure/index')));
const PortalStructure = Loadable(lazy(() => import('pages/dashboard/Categories/PortalStructure/index')));
const Created = Loadable(lazy(() => import('pages/dashboard/Forms/created/index')));
const Shared = Loadable(lazy(() => import('pages/dashboard/Forms/shared/index')));
const ReportList = Loadable(lazy(() => import('pages/dashboard/Reports/report-list/index')));
const UploadArticle = Loadable(lazy(() => import('pages/dashboard/Blog/UploadArticle/index')));
const VendorPages = Loadable(lazy(() => import('pages/dashboard/ListingAdmin/VendorPage/index')));
const ImportVendorList = Loadable(lazy(() => import('pages/dashboard/ListingAdmin/ImportVendorsList/index')));
const MyVendor = Loadable(lazy(() => import('pages/dashboard/ListingDept/MyVendor/index')));
const MyVendorSupervisor = Loadable(lazy(() => import('pages/dashboard/ListingDept/MyVendorSupervisor/index')));
const ImportVendor = Loadable(lazy(() => import('pages/dashboard/ListingAdmin/ImportVendor/index')));
const NewVendor = Loadable(lazy(() => import('pages/dashboard/ListingDept/NewVendor/index')));
const ArticleList = Loadable(lazy(() => import('pages/dashboard/Blog/ArticleList/index')));
const ApproveArticle = Loadable(lazy(() => import('pages/dashboard/Blog/ApproveArticle/index')));
const RolesAndPermission = Loadable(lazy(() => import('pages/dashboard/Role-Permission/RolesAndPermission/index')));
const CreateRole = Loadable(lazy(() => import('pages/dashboard/Role-Permission/CreateRole/index')));
const EditRole = Loadable(lazy(() => import('pages/dashboard/Role-Permission/EditRole/index')));
const Profile = Loadable(lazy(() => import('pages/my-account/overview/index')));
const ViewDetails = Loadable(lazy(() => import('pages/dashboard/ListingAdmin/VendorPage/TableDetails')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,

  children: [
    {
      path: 'dashboard'
      // element: <MyPages />
    },
    {
      path: '/vendor/pages/view-details',
      element: <ViewDetails />
    },
    {
      path: 'pages',
      children: [
        {
          path: 'my-pages',
          element: <MyPages />
        },
        {
          path: 'create-page',
          element: <CreatePage />
        },
        {
          path: 'edit-page',
          element: <EditPage />
        },
        {
          path: 'admin-templates',
          element: <AdminTemplates />
        },
        {
          path: 'admin-themes',
          element: <AdminThemes />
        },
        {
          path: 'admin-design',
          element: <AdminDesigns />
        },
        {
          path: 'demo-template',
          element: <DemoTemplates />
        },
        {
          path: 'business-category',
          element: <BusinessCategory />
        }

        /*     {
          path: 'create-form',
          element: <CreatePage />
        } */
      ]
    },
    {
      path: 'category',
      children: [
        {
          path: 'business-category',
          element: <BusinessCategory />
        },
        {
          path: 'blog-category',
          element: <BlogCategory />
        },
        {
          path: 'page-structure',
          element: <PageStructure />
        },
        {
          path: 'portal-structure',
          element: <PortalStructure />
        },
        {
          path: 'blog-category',
          children: [
            {
              path: 'category-form',
              element: <UploadBlog />
            }
          ]
        },
        {
          path: 'business-category',
          children: [
            {
              path: 'category-form',
              element: <UploadBlog />
            }
          ]
        },
        {
          path: 'page-structure',
          children: [
            {
              path: 'category-form',
              element: <UploadBlog />
            }
          ]
        },
        {
          path: 'portal-structure',
          children: [
            {
              path: 'category-form',
              element: <UploadBlog />
            }
          ]
        }
      ]
    },

    {
      path: 'form',
      children: [
        {
          path: 'created',
          element: <Created />
        },
        {
          path: 'shared',
          element: <Shared />
        }
      ]
    },
    {
      path: 'report',
      children: [
        {
          path: 'report-list',
          element: <ReportList />
        }
      ]
    },
    {
      path: 'blog',
      children: [
        {
          path: 'upload-article',
          element: <UploadArticle />
        },
        {
          path: 'article-list',
          element: <ArticleList />
        },
        {
          path: 'approve-article',
          element: <ApproveArticle />
        }
      ]
    },
    {
      path: 'vendor',
      children: [
        {
          path: 'pages',
          element: <VendorPages />
        },

        {
          path: 'imported-list',
          element: <ImportVendorList />
        },
        {
          path: 'my-vendor',
          element: <MyVendorSupervisor />
        },
        {
          path: 'my-vendor-list',
          element: <MyVendor />
        },
        {
          path: 'import-vendor',
          element: <ImportVendor />
        },
        {
          path: 'new-vendor',
          element: <NewVendor />
        }
      ]
    },
    {
      path: 'roles',

      children: [
        {
          path: '',
          element: <RolesAndPermission />
        },
        {
          path: '/roles/create',
          element: <CreateRole />
        },
        {
          path: '/roles/edit/:id',
          element: <EditRole />
        }
      ]
    },

    {
      path: 'profile',

      children: [
        {
          path: '/profile/overview',
          element: <Profile />
        },
        {
          path: '/profile/professional-account',
          element: <ProfAccount />
        }
      ]
    }
  ]
};

export default MainRoutes;
