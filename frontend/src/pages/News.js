import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/news/')
      .then(res => setNews(res.data))
      .catch(err => console.error('Error fetching news:', err));
  }, []);

  return (
    <div className="container my-5">
      <div className="hero">
        <h1 className="display-4 fw-bold">Parish News</h1>
        <p className="lead">Stay updated with our community.</p>
      </div>
      <div className="row">
        {news.map(item => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card">
              {item.image && <img src={item.image} className="card-img-top" alt={item.title} />}
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p>{item.content.slice(0, 100)}...</p>
                <small>{new Date(item.date).toLocaleDateString()}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
