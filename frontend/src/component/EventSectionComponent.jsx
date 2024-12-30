import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import Pagination from "./Pagination";

const EventSectionComponent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  const fetchEvents = (page) => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/events?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.data);
        setCurrentPage(data.current_page);
        setLastPage(data.last_page);
        setLoading(false);

        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      });
  };

  const handleNext = () => {
    if (currentPage < lastPage) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) {
    return <div className="text-center">Loading Events...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="event-section px-2 container  lg:px-0 lg:max-w-6xl lg:mx-auto lg:py-8 ">
      <h2 className="text-3xl my-4 text-center font-bold">Upcoming Events</h2>
      <div className="events-list grid grid-cols-2 gap-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default EventSectionComponent;
