import React, { useState, useEffect } from 'react'; // Import useEffect
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [inputs, setInputs] = useState({ source: '', dest: '', date: '' });
  const [trains, setTrains] = useState([]);
  const navigate = useNavigate();

  // 1. Define a reusable fetch function
  const fetchTrains = async (searchParams = {}) => {
    try {
      const res = await axios.get('http://localhost:5000/api/trains', { params: searchParams });
      setTrains(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching trains.");
    }
  };

  // 2. Load ALL trains on page load (Component Mount)
  useEffect(() => {
    fetchTrains(); // Calls API with empty params to get default list
  }, []);

  // 3. Handle specific search
  const handleSearch = async (e) => {
    e.preventDefault();
    fetchTrains(inputs); // Calls API with user inputs
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 pb-10">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Find Your Train</h2>
        <form onSubmit={handleSearch} className="flex gap-4 flex-wrap">
          <input type="text" placeholder="From Station" className="border p-2 rounded flex-1" 
             onChange={e => setInputs({...inputs, source: e.target.value})} />
          <input type="text" placeholder="To Station" className="border p-2 rounded flex-1" 
             onChange={e => setInputs({...inputs, dest: e.target.value})} />
          <input type="date" className="border p-2 rounded" 
             onChange={e => setInputs({...inputs, date: e.target.value})} />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Search</button>
        </form>
      </div>

      <div className="mt-8 space-y-4">
        {trains.length === 0 ? (
           <p className="text-center text-gray-500">No trains available.</p>
        ) : (
           trains.map((train) => (
            <div key={train.Status_ID} className="bg-white p-4 rounded shadow flex justify-between items-center border-l-4 border-blue-500">
                <div>
                <h3 className="text-xl font-bold">{train.Train_Name}</h3>
                <p className="text-gray-600">Date: {new Date(train.Journey_Date).toDateString()}</p>
                <p className="text-gray-600">From: {train.Source_Station} To: {train.Dest_Station}</p>
                </div>
                <div className="text-right space-y-2">
                <div className="text-sm">
                    <span className="font-semibold">AC:</span> Rs{train.Fare_AC} ({train.AC_Seats_Available} Seats)
                    <button onClick={() => navigate(`/book/${train.Status_ID}`, {state: {train, type:'AC'}})} 
                        className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">Book AC</button>
                </div>
                <div className="text-sm">
                    <span className="font-semibold">Gen:</span> Rs{train.Fare_Gen} ({train.Gen_Seats_Available} Seats)
                    <button onClick={() => navigate(`/book/${train.Status_ID}`, {state: {train, type:'General'}})} 
                        className="ml-2 text-xs bg-orange-500 text-white px-2 py-1 rounded">Book Gen</button>
                </div>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Home;