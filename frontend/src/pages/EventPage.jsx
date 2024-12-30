import { NavLink, useNavigate } from "react-router-dom";
import EventDetailCard from "../component/EventDetailCard";

const EventPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Goes back to the previous page in history
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <NavLink
          to="#"
          className="text-blue-600 hover:text-blue-800 font-medium text-lg flex items-center"
          onClick={handleBackClick}
        >
          <svg
            className="mr-2 h-5 w-5 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 12H5M12 5l-7 7 7 7"
            />
          </svg>
          Back
        </NavLink>
      </div>

      {/* Event Details Section */}
      <div className="bg-white overflow-hidden">
        <EventDetailCard />
      </div>
    </div>
  );
};

export default EventPage;
