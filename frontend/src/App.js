import './App.css';
import img from './images/bg.jpeg'
import { RouterProvider } from 'react-router-dom';
import router from './router';




function App() {
  return (
      <div
          style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'repeat',
              width: '100%',
          }} className='border'
      >
          <RouterProvider router={router} />
      </div>
  );
}
export default App;
