import React, { useState } from 'react';
import Calendar from './Calendar';

const App = () => {
  const [calendars, setCalendars] = useState([1]);

  const addCalendar = () => {
    setCalendars([...calendars, calendars.length + 1]);
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
        <Calendar key={id} id={id} />
      ))}
    </div>
  );
};

export default App;