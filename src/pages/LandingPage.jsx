import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Futsal Center</h1>
          <Link to="/login" className="bg-white text-green-600 px-4 py-2 rounded-md font-medium">
            Login
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <div className="text-center mt-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Selamat Datang di Futsal Center</h2>
          <p className="text-lg text-gray-600 mb-8">
            Booking lapangan futsal dengan mudah dan cepat
          </p>
          <Link to="/login" className="bg-green-600 text-white px-6 py-3 rounded-md font-medium text-lg">
            Mulai Booking
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Lapangan Berkualitas</h3>
            <p className="text-gray-600">
              Kami menyediakan lapangan futsal dengan kualitas terbaik untuk pengalaman bermain yang optimal.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pemesanan Mudah</h3>
            <p className="text-gray-600">
              Proses pemesanan yang mudah dan cepat melalui platform online kami.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fasilitas Lengkap</h3>
            <p className="text-gray-600">
              Dilengkapi dengan berbagai fasilitas pendukung dan makanan minuman untuk kenyamanan Anda.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 Futsal Center. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;