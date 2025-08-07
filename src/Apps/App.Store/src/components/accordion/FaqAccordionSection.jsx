import React, { useState } from 'react'
import { accordionList } from '../../data/Data';

const FaqAccordionSection = () => {
    const [openAccordionId, setOpenAccordionId] = useState(0);

    const handleAccordionBtn = (itemId) => {
        setOpenAccordionId((prevState) => (prevState === itemId ? null : itemId));
    };
  return (
    <div className="faq-accordion-area">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    {accordionList.slice(0,4).map((item) => (
                       <div
                        className={`fz-single-accordion-item ${
                            openAccordionId === item.id ? 'open' : ''
                        }`}
                        key={item.id}
                        >
                        <div
                            className="fz-single-accordion-item__header"
                            role="button"
                            onClick={() => handleAccordionBtn(item.id)}
                        >
                            <h3 className="fz-single-accordion-item__title">{item.title}</h3>
                            <i className="fa-regular fa-plus"></i>
                        </div>

                        <p className="fz-single-accordion-item__body">
                            write your professional text here and you can styling and custom form style or
                            advanced ta or check documentation for more details write your professional
                            text here and you can styling.
                        </p>
                    </div> 
                    ))}
                </div>

                <div className="col-md-6">
                    {accordionList.slice(4).map((item) => (
                        <div
                            className={`fz-single-accordion-item ${
                            openAccordionId === item.id ? 'open' : ''
                            }`}
                            key={item.id}
                        >
                            <div
                            className="fz-single-accordion-item__header"
                            role="button"
                            onClick={() => handleAccordionBtn(item.id)}
                            >
                                <h3 className="fz-single-accordion-item__title">{item.title}</h3>
                                <i className="fa-regular fa-plus"></i>
                            </div>

                            <p className="fz-single-accordion-item__body">
                                write your professional text here and you can styling and custom form style or
                                advanced ta or check documentation for more details write your professional
                                text here and you can styling.
                            </p>
                        </div> 
                    ))}
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default FaqAccordionSection