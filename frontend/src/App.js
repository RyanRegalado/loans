import { useEffect, useState }  from "react";
import { supabase } from './supabaseClient';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

function App() {
  console.log('App component rendered')
  
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        }
      } else {
        setUserID(session.user.id);
        setLoading(false)
      }
    };

    getOrCreateAnonUser();
  }, []);

  if (loading) {
    console.log('Loading user session...');
  }

  if (loading) return <div>Loading...</div>;
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home userID={userID} />} /> 
        <Route path="/Analysis" element={<Analysis userID={userID} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
