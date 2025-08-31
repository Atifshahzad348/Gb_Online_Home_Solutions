import React from 'react'
import  { useState, useEffect } from 'react';


export default function Progress() {
// counting animation code start //

  const [clientCount, setClientCount] = useState(0);
  const [providerCount, setProviderCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    // Animation duration in milliseconds
    const duration = 10000;
    // Target values
    const targets = {
      clients: 1000,
      providers: 500,
      jobs: 200,
      products: 300
    };

    // Calculate increment for each target to reach it within duration
    const increment = (target) => target / (duration / 16); // 16ms is roughly 60fps

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      setClientCount(Math.floor(percentage * targets.clients));
      setProviderCount(Math.floor(percentage * targets.providers));
      setJobCount(Math.floor(percentage * targets.jobs));
      setProductCount(Math.floor(percentage * targets.products));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Ensure we reach the exact target numbers
        setClientCount(targets.clients);
        setProviderCount(targets.providers);
        setJobCount(targets.jobs);
        setProductCount(targets.products);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

  return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
// counting animation code start //



  return (
    <div>
      <div className='container bg-black py-3 rounded'>
        <div className='row'>
            <div className='col-md-3 text-center right-border'>
                <h1 className='text-white fw-bold'>{clientCount}+</h1>
                <p className='off-white fw-bold'>Registered client</p>
            </div>
            <div className='col-md-3 text-center right-border'>
                 <h1 className='text-white fw-bold'>{providerCount}+</h1>
                  <p className='off-white fw-bold'>Service Provider</p>
            </div>
            <div className='col-md-3 text-center right-border'>
                  <h1 className='text-white fw-bold'>{jobCount}+</h1>
                  <p className='off-white fw-bold'>Job Compeletions</p>
            </div>
            <div className='col-md-3 text-center'>
                 <h1 className='text-white fw-bold'>{jobCount}+</h1>
                 <p className='off-white fw-bold'>different Products</p>
            </div>

        </div>
      </div>
    </div>
  )
  }
