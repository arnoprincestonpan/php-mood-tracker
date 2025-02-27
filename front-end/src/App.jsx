import './App.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [mood, setMood] = useState('');
  const [moods, setMoods] = useState([]);

  // location of api is in back-end folder
  const backendBaseURL = 'http://localhost:8000/back-end/api.php'

  // GET the moods right when App.jsx loads
  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async() => {
    try {
      const response = await axios.get(backendBaseURL);
      setMoods(response.date);
    } catch (error){
      console.error('Error fetching moods:', error);
    }
  }

  return (
    <>
      <h1>Mood Tracker</h1>
    </>
  )
}

export default App
