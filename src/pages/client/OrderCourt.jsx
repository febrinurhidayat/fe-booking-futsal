import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function OrderCourt() {
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [regionCode, setRegionCode] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showWeatherInfo, setShowWeatherInfo] = useState(false);
  const [weatherLoaded, setWeatherLoaded] = useState(false);
  
  // Data dummy untuk lapangan
  const courts = [
    { id: 1, name: 'Lapangan 1', type: 'Vinyl', price: 100000, isOutdoor: false },
    { id: 2, name: 'Lapangan 2', type: 'Rumput Sintetis', price: 120000, isOutdoor: true },
    { id: 3, name: 'Lapangan 3', type: 'Vinyl', price: 100000, isOutdoor: false }
  ];

  // Data dummy untuk kode wilayah (dalam implementasi sebenarnya bisa dari API)
  const regions = [
    { code: '33.02.18.2004', name: 'Desa Karanglewas Kidul' },
    { code: '33.02.27.1003', name: 'Desa Sumampir' },
    { code: '5171', name: 'Kota Denpasar' },
    { code: '3171', name: 'Kota Jakarta Pusat' },
    { code: '3173', name: 'Kota Jakarta Selatan' },
  ];

  // Fungsi untuk mengambil data cuaca dari API BMKG
  const fetchWeatherData = async () => {
    if (!regionCode || !selectedDate) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Untuk keperluan demo, kita akan menggunakan data statis
      // karena API sebenarnya mungkin memerlukan CORS atau kredensial
      
      // Menyimulasikan pemanggilan API dengan data dummy
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi loading
      
      // Data dummy yang sesuai dengan format API BMKG
      const dummyData = {
        success: true,
        data: [
          {
            date: selectedDate.replace(/-/g, ''),
            weather: Math.random() > 0.5 ? 'Cerah' : 'Hujan Ringan',
            temp: Math.floor(Math.random() * 10) + 25, // Random suhu 25-34°C
            humidity: Math.floor(Math.random() * 30) + 60, // Random kelembaban 60-89%
          },
          {
            date: '20250519', // hari berikutnya
            weather: 'Cerah Berawan',
            temp: 28,
            humidity: 75,
          }
        ]
      };
      
      setWeatherData(dummyData);
      setShowWeatherInfo(true);
      setWeatherLoaded(true);
      
      /* 
      // Kode asli untuk memanggil API BMKG
      // Perlu diimplementasikan dengan proxy server untuk mengatasi masalah CORS
      const response = await fetch(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${regionCode}`);
      
      if (!response.ok) {
        throw new Error('Gagal mengambil data cuaca');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setShowWeatherInfo(true);
      */
      
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil data cuaca. Silakan coba lagi nanti.');
      console.error('Error fetching weather data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk mendapatkan informasi cuaca pada tanggal tertentu
  const getWeatherForDate = () => {
    if (!weatherData || !weatherData.data) return null;
    
    // Format tanggal dari input ke format yang sesuai dengan API
    const formattedDate = selectedDate.replace(/-/g, '');
    
    // Cari data cuaca untuk tanggal yang dipilih
    const weatherForDate = weatherData.data.find(item => {
      // Sesuaikan dengan format tanggal dari API
      return item.date === formattedDate;
    });
    
    return weatherForDate;
  };

  // Fungsi untuk menentukan apakah cuaca aman untuk lapangan outdoor
  const isWeatherSafeForOutdoor = () => {
    const weatherInfo = getWeatherForDate();
    if (!weatherInfo) return null;
    
    // Contoh logika sederhana: jika cuaca hujan, tidak aman untuk outdoor
    const unsafeConditions = ['Hujan Ringan', 'Hujan Sedang', 'Hujan Lebat', 'Hujan Petir'];
    return !unsafeConditions.includes(weatherInfo.weather);
  };

  // Reset cuaca info ketika tanggal berubah
  useEffect(() => {
    setShowWeatherInfo(false);
    setWeatherLoaded(false);
  }, [selectedDate, regionCode]);

  const selectedCourtData = courts.find(court => court.id === parseInt(selectedCourt));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Jika lapangan outdoor dan cuaca tidak aman, confirm dulu
    if (selectedCourtData && selectedCourtData.isOutdoor && isWeatherSafeForOutdoor() === false) {
      const confirm = window.confirm('Perhatian: Cuaca mungkin tidak mendukung untuk lapangan outdoor. Tetap lanjutkan pemesanan?');
      if (!confirm) return;
    }
    
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
                    {court.isOutdoor ? ' (Outdoor)' : ' (Indoor)'}
                  </option>
                ))}
              </select>
              {selectedCourtData && selectedCourtData.isOutdoor && (
                <p className="mt-1 text-sm text-amber-600">
                  Lapangan ini berada di luar ruangan. Periksa cuaca sebelum memesan.
                </p>
              )}
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

            {selectedCourtData && selectedCourtData.isOutdoor && (
              <div className="mb-6 p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium text-blue-800 mb-2">Cek Cuaca</h3>
                <div className="mb-3">
                  <label className="block text-gray-700 mb-2" htmlFor="region">
                    Pilih Kota/Wilayah
                  </label>
                  <select
                    id="region"
                    value={regionCode}
                    onChange={(e) => setRegionCode(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Pilih Wilayah</option>
                    {regions.map((region) => (
                      <option key={region.code} value={region.code}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  type="button"
                  onClick={fetchWeatherData}
                  disabled={!regionCode || !selectedDate || isLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isLoading ? 'Memuat...' : 'Cek Prakiraan Cuaca'}
                </button>
                
                {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
                
                {weatherLoaded && showWeatherInfo && (
                  <div className="mt-4 p-3 bg-white rounded-md border border-blue-200">
                    <h4 className="font-medium">Prakiraan Cuaca untuk {new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                    
                    {getWeatherForDate() ? (
                      <>
                        <p className="mt-2">Kondisi: {getWeatherForDate().weather}</p>
                        <p>Suhu: {getWeatherForDate().temp}°C</p>
                        <p>Kelembaban: {getWeatherForDate().humidity}%</p>
                        
                        {isWeatherSafeForOutdoor() === true && (
                          <p className="mt-2 text-green-600 font-medium">
                            ✓ Cuaca aman untuk lapangan outdoor
                          </p>
                        )}
                        
                        {isWeatherSafeForOutdoor() === false && (
                          <p className="mt-2 text-red-600 font-medium">
                            ⚠️ Cuaca mungkin tidak aman untuk lapangan outdoor
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="mt-2 text-amber-600">
                        Data cuaca untuk tanggal yang dipilih tidak tersedia
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
            
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