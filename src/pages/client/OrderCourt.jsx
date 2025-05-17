import { useState } from 'react';
import { Link } from 'react-router-dom';

function OrderCourt() {
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1);
  
  // Data dummy untuk lapangan
  const courts = [
    { id: 1, name: 'Lapangan 1', type: 'Vinyl', price: 100000 },
    { id: 2, name: 'Lapangan 2', type: 'Rumput Sintetis', price: 120000 },
    { id: 3, name: 'Lapangan 3', type: 'Vinyl', price: 100000 }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Pemesanan berhasil!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Pesan Lapangan</h1>
          <Link to="/client" className="bg-white text-green-600 px-4 py-2 rounded-md font-medium">
            Kembali
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6">Form Pemesanan</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="court">
                Pilih Lapangan
              </label>
              <select
                id="court"
                value={selectedCourt}
                onChange={(e) => setSelectedCourt(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Pilih Lapangan</option>
                {courts.map((court) => (
                  <option key={court.id} value={court.id}>
                    {court.name} - {court.type} - Rp {court.price.toLocaleString()}/jam
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="date">
                Tanggal
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="time">
                Jam Mulai
              </label>
              <input
                type="time"
                id="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="duration">
                Durasi (jam)
              </label>
              <input
                type="number"
                id="duration"
                min="1"
                max="5"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Pesan Sekarang
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default OrderCourt;