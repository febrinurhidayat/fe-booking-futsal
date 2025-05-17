import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

function ManageInventory() {
  // Data dummy untuk stok
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Air Mineral', category: 'Minuman', price: 5000, stock: 50 },
    { id: 2, name: 'Coca Cola', category: 'Minuman', price: 10000, stock: 30 },
    { id: 3, name: 'Mie Instan', category: 'Makanan', price: 8000, stock: 25 },
    { id: 4, name: 'Roti Sandwich', category: 'Makanan', price: 15000, stock: 15 },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    category: '',
    price: '',
    stock: ''
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
      // Update existing item
      setInventory(inventory.map(item => 
        item.id === formData.id ? 
        { ...formData, price: Number(formData.price), stock: Number(formData.stock) } : 
        item
      ));
    } else {
      // Add new item
      setInventory([
        ...inventory,
        {
          id: inventory.length > 0 ? Math.max(...inventory.map(item => item.id)) + 1 : 1,
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        }
      ]);
    }

    // Reset form
    setFormData({
      id: null,
      name: '',
      category: '',
      price: '',
      stock: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      id: null,
      name: '',
      category: '',
      price: '',
      stock: ''
    });
    setIsEditing(false);
  };

  return (
    <AdminLayout title="Kelola Stok Makanan & Minuman">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Daftar Stok</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      Nama Item
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      Kategori
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      Harga
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      Stok
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 px-4 border-b border-gray-200">{item.name}</td>
                      <td className="py-3 px-4 border-b border-gray-200">{item.category}</td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        Rp {item.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            item.stock > 10 
                              ? 'bg-green-100 text-green-800' 
                              : item.stock > 0 
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        <button
                          onClick={() => handleEdit(item)}
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
              {isEditing ? 'Edit Item' : 'Tambah Item Baru'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Nama Item
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
                <label className="block text-gray-700 mb-2" htmlFor="category">
                  Kategori
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Makanan">Makanan</option>
                  <option value="Minuman">Minuman</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="price">
                  Harga (Rp)
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
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="stock">
                  Stok
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                {isEditing ? 'Simpan Perubahan' : 'Tambah Item'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageInventory;