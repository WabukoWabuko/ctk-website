import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [data, setData] = useState({
    events: [], sermons: [], rotas: [], verses: [], gallery: [], offerings: [],
    prayers: [], liturgical: [], news: [], volunteers: [], streams: [], directory: [],
    ministries: [], lectionary: [], sermonNotes: [], feedback: []
  });
  const [newData, setNewData] = useState({
    event: { title: '', date: '', description: '', image: null, video: null },
    sermon: { title: '', date: '', text: '', audio: null, video: null },
    rota: { title: '', date: '', details: '' },
    verse: { verse_text: '', reference: '', date: '' },
    gallery: { title: '', description: '', date: '', image: null, video: null },
    offering: { amount: '', donor_name: '', date: '', note: '' },
    prayer: { request: '', name: '', is_anonymous: false },
    liturgical: { name: '', date: '', color: '', description: '' },
    news: { title: '', content: '', image: null, date: '' },
    volunteer: { title: '', event: null, rota: null, volunteer_name: '', date: '' },
    stream: { title: '', video_url: '', date: '', is_live: false },
    directory: { name: '', email: '', phone: '', is_public: false },
    ministry: { name: '', description: '', leader: '', meeting_time: '' },
    lectionary: { date: '', old_testament: '', psalm: '', epistle: '', gospel: '' },
    sermonNote: { sermon: null, file: null, description: '' },
    feedback: { name: '', email: '', message: '' }
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/admin-login');
      return;
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const endpoints = [
      'events', 'sermons', 'rotas', 'verses', 'gallery', 'offerings', 'prayers',
      'liturgical', 'news', 'volunteers', 'streams', 'directory', 'ministries',
      'lectionary', 'sermon-notes', 'feedback'
    ];
    endpoints.forEach(endpoint => {
      axios.get(`http://localhost:8000/api/${endpoint}/`, config)
        .then(res => setData(prev => ({ ...prev, [endpoint.replace('-', '')]: res.data })));
    });
  }, [token, navigate]);

  const handleAdd = async (e, endpoint, dataKey, reset) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in newData[dataKey]) {
      if (newData[dataKey][key] !== null && newData[dataKey][key] !== '') {
        formData.append(key, newData[dataKey][key]);
      }
    }
    const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
    try {
      const res = await axios.post(`http://localhost:8000/api/${endpoint}/`, formData, config);
      setData(prev => ({ ...prev, [endpoint.replace('-', '')]: [...prev[endpoint.replace('-', '')], res.data] }));
      reset();
    } catch (error) {
      console.error(`Error adding ${endpoint}:`, error.response?.data || error);
    }
  };

  const handleDelete = async (endpoint, id, dataKey) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.delete(`http://localhost:8000/api/${endpoint}/${id}/`, config);
    setData(prev => ({ ...prev, [dataKey]: prev[dataKey].filter(item => item.id !== id) }));
  };

  const renderForm = (endpoint, dataKey, fields) => (
    <form onSubmit={(e) => handleAdd(e, endpoint, dataKey, () => setNewData(prev => ({ ...prev, [dataKey]: fields.reduce((acc, f) => ({ ...acc, [f.name]: f.type === 'checkbox' ? false : f.type === 'file' ? null : '' }), {}) })))}>
      {fields.map(field => (
        <div key={field.name} className="mb-3">
          {field.type === 'textarea' ? (
            <textarea className="form-control" placeholder={field.label} value={newData[dataKey][field.name]} onChange={(e) => setNewData(prev => ({ ...prev, [dataKey]: { ...prev[dataKey], [field.name]: e.target.value } }))} />
          ) : field.type === 'file' ? (
            <input type="file" className="form-control" accept={field.accept} onChange={(e) => setNewData(prev => ({ ...prev, [dataKey]: { ...prev[dataKey], [field.name]: e.target.files[0] } }))} />
          ) : field.type === 'checkbox' ? (
            <div className="form-check">
              <input type="checkbox" className="form-check-input" checked={newData[dataKey][field.name]} onChange={(e) => setNewData(prev => ({ ...prev, [dataKey]: { ...prev[dataKey], [field.name]: e.target.checked } }))} />
              <label className="form-check-label">{field.label}</label>
            </div>
          ) : (
            <input type={field.type} className="form-control" placeholder={field.label} value={newData[dataKey][field.name]} onChange={(e) => setNewData(prev => ({ ...prev, [dataKey]: { ...prev[dataKey], [field.name]: e.target.value } }))} />
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-outline-warning w-100">Add {dataKey.charAt(0).toUpperCase() + dataKey.slice(1)}</button>
    </form>
  );

  return (
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card" style={{ backgroundColor: '#4B2E5A', color: '#D4A017', height: '100%' }}>
            <div className="card-body">
              <h3 className="text-center">Admin Sanctuary</h3>
              <ul className="nav flex-column">
                {Object.keys(data).map(tab => (
                  <li className="nav-item" key={tab}>
                    <button className={`nav-link btn ${activeTab === tab ? 'btn-warning' : 'btn-outline-warning'} w-100 mb-2`} onClick={() => setActiveTab(tab)}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1).replace('sermonNotes', 'Sermon Notes')}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card p-4" style={{ backgroundColor: '#F8F9FA', borderRadius: '15px' }}>
            <h2 className="text-center mb-4" style={{ color: '#4B2E5A' }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('sermonNotes', 'Sermon Notes')} Management
            </h2>

            {activeTab === 'events' && renderForm('events', 'event', [
              { name: 'title', type: 'text', label: 'Title' },
              { name: 'date', type: 'datetime-local', label: 'Date' },
              { name: 'description', type: 'textarea', label: 'Description' },
              { name: 'image', type: 'file', accept: 'image/*' },
              { name: 'video', type: 'file', accept: 'video/*' }
            ])}
            {activeTab === 'sermons' && renderForm('sermons', 'sermon', [
              { name: 'title', type: 'text', label: 'Title' },
              { name: 'date', type: 'date', label: 'Date' },
              { name: 'text', type: 'textarea', label: 'Text' },
              { name: 'audio', type: 'file', accept: 'audio/*' },
              { name: 'video', type: 'file', accept: 'video/*' }
            ])}
            {activeTab === 'rotas' && renderForm('rotas', 'rota', [
              { name: 'title', type: 'text', label: 'Title' },
              { name: 'date', type: 'date', label: 'Date' },
              { name: 'details', type: 'textarea', label: 'Details' }
            ])}
            {activeTab === 'verses' && renderForm('verses', 'verse', [
              { name: 'verse_text', type: 'textarea', label: 'Verse Text' },
              { name: 'reference', type: 'text', label: 'Reference' },
              { name: 'date', type: 'date', label: 'Date' }
            ])}
            {activeTab === 'gallery' && renderForm('gallery', 'gallery', [
              { name: 'title', type: 'text', label: 'Title' },
              { name: 'description', type: 'textarea', label: 'Description' },
              { name: 'date', type: 'date', label: 'Date' },
              { name: 'image', type: 'file', accept: 'image/*' },
              { name: 'video', type: 'file', accept: 'video/*' }
            ])}
            {activeTab === 'offerings' && renderForm('offerings', 'offering', [
              { name: 'amount', type: 'number', label: 'Amount' },
              { name: 'donor_name', type: 'text', label: 'Donor Name' },
              { name: 'date', type: 'date', label: 'Date' },
              { name: 'note', type: 'textarea', label: 'Note' }
            ])}
            {activeTab === 'prayers' && renderForm('prayers', 'prayer', [
              { name: 'request', type: 'textarea', label: 'Prayer Request' },
              { name: 'name', type: 'text', label: 'Name (optional)' },
              { name: 'is_anonymous', type: 'checkbox', label: 'Anonymous' }
            ])}
            {activeTab === 'liturgical' && renderForm('liturgical', 'liturgical', [
              { name: 'name', type: 'text', label: 'Name' },
              { name: 'date', type: 'date', label: 'Date' },
              { name: 'color', type: 'text', label: 'Color' },
              { name: 'description', type: 'textarea', label: 'Description' }
            ])}
            {activeTab === 'news' && renderForm('news', 'news', [
              { name: 'title', type: 'text', label: 'Title' },
              { name: 'content', type: 'textarea', label: 'Content' },
              { name: 'image', type: 'file', accept: 'image/*' },
              { name: 'date', type: 'date', label: 'Date' }
            ])}
            {activeTab === 'volunteers' && renderForm('volunteers', 'volunteer', [
              { name: 'title', type: 'text', label: 'Title' },
              { name: 'date', type: 'date', label: 'Date' }
            ])}
            {activeTab === 'streams' && renderForm('streams', 'stream', [
              { name: 'title', type: 'text', label: 'Title' },
              { name: 'video_url', type: 'text', label: 'Video URL' },
              { name: 'date', type: 'datetime-local', label: 'Date' },
              { name: 'is_live', type: 'checkbox', label: 'Live' }
            ])}
            {activeTab === 'directory' && renderForm('directory', 'directory', [
              { name: 'name', type: 'text', label: 'Name' },
              { name: 'email', type: 'email', label: 'Email' },
              { name: 'phone', type: 'text', label: 'Phone' },
              { name: 'is_public', type: 'checkbox', label: 'Public' }
            ])}
            {activeTab === 'ministries' && renderForm('ministries', 'ministry', [
              { name: 'name', type: 'text', label: 'Name' },
              { name: 'description', type: 'textarea', label: 'Description' },
              { name: 'leader', type: 'text', label: 'Leader' },
              { name: 'meeting_time', type: 'text', label: 'Meeting Time' }
            ])}
            {activeTab === 'lectionary' && renderForm('lectionary', 'lectionary', [
              { name: 'date', type: 'date', label: 'Date' },
              { name: 'old_testament', type: 'text', label: 'Old Testament' },
              { name: 'psalm', type: 'text', label: 'Psalm' },
              { name: 'epistle', type: 'text', label: 'Epistle' },
              { name: 'gospel', type: 'text', label: 'Gospel' }
            ])}
            {activeTab === 'sermonNotes' && renderForm('sermon-notes', 'sermonNote', [
              { name: 'description', type: 'textarea', label: 'Description' },
              { name: 'file', type: 'file', accept: '.pdf' }
            ])}
            {activeTab === 'feedback' && renderForm('feedback', 'feedback', [
              { name: 'name', type: 'text', label: 'Name' },
              { name: 'email', type: 'email', label: 'Email' },
              { name: 'message', type: 'textarea', label: 'Message' }
            ])}

            <div className="row mt-4">
              {data[activeTab].map(item => (
                <div className="col-md-4 mb-3" key={item.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5>{item.title || item.name || item.reference || item.amount || 'Item'}</h5>
                      <p>{item.date ? new Date(item.date).toLocaleDateString() : item.request?.slice(0, 50) || 'Details'}</p>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(activeTab === 'sermonNotes' ? 'sermon-notes' : activeTab, item.id, activeTab)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
