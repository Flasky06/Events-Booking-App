import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EventDetailCard = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch event details when the component mounts
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/events/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        console.log("user", data.user);
        console.log("user", data.user.username);

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
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-700">
          Loading Event...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <h2 className="text-xl font-semibold">{error}</h2>
      </div>
    );
  }

  return (
    <div className="event-details container max-w-7xl mx-auto py-12 px-4">
      {event && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event Image and Location */}
            {event.image_url && (
              <div className="relative h-96 my-auto ml-2 rounded-l-lg">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-96 object-cover rounded-l-lg"
                />
                <div className="absolute top-2 left-2 bg-black  text-white text-xs font-bold px-3 py-1 rounded-lg opacity-75">
                  {event.location_type}
                </div>
              </div>
            )}

            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
                <div className="flex flex-wrap space-x-4 items-center mb-4">
                  <span className="text-sm text-green-700 bg-green-200 px-3 py-1 rounded-full">
                    Ksh {event.price || "Free"}
                  </span>
                  <span className="text-sm text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
                    {event.category || "General"}
                  </span>
                </div>
                <p className="text-gray-700 mb-6">{event.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Created By
                </h3>
                <p className="text-sm text-gray-600">{event.user.username}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Schedule
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Start:</strong>{" "}
                  {new Date(event.start_datetime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>End:</strong>{" "}
                  {new Date(event.end_datetime).toLocaleString()}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Location
                </h3>
                <p className="text-sm text-gray-600">
                  {event.location_description || "Location details unavailable"}
                </p>
                {event.county && (
                  <p className="text-sm text-gray-600">
                    <strong>County:</strong> {event.county}
                  </p>
                )}
              </div>

              {event.link_url && (
                <div>
                  <a
                    href={event.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Visit Event Link
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailCard;
