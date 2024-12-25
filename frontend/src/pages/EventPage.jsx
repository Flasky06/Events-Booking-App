import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EventPage = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch event details when the component mounts
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/events/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data); // Store the fetched event details
        setLoading(false); // Update loading state after fetching
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
        setError("Failed to load event details. Please try again later.");
        setLoading(false); // Update loading state
      });
  }, [id]); // The effect runs again whenever the event ID changes

  if (loading) {
    return (
      <div className="text-center">
        <h2 className="text-xl">Loading Event...</h2>
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
    <div className="event-details container max-w-6xl mx-auto py-8">
      {event && (
        <>
          <h2 className="text-3xl mb-4 text-center">{event.title}</h2>

          {/* Event Image and Location */}
          {event.image_url && (
            <div className="relative">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute top-2 left-2 bg-black text-white px-3 py-1 rounded-lg opacity-75">
                {event.location_type}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-2xl font-bold">Description</h3>
            <p className="mt-2">{event.description}</p>
          </div>

          <div className="mt-6">
            <p>
              <strong>Category:</strong> {event.category}
            </p>
            <p>
              <strong>Price:</strong> ${event.price}
            </p>
            <p>
              <strong>Location:</strong> {event.county}
            </p>
            <p>
              <strong>Start Time:</strong>{" "}
              {new Date(event.start_datetime).toLocaleString()}
            </p>
            <p>
              <strong>End Time:</strong>{" "}
              {new Date(event.end_datetime).toLocaleString()}
            </p>
            <p>
              <strong>Location Description:</strong>{" "}
              {event.location_description}
            </p>
          </div>

          <div className="mt-6">
            <a
              href={event.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Visit Event Link
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default EventPage;
