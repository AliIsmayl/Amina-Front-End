import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link } from 'react-router-dom'
import { RiListSettingsLine } from "react-icons/ri";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'

const MedalAdmin = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [editedMedal, setEditedMedal] = useState(null); 
 

  async function getData() {
    const res = await axios("https://amina-back-end.onrender.com/medal");
    setData(res.data);
    setLoading(false)
  }

  

  async function deleteMedal(id) {
    const res = await axios.delete(`https://amina-back-end.onrender.com/medal/${id}`);
    setData((prevData)=>prevData.filter((item)=>item._id !== id))
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
        await deleteMedal(id);
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
  async function editMedal(id, values) {
    const res = await axios.put(`https://amina-back-end.onrender.com/medal/${id}`, values);
    toast.success("Successfully edited!");
    setShowModal(false);
    getData();
  }

  const openEditModal = (Medal) => { 
    setEditedMedal(Medal); 
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
              <button className='btn'><Link to="/admin/addMedal">Medal əlavə et</Link></button>
            </div>
            
            </div>
            <div className="usertable">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      {/* <th>id</th> */}
                      <th>qızıl</th>
                      <th>gümüş</th>
                      <th>burunc</th>
                      
                      <th><RiListSettingsLine /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? <span>loading...</span> :
                      (data && data
                        .map(Medal => (
                        <tr key={Medal._id}>
                          {/* <td>{Medal._id}</td> */}
                          <td>{Medal.qold}</td>
                          <td>{Medal.silver}</td>
                          <td>{Medal.bronz}</td>
                          

                          <td>
                            <button  onClick={()=>openModal(Medal._id)} className='btn'><AiOutlineDelete /></button>
                            <button onClick={() => openEditModal(Medal)} className='btn'><CiEdit /></button>
                          </td>
                        </tr>
                      )))
                    }
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        </div>

        {showModal && (
          <>
          <div className="modal" onClick={() => setShowModal(false)}>
            </div>
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <h2>düzəliş et</h2>
              <Formik
                initialValues={{ qold: editedMedal.qold || '', silver: editedMedal.silver || '',bronz: editedMedal.bronz || ''  }}
                validationSchema={Yup.object({
                  qold: Yup.number()
                    
                    ,
                  silver: Yup.number()
                    
                    ,
                    bronz: Yup.number()
                    
                    ,
                 
                })}
                onSubmit={(values) => {
                  editMedal(editedMedal._id, values);

                }}
              >
                <Form>


                  <div className="inpp">
                    <Field name="qold" type="number" placeholder="qold" />
                    <div className="red"><ErrorMessage name="qold" /></div>
                  </div>

                  <div className="inpp">
                    <Field name="silver" type="number" placeholder="silver" />
                    <div className="red"><ErrorMessage name="silver" /></div>
                  </div>

                  <div className="inpp">
                    <Field name="bronz" type="number" placeholder="bronz" />
                    <div className="red"><ErrorMessage name="bronz" /></div>
                  </div>

                  <div className="di">
 <button className="btn" type="submit">
 düzəliş et
                    </button>
</div>
                </Form>
              </Formik>
            </div>
            </>
        )}
      </>
    </>
  )
}

export default MedalAdmin;
