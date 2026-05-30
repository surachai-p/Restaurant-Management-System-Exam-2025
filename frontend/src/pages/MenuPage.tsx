import { useEffect, useState, FormEvent, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import type { MenuItem, Category } from '../types';
import type { AxiosError } from 'axios';

const cats: Category[] = ['food', 'drink', 'dessert'];
const catColors: Record<Category, string> = {
  food: 'bg-orange-100 text-orange-700 border-orange-200',
  drink: 'bg-blue-100 text-blue-700 border-blue-200',
  dessert: 'bg-pink-100 text-pink-700 border-pink-200',
};

export default function MenuPage() {
  const { user } = useAuth();
  const [items, setItems]       = useState<MenuItem[]>([]);
  const [search, setSearch]     = useState('');
  const [cat, setCat]           = useState<Category | ''>('');
  const [loading, setLoading]   = useState(true);
  const [isSaving, setIsSaving] = useState(false); // เพิ่ม state ป้องกันการกด save รัวๆ
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState<MenuItem | null>(null);
  
  const [form, setForm] = useState({ 
    name: '', 
    description: '', 
    price: '', 
    category: 'food' as Category 
  });
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // ใช้ useCallback เพื่อป้องกัน React Hook Warning
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (cat)    params.category = cat;
      const { data } = await api.get<MenuItem[]>('/menu', { params });
      setItems(data);
    } catch { 
      setMsg({ type: 'error', text: 'Failed to load menu' });
    } finally { 
      setLoading(false); // ย้ายมาใส่ใน finally เพื่อให้มั่นใจว่าโหลดเสร็จแล้ว
    }
  }, [search, cat]);

  useEffect(() => { 
    load(); 
  }, [cat, load]);

  const openForm = (item?: MenuItem) => {
    setEditing(item ?? null);
    setForm(item
      ? { name: item.name, description: item.description ?? '', price: String(item.price), category: item.category }
      : { name: '', description: '', price: '', category: 'food' });
    setShowForm(true); 
    setMsg(null);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // แปลง price ให้เป็นตัวเลขก่อนส่งไป Backend
      const payload = { ...form, price: parseFloat(form.price) };
      
      if (editing) {
        await api.put(`/menu/${editing.id}`, payload);
        setMsg({ type: 'success', text: 'Menu item updated successfully' });
      } else {
        await api.post('/menu', payload);
        setMsg({ type: 'success', text: 'Menu item added successfully' });
      }
      setShowForm(false); 
      load();
    } catch (err) {
      const e = err as AxiosError<{ error: string }>;
      setMsg({ type: 'error', text: e.response?.data?.error ?? 'Failed to save menu item' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDisable = async (id: number) => {
    if (!window.confirm('Are you sure you want to disable this item?')) return;
    try { 
      await api.delete(`/menu/${id}`); 
      load(); 
    } catch { 
      setMsg({ type: 'error', text: 'Failed to disable item' }); 
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
        {user?.role === 'admin' && (
          <button className="btn-success px-4 py-2 shadow-sm" onClick={() => openForm()}>
            + Add Item
          </button>
        )}
      </div>

      {msg && (
        <div className={`px-4 py-3 rounded-lg text-sm font-medium border shadow-sm ${
          msg.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          {msg.text}
        </div>
      )}

      {/* Filter bar */}
      <div className="card py-4 px-5 bg-white shadow-sm border border-gray-100 rounded-xl">
        <div className="flex gap-3 flex-wrap items-center">
          <input 
            className="input flex-1 min-w-[200px]" 
            value={search}
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search menu items…"
            onKeyDown={e => e.key === 'Enter' && load()} 
          />
          <select 
            className="input w-40" 
            value={cat} 
            onChange={e => setCat(e.target.value as Category | '')}
          >
            <option value="">All categories</option>
            {cats.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
          </select>
          <button className="btn-primary px-6" onClick={load}>Search</button>
        </div>
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div className="card border-2 border-blue-200 bg-blue-50/30 rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            {editing ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="label font-medium mb-1 block">Name *</label>
              <input id="name" className="input w-full" value={form.name} required
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label htmlFor="price" className="label font-medium mb-1 block">Price (THB) *</label>
              <input id="price" className="input w-full" type="number" step="0.01" min="0" value={form.price} required
                onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="label font-medium mb-1 block">Description</label>
              <input id="description" className="input w-full" value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
            </div>
            <div>
              <label htmlFor="category" className="label font-medium mb-1 block">Category</label>
              <select id="category" className="input w-full capitalize" value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value as Category }))}>
                {cats.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-end gap-3 md:col-span-2 mt-2">
              <button type="submit" disabled={isSaving} className="btn-success px-6 disabled:opacity-70">
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" className="btn-ghost px-6" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Menu grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-400 animate-pulse">Loading menu items…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(item => (
            <div key={item.id} className="card bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${catColors[item.category]}`}>
                  {item.category}
                </span>
                <span className="text-lg font-bold text-green-600">฿{Number(item.price).toFixed(2)}</span>
              </div>
              <p className="font-semibold text-gray-900 text-lg mb-1">{item.name}</p>
              {item.description && <p className="text-sm text-gray-500 mb-4 flex-grow">{item.description}</p>}
              
              {/* ซ่อนปุ่ม Action หากไม่ใช่ Admin (เพื่อให้ตรงกับ Requirement ของปุ่ม Add/Disable) */}
              {user?.role === 'admin' && (
                <div className="flex gap-2 mt-auto pt-4 border-t border-gray-50">
                  <button className="btn-warning btn-sm flex-1" onClick={() => openForm(item)}>Edit</button>
                  <button className="btn-danger btn-sm flex-1" onClick={() => handleDisable(item.id)}>Disable</button>
                </div>
              )}
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="col-span-full text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <span className="text-4xl mb-3 block">🍽️</span>
              <p className="text-gray-500 font-medium">No menu items found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
