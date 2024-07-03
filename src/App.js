import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const App = () => {
  const [events, setEvents] = useState([]);
  const [calendarKey, setCalendarKey] = useState(0);
  const [jsonInput, setJsonInput] = useState('');
  const [showTextArea, setShowTextArea] = useState(false);

  const placeholderJson = `Example:
[
  {
    "title": "Team Meeting",
    "start": "2024-07-08T10:00:00",
    "end": "2024-07-08T11:30:00",
    "description": "Weekly team sync-up"
  },
  ...
]`;

  const handleJsonSubmit = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      console.log("Parsed JSON data:", jsonData);
      setEvents(jsonData);
      setCalendarKey(calendarKey + 1); // Increment the key to force re-render
      setShowTextArea(false); // Hide text area after successful import
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Error parsing JSON. Please make sure it's valid JSON.");
    }
  };

  useEffect(() => {
    console.log("Current events state:", events);
  }, [events]);

  const formatEventTime = (date) => {
    return date ? new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  };

  const formatEventDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : '';
  };

  return (
    <div className="container" style={{ margin: 'auto', padding: '1rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={() => setShowTextArea(!showTextArea)}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem' }}
        >
          {showTextArea ? 'Hide JSON Input' : 'Show JSON Input'}
        </button>
        {showTextArea && (
          <div style={{ marginTop: '0.5rem' }}>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder={placeholderJson}
              style={{ width: '100%', height: '200px', padding: '0.5rem', marginBottom: '0.5rem', fontFamily: 'monospace' }}
            />
            <button 
              onClick={handleJsonSubmit}
              style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Import JSON
            </button>
          </div>
        )}
      </div>
      <div className="calendar-container">
        <FullCalendar
          key={calendarKey}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={events}
          height="auto"
          eventContent={(eventInfo) => (
            <div style={{ fontSize: '0.8em', lineHeight: '1.2' }}>
              <strong>{formatEventDate(eventInfo.event.start)} - {eventInfo.event.title}</strong>
              <br />
              <span>{formatEventTime(eventInfo.event.start)} - {formatEventTime(eventInfo.event.end)}</span>
              {eventInfo.event.extendedProps.description && (
                <><br /><span>{eventInfo.event.extendedProps.description}</span></>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default App;