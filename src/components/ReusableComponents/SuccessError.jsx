import React, { useState, useEffect } from 'react';

export default function SuccessError({ setMessage, message, color }) {
    
  
    useEffect(() => {
      // Clear message after 2 seconds
       setTimeout(() => {
        setMessage([null, null]);
      }, 2000);
  
    }, [message]);
  
    return (
      <>
        {message && (
          <div className={`fixed z-40 bottom-0 left-0 w-full text-white py-2 text-center animate-jump-in ${color}`} style={{ animationDuration: '0.5s' }}>
            {message}
          </div>
        )}
      </>
    );
  }
  
