import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    start_datetime: "",
    end_datetime: "",
    price: "",
    location_type: "physical",
    link_url: "",
    tickets_available: "",
    county: "",
    location_description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const authToken = sessionStorage.getItem("authToken");

    if (!authToken) {
      setError("Authorization token is missing. Please log in.");
      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (imageFile) {
      data.append("image", imageFile);
    }

    fetch("http://localhost:8000/api/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create event");
        }
        return response.json();
      })
      .then((data) => {
        setSuccess("Event created successfully!");
        setFormData({
          title: "",
          description: "",
          category: "",
          start_datetime: "",
          end_datetime: "",
          price: "",
          location_type: "physical",
          link_url: "",
          tickets_available: "",
          county: "",
          location_description: "",
        });
        setImageFile(null);

        // Redirect to the homepage after a delay
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => setError(error.message));
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl mb-6 text-center">Create a New Event</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Event Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Start Date & Time</label>
          <input
            type="datetime-local"
            name="start_datetime"
            value={formData.start_datetime}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">End Date & Time</label>
          <input
            type="datetime-local"
            name="end_datetime"
            value={formData.end_datetime}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Location Type</label>
          <select
            name="location_type"
            value={formData.location_type}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          >
            <option value="physical">Physical</option>
            <option value="online">Online</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Link URL (if online)</label>
          <input
            type="url"
            name="link_url"
            value={formData.link_url}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Tickets Available</label>
          <input
            type="number"
            name="tickets_available"
            value={formData.tickets_available}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">County</label>
          <select
            name="county"
            value={formData.county}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Select County</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Nakuru">Nakuru</option>
            <option value="Kiambu">Kiambu</option>
            <option value="Machakos">Machakos</option>
            <option value="Mombasa">Mombasa</option>
            <option value="Kisumu">Kisumu</option>
            <option value="Nyeri">Nyeri</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Location Description</label>
          <textarea
            name="location_description"
            value={formData.location_description}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
