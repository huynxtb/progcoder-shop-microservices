import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';

const ProductDetailSlider = () => {
  const mainImageRef = useRef(null);
  useEffect(() => {
    // Set the asNavFor property after the mainImageRef is initialized
    const imgNavSettings = {
      slidesToShow: 4,
      slidesToScroll: 1,
      focusOnSelect: true,
      asNavFor: mainImageRef.current,
      dots: false,
    };
    // Initialize the slider with the updated settings
    setImgNavSettings(imgNavSettings);
  }, []);

  const [imgNavSettings, setImgNavSettings] = useState({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: null, // Initialize with null
    dots: false,
    focusOnSelect: true,
  });

  const imgSliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  return (
    <>
      <Slider className="fz-product-details__img-slider" {...imgSliderSettings} ref={mainImageRef}>
        <img src="assets/images/product-det-1.jpg" alt="Product Image" />
        <img src="assets/images/product-det-2.jpg" alt="Product Image" />
        <img src="assets/images/product-det-3.jpg" alt="Product Image" />
        <img src="assets/images/product-det-4.jpg" alt="Product Image" />
      </Slider>

      <Slider className="fz-product-details__img-nav" {...imgNavSettings}>
        <img src="assets/images/product-det-1.jpg" alt="Product Image" />
        <img src="assets/images/product-det-2.jpg" alt="Product Image" />
        <img src="assets/images/product-det-3.jpg" alt="Product Image" />
        <img src="assets/images/product-det-4.jpg" alt="Product Image" />
      </Slider>
    </>
  );
};

export default ProductDetailSlider;
