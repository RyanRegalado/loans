import { useEffect, useState }  from "react";
import { supabase } from './supabaseClient';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  console.log('App component rendered')
  
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const getOrCreateAnonUser = async () => {
      
      const sessionResult = await supabase.auth.getSession();
      const session = sessionResult.data.session;

      if (!session) {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) {
          console.error('Error signing in anonymously:', error.message);
        } else {
          console.log('Anonymous user created:', data.user.id);
          setUserID(data.user.id);
        }
      } else {
        setUserID(session.user.id);
      }
    };

    getOrCreateAnonUser();
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home userID={userID} />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
