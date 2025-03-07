import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes.jsx';

const Router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <RouterProvider router={Router} />
   </StrictMode>,
);
