import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Sermons from './pages/Sermons';
import Rotas from './pages/Rotas';
import Verses from './pages/Verses';
import Gallery from './pages/Gallery';
import Prayer from './pages/Prayer';
import Liturgical from './pages/Liturgical';
import News from './pages/News';
import Volunteer from './pages/Volunteer';
import Stream from './pages/Stream';
import Directory from './pages/Directory';
import Ministries from './pages/Ministries';
import Lectionary from './pages/Lectionary';
import Give from './pages/Give';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/rotas" element={<Rotas />} />
            <Route path="/verses" element={<Verses />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/prayer" element={<Prayer />} />
            <Route path="/liturgical" element={<Liturgical />} />
            <Route path="/news" element={<News />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/stream" element={<Stream />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/ministries" element={<Ministries />} />
            <Route path="/lectionary" element={<Lectionary />} />
            <Route path="/give" element={<Give />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
