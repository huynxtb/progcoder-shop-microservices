import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';

const ProductDetailSlider = ({ product }) => {
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

  // Prepare images array from product data
  const getImages = () => {
    if (product) {
      const images = [];
      // Add thumbnail if available
      if (product.thumbnail && product.thumbnail.publicURL) {
        images.push(product.thumbnail.publicURL);
      }
      // Add additional images if available
      if (product.images && Array.isArray(product.images)) {
        product.images.forEach(img => {
          if (img && img.publicURL && !images.includes(img.publicURL)) {
            images.push(img.publicURL);
          }
        });
      }
      // Return images if we have any, otherwise return defaults
      if (images.length > 0) {
        return images;
      }
    }
    // Default images if no product data
    return [
      "assets/images/product-det-1.jpg",
      "assets/images/product-det-2.jpg",
      "assets/images/product-det-3.jpg",
      "assets/images/product-det-4.jpg"
    ];
  };

  const images = getImages();

  return (
    <>
      <Slider className="fz-product-details__img-slider" {...imgSliderSettings} ref={mainImageRef}>
        {images.map((imgSrc, index) => (
          <img key={index} src={imgSrc} alt="Product Image" />
        ))}
      </Slider>

      <Slider className="fz-product-details__img-nav" {...imgNavSettings}>
        {images.map((imgSrc, index) => (
          <img key={index} src={imgSrc} alt="Product Image" />
        ))}
      </Slider>
    </>
  );
};

export default ProductDetailSlider;
