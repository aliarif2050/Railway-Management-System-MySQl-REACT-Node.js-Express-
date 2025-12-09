import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);

  // Fetch Bookings
  const fetchBookings = () => {
    if (user?.User_ID) {
      axios.get(`http://localhost:5000/api/my-bookings/${user.User_ID}`)
        .then(res => setBookings(res.data))
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  // Handle Cancellation
  const handleCancel = async (pnr) => {
    if (!window.confirm("Are you sure you want to cancel this ticket? This cannot be undone.")) return;

    try {
      await axios.post('http://localhost:5000/api/cancel', { pnr });
      alert("Ticket Cancelled Successfully");
      fetchBookings(); // Refresh the list to show new status
    } catch (err) {
      console.error(err);
      alert("Error cancelling ticket");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 pb-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Booking History</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((b) => (
            <div key={b.pnr} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">

              {/* Ticket Header */}
              <div className={`p-4 flex justify-between items-center text-white ${b.status === 'Cancelled' ? 'bg-red-500' : 'bg-blue-600'}`}>
                <div>
                  <h3 className="text-xl font-bold">{b.train}</h3>
                  <p className="text-sm opacity-90">
                    {b.source} &rarr; {b.dest} | {new Date(b.date).toDateString()}
                  </p>
                </div>

                {/* NEW: Display Total Fare Here */}
                <div className="text-right">
                  <p className="text-lg font-bold">Total: Rs{b.totalfare}</p>
                  <p className="text-xs opacity-75">PNR: {b.pnr}</p>
                  <span className="bg-white text-black px-2 py-0.5 text-xs font-bold rounded mt-1 inline-block">
                    {b.status}
                  </span>
                </div>
              </div>

              {/* Passenger List */}
              <div className="p-4">
                <table className="w-full text-sm text-left mb-4">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      <th className="p-2">Name</th>
                      <th className="p-2">Age</th>
                      <th className="p-2">Gender</th>
                      <th className="p-2">Class</th>
                    </tr>
                  </thead>
                  <tbody>
                    {b.passengers.map((p, idx) => (
                      <tr key={idx} className="border-b last:border-0">
                        <td className="p-2 font-medium">{p.name}
                          {p.discount > 0 && (
                            <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                              {(p.discount * 100)}% Off
                            </span>
                          )}
                        </td>
                        <td className="p-2">{p.age}</td>
                        <td className="p-2">{p.gender}</td>
                        <td className="p-2 font-semibold">{p.seat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Footer / Actions */}
                <div className="flex justify-between items-center border-t pt-3">
                  <div className="text-xs text-gray-500">
                    Booked on: {new Date(b.bookingTime).toLocaleString()}
                  </div>

                  {/* Cancel Button - Only show if not already cancelled */}
                  {b.status !== 'Cancelled' && (
                    <button
                      onClick={() => handleCancel(b.pnr)}
                      className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm font-bold hover:bg-red-200 border border-red-300 transition"
                    >
                      Cancel Ticket
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;