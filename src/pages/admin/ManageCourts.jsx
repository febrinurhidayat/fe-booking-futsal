import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

function ManageCourts() {
  // Data dummy untuk lapangan
  const [courts, setCourts] = useState([
    { id: 1, name: 'Lapangan 1', type: 'Vinyl', price: 100000, status: 'Aktif' },
    { id: 2, name: 'Lapangan 2', type: 'Rumput Sintetis', price: 120000, status: 'Aktif' },
    { id: 3, name: 'Lapangan 3', type: 'Vinyl', price: 100000, status: 'Aktif' },
    { id: 4, name: 'Lapangan 4', type: 'Rumput Sintetis', price: 120000, status: 'Perbaikan' },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    type: '',
    price: '',
    status: 'Aktif'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update existing court
      setCourts(courts.map(court => 
        court.id === formData.id ? { ...formData, price: Number(formData.price) } : court
      ));
    } else {
      // Add new court
      setCourts([
        ...courts,
        {
          id: courts.length > 0 ? Math.max(...courts.map(c => c.id)) + 1 : 1,
          ...formData,
          price: Number(formData.price)
        }
      ]);
    }

    // Reset form
    setFormData({
      id: null,
      name: '',
      type: '',
      price: '',
      status: 'Aktif'
    });
    setIsEditing(false);
  };

  const handleEdit = (court) => {
    setFormData(court);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      id: null,
      name: '',
      type: '',
      price: '',
      status: 'Aktif'
    });
    setIsEditing(false);
  };

  return (
    <AdminLayout title="Kelola Lapangan">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Daftar Lapangan</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      Nama Lapangan
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      Tipe
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      Harga/Jam
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      Status
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courts.map((court) => (
                    <tr key={court.id}>
                      <td className="py-3 px-4 border-b border-gray-200">{court.name}</td>
                      <td className="py-3 px-4 border-b border-gray-200">{court.type}</td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        Rp {court.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            court.status === 'Aktif' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {court.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        <button
                          onClick={() => handleEdit(court)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">
              {isEditing ? 'Edit Lapangan' : 'Tambah Lapangan Baru'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Nama Lapangan
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="type">
                  Tipe Lapangan
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Pilih Tipe</option>
                  <option value="Vinyl">Vinyl</option>
                  <option value="Rumput Sintetis">Rumput Sintetis</option>
                  <option value="Parquette">Parquette</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="price">
                  Harga per Jam (Rp)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Perbaikan">Perbaikan</option>
                </select>
              </div>
              
              <div className="flex justify-between">
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
                  >
                    Batal
                  </button>
                )}
                <button
                  type="submit"
                  className={`bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 ${isEditing ? '' : 'w-full'}`}
                >
                  {isEditing ? 'Update Lapangan' : 'Tambah Lapangan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ManageCourts;