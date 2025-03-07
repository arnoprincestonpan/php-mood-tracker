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

  // DELETE
  const handleDeleteSubmit = async(moodId) => {
    try {
      const response = await axios.delete(`${backendBaseURL}?id=${moodId}`);
      fetchMoods();
    } catch (error){
      console.error('Error deleting mood:', error);
      alert('Failed to delete mood.');
    }
  }

  return (
    <>
      <div className="container mt-4">
        <h1 className='mb-4'>Mood Tracker</h1>
        <form className='mb-3' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label' htmlFor='mood'>
            Your Latest Mood
            <br/>
            <input
              className='form-control'
              name="mood"
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="Enter your mood."
            />
            </label>
          </div>
          <button className='btn btn-primary' type="submit">
            Submit
          </button>
        </form>
        <ul className='list-group'>
            {
              moods ? moods.map((mood) => (
                <div>
                  <li className="list-group-item" key={mood.id}>
                  {mood.mood} | {new Date(mood.timestamp * 1000).toLocaleDateString()}
                  </li>
                  <button onClick={() => handleDeleteSubmit(mood.id)}>Delete</button>
                </div>
              ))
              :
              <li className='list-group-item'>There are no moods.</li>
            }
        </ul>
      </div>
    </>
  )
}

export default App;
