import React, { useState, useEffect } from 'react';

export default function SuccessError({ success, error }) {
    const [message, setMessage] = useState(null);
    const [colorClass, setColorClass] = useState(null);
  
    useEffect(() => {
      if (success) {
        setMessage(success);
        setColorClass('bg-green-500');
      } else if (error) {
        setMessage(error);
        setColorClass('bg-red-500');
      }
  
      // Clear message after 2 seconds
      const timeoutId = setTimeout(() => {
        setMessage(null);
      }, 2000);
  
      return () => clearTimeout(timeoutId);
    }, [success, error]);
  
    return (
      <>
        {message && (
          <div className={`fixed z-40 bottom-0 left-0 w-full text-white py-2 text-center animate-fadeInOut ${colorClass}`}>
            {message}
          </div>
        )}
      </>
    );
  }
  
