import React, { useEffect, useState } from 'react';
import './PhotoSection.scss';
import axios from 'axios';
import NotMean from '../../NotMean/NotMean';
import Modal from './Modal';
import { Helmet } from 'react-helmet-async';

function PhotoSection() {
    const [images, setImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    async function getimageData() {
        const res = await axios.get("https://amina-back-end.onrender.com/foto");
        setImages(res.data);
    }

    useEffect(() => {
        getimageData();
    }, []);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const handleCloseModal = () => {
        setSelectedImageIndex(null);
    };

    const handlePrev = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    const handleNext = () => {
        if (selectedImageIndex < images.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    const selectedImage = selectedImageIndex !== null ? images[selectedImageIndex].image : null;

    return (
        <>
         <Helmet>
        <title>Şəkillər</title>
        </Helmet>
            <NotMean />
            <div className='photoSection'>
                {images && images.map((item, index) => (
                    <div className="imgBox" key={index} onClick={() => handleImageClick(index)}>
                        <img src={item.image} alt="" />
                    </div>
                ))}
            </div>
            {selectedImage !== null && (
                <Modal
                    image={selectedImage}
                    onClose={handleCloseModal}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    hasPrev={selectedImageIndex > 0}
                    hasNext={selectedImageIndex < images.length - 1}
                />
            )}
        </>
    );
}

export default PhotoSection;
