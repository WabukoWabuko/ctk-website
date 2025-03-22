import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styles (overridden by index.css)

const Liturgical = () => {
  const [date, setDate] = useState(new Date());
  const [liturgicalEvents, setLiturgicalEvents] = useState([]);
  const [regularEvents, setRegularEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/liturgical/')
      .then(res => setLiturgicalEvents(res.data))
      .catch(err => console.error('Error fetching liturgical events:', err));

    axios.get('http://localhost:8000/api/events/')
      .then(res => setRegularEvents(res.data))
      .catch(err => console.error('Error fetching regular events:', err));
  }, []);

  const allEvents = [...liturgicalEvents, ...regularEvents];

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const hasEvents = allEvents.some(event => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getFullYear() === date.getFullYear()
        );
      });
      return hasEvents ? 'react-calendar__tile--has-events' : null;
    }
    return null;
  };

  const handleDateClick = (value) => {
    const clickedDate = new Date(value);
    const eventsOnDate = allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === clickedDate.getDate() &&
        eventDate.getMonth() === clickedDate.getMonth() &&
        eventDate.getFullYear() === clickedDate.getFullYear()
      );
    });
    setSelectedEvents(eventsOnDate);
    setShowPopup(true);
    setDate(value);
  };

  return (
    <div className="container my-5">
      <div className="hero">
        <h1 className="display-4 fw-bold" style={{ color: '#4B2E5A' }}>Liturgical Calendar</h1>
        <p className="lead">Walk with us through the church year and parish events.</p>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={tileClassName}
            onClickDay={handleDateClick}
            className="mx-auto shadow-sm"
          />
        </div>
      </div>

      {/* Popup for Events */}
      {showPopup && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: '15px', border: '2px solid #D4A017' }}>
              <div className="modal-header" style={{ backgroundColor: '#4B2E5A', color: '#D4A017' }}>
                <h5 className="modal-title">Events on {date.toLocaleDateString()}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowPopup(false)}></button>
              </div>
              <div className="modal-body">
                {selectedEvents.length > 0 ? (
                  selectedEvents.map(event => (
                    <div key={event.id} className="mb-3">
                      <h6 style={{ color: event.color || '#2E5A2E' }}>{event.name || event.title}</h6>
                      <p>{event.description || 'Parish Gathering'}</p>
                      {event.color && <small>Liturgical Color: {event.color}</small>}
                    </div>
                  ))
                ) : (
                  <p>No events scheduled for this day.</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-warning" onClick={() => setShowPopup(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Liturgical;
