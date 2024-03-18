import React, { useState } from 'react';
import SuccessError from '../../components/SuccessError';

export default function KataForm() {
  const [formData, setFormData] = useState({
    title: '',
    kataLink: '',
    level: '',
    category: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'category' ? value.split(',').map(item => item.trim()) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch("http://localhost:8080/katas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
      body: JSON.stringify(formData), 
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 409) {
          throw new Error("Kata already exists!");
        } else {
          throw new Error("Failed to create the lesson");
        }
      })
      .then((data) => {
        setSuccess("Kata created successfully!"); // afisare mesaj
        setTimeout(() => {
          setSuccess(null); // curatare eroare
          window.history.back(); // Redirect after 2 seconds
        }, 2000);
      })
      .catch((error) => {
        setError(error.message); 
        setTimeout(() => {
          setError(null); // curatare eroare
        }, 2000);
      })
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
        <div className="mb-4">
          <label htmlFor="level" className="block text-gray-700 font-bold mb-2">Level</label>
          <input
            type="number" 
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter level"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block text-gray-700 font-bold mb-2">Language</label>
          <input
            type="text"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter language"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter category"
            required
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </div>
      </form>
    </div>
  );
}
