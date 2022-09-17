import React, { useState, useEffect } from 'react';
import { useStateContext } from './context/StateContext.jsx';

import { motion } from 'framer-motion';

import { Pagination, Navigation, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import "../css/styles.css";

const WSPGallery = () => {

    const [openModal, setOpenModal] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);

    const { fetchDocs, setNewDocs, docs, initialized, gridRef, gridHeight } = useStateContext();

    let params = {
        modules: [Pagination, Navigation, Lazy],
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
        },
        // pagination: {
        //   //el: ".swiper-pagination",
        //   type: "bullets",
        //   clickable: true
        // },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        //pagination: true,
        //navigation: true,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        initialSlide: initialSlide,
        className: "mySwiper"
        //getSwiper: updateSwiper // Get swiper instance callback
      };

    useEffect(() => {

            fetchDocs();

    }, []);  

    useEffect(() => {

        if(!docs && initialized){
            setNewDocs();
        };

    }, [docs]); 

    const handleOpenModal = (index) => {
        setOpenModal(true)
        setInitialSlide(index)
        document.body.style.overflow = 'hidden'
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        document.body.style.overflow = 'scroll'
    }

  return (
    <div>
        {openModal &&  
            <>
                <Swiper {...params}>
                    {docs.map((doc, index) => {
                        return <SwiperSlide key={index}>
                            <img data-src={doc.galleryurl} key={index} alt={`${doc.country}.`} className="swiper-lazy"></img>
                            </SwiperSlide>
                    })}
                </Swiper>
                <FontAwesomeIcon icon={faCircleXmark} className='btnClose' onClick={handleCloseModal}/> 
          </>   
        }
        <div ref={gridRef} className="img-grid" style={{height: gridHeight}}>
            { docs && docs.map((img, index) => {
                    return (
                    <motion.div className="img-wrap" key={index} 
                        layout
                        whileHover={{ opacity: 1 }}
                        onClick={() => handleOpenModal(index, img.country)}>
                        <motion.img loading="lazy" src={img.thumburl} alt="uploaded pic" 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        />
                    </motion.div>
                    )
            })}
        </div>   
    </div>
  )
}

export default WSPGallery