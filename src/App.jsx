import { RouterProvider } from 'react-router-dom';

// routing
import router from 'routes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import ThemeCustomization from 'themes';
import { UserProvider } from './contexts/UserContext';

// auth provider

// ==============================|| APP ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <UserProvider>
        <NavigationScroll>
          <RouterProvider router={router} />
        </NavigationScroll>
      </UserProvider>
    </ThemeCustomization>
  );
}
