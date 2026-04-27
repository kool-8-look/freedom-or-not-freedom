import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { routes } from './routes.jsx';

const AppRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentRoute = routes.find(item => item.path === location.pathname);
    document.title = currentRoute?.title || '我想睡觉的网站';
  }, [location.pathname]);

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
        >
          {route.children && route.children.map((child, childIndex) => (
            <Route
              key={childIndex}
              path={child.path}
              element={child.element}
            />
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default AppRouter;