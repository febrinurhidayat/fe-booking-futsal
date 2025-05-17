import { Link } from 'react-router-dom';

function ClientDashboard({ onLogout }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Client Dashboard</h1>
          <button 
            onClick={onLogout} 
            className="bg-white text-green-600 px-4 py-2 rounded-md font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            to="/client/order" 
            className="bg-blue-600 text-white p-6 rounded-lg flex items-center justify-between"
          >
            <span className="text-lg font-medium">Pesan Lapangan</span>
            <span className="text-2xl">→</span>
          </Link>
          <Link 
            to="/client/status" 
            className="bg-purple-600 text-white p-6 rounded-lg flex items-center justify-between"
          >
            <span className="text-lg font-medium">Status Pesanan</span>
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ClientDashboard;