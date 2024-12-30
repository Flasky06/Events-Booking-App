import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EventCard = ({ event }) => {
  return (
    <div key={event.id} className="event-card border p-4 rounded-lg shadow-lg">
      <Link to={`/events/${event.id}`}>
        {event.image_url ? (
          <div className="relative">
            <img
              src={event.image_url}
              alt={`Image for ${event.title}`}
              className="mt-4 w-full h-40 object-cover rounded-lg"
            />
            {/* Top-left overlay for location type */}
            <div className="absolute top-2 left-2 bg-black  text-white font-bold px-2 py-1 rounded-lg opacity-75 text-xs">
              {event.location_type}
            </div>
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center bg-gray-200 rounded-lg">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
        <div className="flex flex-row space-x-14 items-center mt-2">
          <p className="text-sm text-green-700 bg-green-200 px-2 py-1 rounded-full">
            Ksh {event.price || "Free"}
          </p>
          <p className="text-gray-500 text-sm bg-gray-200 rounded-full px-2 py-1">
            {event.category || "General"}
          </p>
        </div>
        <div className="text-sm text-slate-850">
          {event.start_datetime || "Date not specified"}
        </div>
        <h4 className="text-slate-950 font-semibold mt-2">
          {event.title || "Untitled Event"}
        </h4>
        <p className="text-sm font-extralight text-gray-700 text-center w-full">
          Tritva Technologies
        </p>
      </Link>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image_url: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    start_datetime: PropTypes.string,
    category: PropTypes.string,
    location_type: PropTypes.string,
  }).isRequired,
};

export default EventCard;
