import { useState, useEffect } from 'react';
import Product from './Product.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', price: '' });
  const [imageFile, setImageFile] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const json = await res.json();
      setProducts(json);
      setError('');
    } catch (err) {
      setError('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !imageFile) {
      setError('All fields are required');
      return;
    }
    const data = new FormData();
    data.append('name', form.name);
    data.append('price', form.price);
    data.append('ImageUrl', imageFile);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Error');
      setForm({ name: '', price: '' });
      setImageFile(null);
      fetchProducts();
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Task1 Frontend</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded flex flex-wrap gap-3 justify-center items-center mb-5">
          <input
            type="text"
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-4 py-2 rounded border border-gray-700 bg-gray-900 text-white w-48"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="px-4 py-2 rounded border border-gray-700 bg-gray-900 text-white w-48"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="text-gray-400 text-sm"
          />
          <button type="submit" className="px-6 py-2 rounded bg-blue-500 text-white">Add Product</button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {products.map((p) => (
            <Product key={p._id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
