import { RouterProvider } from 'react-router';
import { router } from './routes';
import { RoleProvider } from './contexts/RoleContext';

function App() {
  return (
    <RoleProvider>
      <RouterProvider router={router} />
    </RoleProvider>
  );
}

export default App;