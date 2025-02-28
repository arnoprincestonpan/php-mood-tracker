import './App.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [mood, setMood] = useState('');
  const [moods, setMoods] = useState([]);

  // location of api is in back-end folder
  const backendBaseURL = 'http://localhost:8000/api.php'

  // GET the moods right when App.jsx loads
  useEffect(() => {
    fetchMoods();
  }, []);

  // GET
  const fetchMoods = async() => {
    try {
      const response = await axios.get(backendBaseURL);
      console.log(response.data);
      setMoods(response.data);
    } catch (error){
      console.error('Error fetching moods:', error);
    }
  }

  // POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(
        backendBaseURL, 
        { mood },
        { headers: {'Content-Type' : 'application/json'}}
      );

      if(response.data.success === false){
        alert(response.data.error);
      } else {
        setMood('');
        fetchMoods();
      }
    } catch (error) {
      console.error('Error Submitting Mood', error);
    }
  }

  return (
    <>
      <div className="App">
        <h1>Mood Tracker</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='mood'>
          Your Latest Mood
          <br/>
          <input
            name="mood"
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="Enter your mood."
          />
          </label>
          <button type="submit">
            Submit
          </button>
        </form>
        <ul>
            {
              moods ? moods.map((mood) => (
                <li key={mood.id}>
                    {mood.mood} | {new Date(mood.timestamp * 1000).toLocaleDateString()}
                </li>
              ))
              :
              <li>There are no moods.</li>
            }
        </ul>
      </div>
    </>
  )
}

export default App;
