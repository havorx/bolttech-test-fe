import { Toaster } from 'sonner';
import CarListPage from './pages/cars/CarListPage';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <CarListPage />
    </>
  );
}

export default App;
