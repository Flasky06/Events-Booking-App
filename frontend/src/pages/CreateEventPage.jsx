import React, { useState, useEffect } from "react";
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
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    if (
      !formData.title ||
      !formData.category ||
      !formData.start_datetime ||
      !formData.end_datetime ||
      !formData.price ||
      !formData.tickets_available
    ) {
      setError("Please fill out all required fields.");
      return false;
    }

    if (
      parseFloat(formData.price) <= 0 ||
      parseInt(formData.tickets_available) <= 0
    ) {
      setError("Price and tickets available must be positive numbers.");
      return false;
    }

    if (new Date(formData.start_datetime) >= new Date(formData.end_datetime)) {
      setError("End date must be after the start date.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const authToken = sessionStorage.getItem("authToken");

    if (!authToken) {
      setError("Authorization token is missing. Please log in.");
      setIsLoading(false);
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
      .then(() => {
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
        setImagePreview(null);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const handleCancel = () => {
    navigate("/");
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="container lg:max-w-6xl lg:mx-auto lg:py-8">
      <h2 className="text-3xl mb-6 text-center">Create a New Event</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
        <div>
          <input
            type="text"
            placeholder="Event Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          ></textarea>
        </div>
        <div>
          <input
            type="text"
            placeholder="Event Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <input
            type="datetime-local"
            placeholder="Start Date & Time"
            name="start_datetime"
            value={formData.start_datetime}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <input
            type="datetime-local"
            placeholder="End Date & Time"
            name="end_datetime"
            value={formData.end_datetime}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div>
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
          <input
            type="url"
            placeholder="Link URL (if online)"
            name="link_url"
            value={formData.link_url}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image preview"
              className="w-32 h-32 object-cover mb-4"
            />
          )}
          <input
            placeholder="Upload Image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Tickets Available"
            name="tickets_available"
            value={formData.tickets_available}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div>
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
          <textarea
            name="location_description"
            placeholder="Location Description"
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
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
