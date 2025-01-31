import { createBrowserRouter } from 'react-router-dom';
import {Game} from './components/game';
import { Levels } from './components/levels';
import { LoginPage } from './components/login';
import { Signup } from './components/signup';
import {ProtectedRoute} from './components/protected';



const gameLoader = async ({ params }) => {
    const { mode, level } = params;
    const token = localStorage.getItem('token');
    const audio = new Audio('/button_click.mp3');

    const playsound = function(){
      audio.play();
    }
  
    try {
      const response = await fetch(`http://localhost:4000/game/${mode}/${level}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        }
    });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return { puzzle: data.puzzle, solved: data.solved, mode, level, playsound };
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return { puzzle: null, solved: null, mode, level };
    }
  };


const router = createBrowserRouter([
    {
        path: '/', 
        element: <Levels />,
      },
    {
        path: '/levels',
        element: <ProtectedRoute>
                    <Levels />
                  </ProtectedRoute>
    },
    {
        path: '/game/:mode/:level',
        element: <ProtectedRoute>
                  <Game />
                </ProtectedRoute>,
        loader: gameLoader
    },
    {
        path:'/login',
        element: <LoginPage />
    },
    {
        path:'/signup',
        element: <Signup/>
    }
]);

export default router;
