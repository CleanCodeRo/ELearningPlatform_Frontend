import React, { useState } from 'react';
import SuccessError from '../../components/SuccessError';

export default function KataFormDelete() {
  const [formData, setFormData] = useState({
    title: '',
    kataLink: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    fetch("http://localhost:8080/katas", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 404) {
          throw new Error("Kata not found!");
        } else {
          throw new Error("Failed to delete the kata");
        }
      })
      .then((data) => {
        setSuccess("Kata deleted successfully!");
        setTimeout(() => {
          setSuccess(null);
          window.history.back();
        }, 2000);
      })
      .catch((error) => {
        setError(error.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <SuccessError success={success} error={error} />
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter title"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="kataLink" className="block text-gray-700 font-bold mb-2">Kata Link</label>
          <input
            type="text"
            id="kataLink"
            name="kataLink"
            value={formData.kataLink}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter kata link"
            required
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
        </div>
      </form>
    </div>
  );
}
