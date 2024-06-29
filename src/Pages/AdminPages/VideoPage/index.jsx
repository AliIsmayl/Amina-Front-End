import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { RiListSettingsLine } from "react-icons/ri";
import Swal from 'sweetalert2'

const VideoAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [video, setVideo] = useState(null);
  const [editedVideoId, setEditedVideoId] = useState(null);

  async function getData() {
    const res = await axios("https://amina-back-end.onrender.com/video");
    setData(res.data);
    setLoading(false);
  }

  async function openModal(id) {
    try {
      const result = await Swal.fire({
        title: "Sən əminsən?",
        text: "Bunu geri qaytara bilməyəcəksiniz!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "sil!"
      });
  
      if (result.isConfirmed) {
        await deleteVideo(id);
        Swal.fire({
          title: "Silindi!",
          text: "Faylınız silindi.",
          icon: "success"
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  

  async function deleteVideo(id) {
    try {
      const res = await axios.delete(`https://amina-back-end.onrender.com/video/${id}`);
      setData((prevData)=>prevData.filter((item)=>item._id !== id))
    } catch (error) {
      console.log(error.message);
      throw new Error("Failed to delete Mesqci");
    }
  }

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    setVideo(selectedVideo);
  };

  const handleVideoUpload = async () => {
    try {
      if (!video || !editedVideoId) {
        console.error("No video selected or no video ID provided!");
        return;
      }
      const formData = new FormData();
      formData.append("video", video);

      await axios.put(
        `https://amina-back-end.onrender.com/video/${editedVideoId}`,
        formData
      );
      toast.success('Successfully edited!');
      setVideo(null);
      setShowModal(false);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (item) => {
    setEditedVideoId(item._id);
    setShowModal(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="adminpage">
        <div className="userpage">
          <div className="filterDD">
            <div className="addUser">
              <button className='btn'><Link to="/admin/addVideo">  Video əlavə et</Link></button>
            </div>
          </div>

          <div className="usertable">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Video</th>
                    <th><RiListSettingsLine /></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <span>Loading...</span>
                  ) : (
                    data &&
                    data.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <video width="320" height="240" controls>
                            <source src={item.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </td>

                        <td>
                          <button
                            onClick={()=>openModal(item._id)}
                            className="btn"
                          >
                            <AiOutlineDelete />
                          </button>
                          <button
                            onClick={() => openEditModal(item)}
                            className="btn"
                          >
                            <CiEdit />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>düzəliş et</h2>
            <input type="file" onChange={handleVideoChange} />
            <div className="di">
              <button className="btn" onClick={handleVideoUpload}>
                düzəliş et
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoAdmin;
