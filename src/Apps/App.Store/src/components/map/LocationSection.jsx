import React from 'react'

const LocationSection = () => {
  return (
    <div className="fz-contact-location-map">
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13222.68295129382!2d-118.27454628028438!3d34.05231629884374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7a55107d15b%3A0xe5f4313cc9261c81!2sLos%20Angeles%2C%20CA%2090017%2C%20USA!5e0!3m2!1sen!2sbd!4v1683722024828!5m2!1sen!2sbd" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    </div>
  )
}

export default LocationSection