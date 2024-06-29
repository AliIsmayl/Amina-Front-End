import React, { useEffect, useState } from 'react';
import './VideoSection.scss';
import axios from 'axios';
import NotMean from '../../NotMean/NotMean';
import { Helmet } from 'react-helmet-async';
import Modal from './ModalVideo';

function VideoSection() {
    const [videos, setVideos] = useState([]);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

    async function getVideoData() {
        const res = await axios.get("https://amina-back-end.onrender.com/video");
        setVideos(res.data);
    }

    useEffect(() => {
        getVideoData();
    }, []);

    const handleVideoClick = (index) => {
        setSelectedVideoIndex(index);
    };

    const handleCloseModal = () => {
        setSelectedVideoIndex(null);
    };

    const handlePrev = () => {
        if (selectedVideoIndex > 0) {
            setSelectedVideoIndex(selectedVideoIndex - 1);
        }
    };

    const handleNext = () => {
        if (selectedVideoIndex < videos.length - 1) {
            setSelectedVideoIndex(selectedVideoIndex + 1);
        }
    };

    const selectedVideo = selectedVideoIndex !== null ? videos[selectedVideoIndex].video : null;

    return (
        <>
         <Helmet>
            <title>Videolar</title>
        </Helmet>
            <NotMean />
            <div className='photoSection'>
                {videos && videos.map((item, index) => (
                    <div className="imgBox" key={index} onClick={() => handleVideoClick(index)}>
                        <video src={item.video} alt="" controls />
                    </div>
                ))}
            </div>
            {selectedVideo !== null && (
                <Modal
                    video={selectedVideo}
                    onClose={handleCloseModal}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    hasPrev={selectedVideoIndex > 0}
                    hasNext={selectedVideoIndex < videos.length - 1}
                />
            )}
        </>
    );
}

export default VideoSection;
