import React from 'react'
import { ContactSection } from './ContactSection'
import { BusinessEnquiries } from './BusinessEnquiries'
import { BusinessHours } from './BusinessHours'
import { useEffect } from 'react'

export const Contact = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
        <ContactSection/>
        <BusinessEnquiries/>
        <BusinessHours/>
    </div>
  )
}
