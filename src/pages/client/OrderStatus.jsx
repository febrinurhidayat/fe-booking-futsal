import { Link } from 'react-router-dom';

function OrderStatus() {
  // Data dummy untuk pemesanan
  const orders = [
    {
      id: 1, 
      courtName: 'Lapangan 1',
      date: '2025-05-20',
      time: '18:00 - 19:00',
      status: 'Confirmed',
      paymentStatus: 'Paid'
    },
    {
      id: 2, 
      courtName: 'Lapangan 3',
      date: '2025-05-25',
      time: '19:00 - 20:00',
      status: 'Pending',
      paymentStatus: 'Unpaid'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Status Pesanan</h1>
          <Link to="/client" className="bg-white text-green-600 px-4 py-2 rounded-md font-medium">
            Kembali
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6">Riwayat Pemesanan</h2>
          
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      No. Pesanan
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      Lapangan
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      Tanggal
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      Waktu
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      Status
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                      Pembayaran
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="py-3 px-4 border-b border-gray-200">#{order.id}</td>
                      <td className="py-3 px-4 border-b border-gray-200">{order.courtName}</td>
                      <td className="py-3 px-4 border-b border-gray-200">{order.date}</td>
                      <td className="py-3 px-4 border-b border-gray-200">{order.time}</td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            order.paymentStatus === 'Paid' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Belum ada pemesanan
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default OrderStatus;