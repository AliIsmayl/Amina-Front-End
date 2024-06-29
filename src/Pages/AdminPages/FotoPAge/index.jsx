import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { RiListSettingsLine } from "react-icons/ri";
import Swal from 'sweetalert2'


const FotoAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [editedFotoId, setEditedFotoId] = useState(null); // State to hold the ID of the Foto item being edited

  async function getData() {
    const res = await axios("https://amina-back-end.onrender.com/foto");
    setData(res.data);
    setLoading(false);
  }

  async function deleteFoto(id) {
    const res = await axios.delete(`https://amina-back-end.onrender.com/foto/${id}`);
    getData();
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
        await deleteFoto(id);
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
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleImageUpload = async () => {
    console.log("Image:", image);
    console.log("Edited Foto ID:", editedFotoId);
    
    try {
      if (!image || !editedFotoId) {
        console.error("No image selected or no Foto id provided!");
        return;
      }
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.put(
        `https://amina-back-end.onrender.com/foto/${editedFotoId}`, // Use editedFotoId here
        formData
      );
      toast.success('Successfully edited!');
      setImage(null);
      setShowModal(false)
      getData()
    

    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (item) => {
    setEditedFotoId(item._id); // Set the id of the edited Foto item
    setShowModal(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      
      <>
        <div className="adminpage">
          <div className="userpage">
          <div className="filterDD">
              <div className="addUser">
              <button className='btn'><Link to="/admin/addFoto"> Foto əlavə et</Link></button>
            </div>
           
            </div>

            <div className="usertable">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>şəkil</th>
                      <th><RiListSettingsLine /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <span>loading...</span>
                    ) : (
                      data &&
                      data.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <img src={item.image} alt="" />
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
              <input type="file" onChange={handleImageChange} />
              <div className="di">
                <button className="btn" onClick={handleImageUpload}>
                düzəliş et
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default FotoAdmin;
