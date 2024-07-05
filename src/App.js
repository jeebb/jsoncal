import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';

const App = () => {
  const [calendars, setCalendars] = useState(() => {
    const savedCalendars = localStorage.getItem('calendars');
    return savedCalendars ? JSON.parse(savedCalendars) : [1];
  });

  useEffect(() => {
    localStorage.setItem('calendars', JSON.stringify(calendars));
  }, [calendars]);

  const addCalendar = () => {
    setCalendars([...calendars, calendars.length + 1]);
  };

  const deleteCalendar = (id) => {
    setCalendars(prevCalendars => prevCalendars.filter(calId => calId !== id));
    localStorage.removeItem(`calendar_${id}_events`);
  };

  return (
    <div className="container" style={{ margin: 'auto', padding: '1rem' }}>
      <button 
        onClick={addCalendar}
        style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '1rem' }}
      >
        Add Calendar Instance
      </button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        
      </div>
      {calendars.map(id => (
        <Calendar key={id} id={id} onDelete={deleteCalendar} />
      ))}
    </div>
  );
};

export default App;