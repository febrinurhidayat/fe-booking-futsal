import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

function AdminDashboard({ onLogout }) {
  // Data dummy untuk status lapangan
  const courtStatuses = [
    { id: 1, name: 'Lapangan 1', status: 'Tersedia', nextBooking: null },
    { id: 2, name: 'Lapangan 2', status: 'Terpakai', nextBooking: '18:00 - 19:00' },
    { id: 3, name: 'Lapangan 3', status: 'Terpakai', nextBooking: '17:30 - 18:30' },
    { id: 4, name: 'Lapangan 4', status: 'Tersedia', nextBooking: '19:00 - 20:00' },
  ];

  return (
    <AdminLayout title="Dashboard" onLogout={onLogout}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6">Status Lapangan</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                  Nama Lapangan
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                  Booking Berikutnya
                </th>
              </tr>
            </thead>
            <tbody>
              {courtStatuses.map((court) => (
                <tr key={court.id}>
                  <td className="py-3 px-4 border-b border-gray-200">{court.name}</td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        court.status === 'Tersedia' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {court.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {court.nextBooking || 'Belum ada booking'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            to="/admin/manage-courts" 
            className="bg-blue-600 text-white p-4 rounded-lg flex items-center justify-between"
          >
            <span className="text-lg font-medium">Kelola Lapangan</span>
            <span className="text-2xl">→</span>
          </Link>
          <Link 
            to="/admin/manage-inventory" 
            className="bg-purple-600 text-white p-4 rounded-lg flex items-center justify-between"
          >
            <span className="text-lg font-medium">Kelola Stok</span>
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;