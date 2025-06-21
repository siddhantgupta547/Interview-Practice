import { createBrowserRouter, RouterProvider } from 'react-router';

import './App.css';
import Home from './components/Home';

let router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
