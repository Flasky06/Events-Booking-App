import { useState, useEffect } from "react";
import EventCard from "./EventCard";

const EventSectionComponent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <h2 className="text-xl">Loading Events...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <h2 className="text-xl">{error}</h2>
      </div>
    );
  }

  return (
    <div className="event-section container max-w-6xl mx-auto py-8">
      <h2 className="text-3xl mb-4 text-center">Upcoming Events</h2>
      <div className="events-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventSectionComponent;
