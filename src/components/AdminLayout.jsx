import { Link } from 'react-router-dom';

function AdminLayout({ children, title, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-xl font-bold">Admin Panel</div>
        <nav className="mt-8">
          <Link 
            to="/admin" 
            className="block py-2.5 px-4 rounded transition hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/manage-courts" 
            className="block py-2.5 px-4 rounded transition hover:bg-gray-700"
          >
            Kelola Lapangan
          </Link>
          <Link 
            to="/admin/manage-inventory" 
            className="block py-2.5 px-4 rounded transition hover:bg-gray-700"
          >
            Kelola Stok
          </Link>
        </nav>
        
        <div className="absolute bottom-0 w-64 p-4">
          <button 
            onClick={onLogout} 
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-md p-4">
          <h1 className="text-xl font-bold">{title}</h1>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;