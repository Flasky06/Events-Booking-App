import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EventCard = ({ event }) => {
  return (
    <div key={event.id} className="lg:border lg:p-2 lg:rounded-lg lg:shadow-lg">
      <Link to={`/events/${event.id}`}>
        {event.image_url ? (
          <div className="relative">
            <img
              src={event.image_url}
              alt={`Image for ${event.title}`}
              className="lg:mt-4 w-full lg:h-40 object-cover lg:rounded-lg"
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
        <h4 className="text-slate-950 font-semibold mt-2">
          {event.title || "Untitled Event"}
        </h4>
        <p className="text-gray-500 text-sm rounded-full  py-1">
          {event.category}
        </p>
        <div className="text-sm text-slate-850">{event.county}</div>
        <div className="text-sm text-slate-850">{event.start_datetime}</div>
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
