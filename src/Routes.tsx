import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import { ProductsPage } from "./pages/ProductsPage";
import App from "./App";
import { ProductPage } from "./pages/ProductPage";
import { ErrorPage } from "./pages/ErrorPage";
import { HomePage } from "./pages/HomePage";
import { ContactPage, contactPageAction } from "./ContactPage";
import { ThankYouPage } from "./ThankYouPage";

// lazily import admin page
const AdminPage = lazy(() => import('./pages/AdminPage'));

const router = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
         {
            path: 'admin',
            element: (
               <Suspense fallback={
                  <div className="text-center p-5 text-xl">
                     Loading...
                  </div>
               }>
                  <AdminPage />
               </Suspense>
            )
         },
         {
            index: true,
            element: <HomePage />
         },
         {
            path: 'products',
            element: <ProductsPage />,
         },
         {
            path: 'products/:id',
            element: <ProductPage />
         },
         {
            path: 'contactUs',
            element: (
               <Suspense fallback={
                  <div className="text-center p-5 text-xl">
                     Loading...
                  </div>
               }>
                  <ContactPage />
               </Suspense>
            ),
            action: contactPageAction,
         },
         {
            path: 'thank-you/:name',
            element: <ThankYouPage />
         }
      ]
   },
]);

export function Routes() {
   return <RouterProvider router={router} />;
}