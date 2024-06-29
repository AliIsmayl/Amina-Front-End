import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { RiListSettingsLine } from "react-icons/ri";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Swal from 'sweetalert2'


const RehberlikAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editedRehberlik, setEditedRehberlik] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [search, setSearch] = useState('')
  const [property, setProperty] = useState(null)

  async function getData() {
    const res = await axios("https://amina-back-end.onrender.com/rehberlik");
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
        await deleteRehberlik(id);
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
  
  async function deleteRehberlik(id) {
    try {
      const res = await axios.delete(`https://amina-back-end.onrender.com/rehberlik/${id}`);
      setData((prevData)=>prevData.filter((item)=>item._id !== id))
    } catch (error) {
      console.log(error.message);
      throw new Error("Failed to delete Rehberlik");
    }
  }
  

  async function editRehberlik(id, values) {
    const res = await axios.put(`https://amina-back-end.onrender.com/rehberlik/${id}`, values);
    toast.success('Successfully edited!');
    getData();

    setShowModal(false);
  }

  const openEditModal = (item) => {
    setEditedRehberlik(item);
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
              <button className='btn'><Link to="/admin/addRehberlik">Rəhbər əlavə et</Link></button>
            </div>
            <div className="filter">
    <input type="search" placeholder='Ada gore axtar' value={search} onChange={(e)=>setSearch(e.target.value)}/>
    <div onClick={()=>setProperty({name:"title",asc:true})} className="btn">a-z</div>
    <div onClick={()=>setProperty({name:"title",asc:false})} className="btn">z-a</div>
     <div onClick={()=>setProperty({name:"title",asc:null})} className="btn">hammisi</div>
</div>
            </div>
            
            <div className="usertable">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>

                    <tr>
                      <th>şəkil</th>
                      <th>pozisiya</th>
                      <th>ad</th>

                      <th><RiListSettingsLine /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <span>yuklenir...</span>
                    ) : (
                      data &&
                      data
                      .filter(x=>x.position.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>{
        if (property && property.asc===true) {
            return a[property.name]<b[property.name] ? -1 : (a[property.name]<b[property.name] ? 1 : 0)
        }
        else if (property && property.asc===false) {
            return a[property.name]>b[property.name] ? -1 : (a[property.name]>b[property.name] ? 1 : 0)
        }
        else{
            return 0;
        }
    })
                      .map((item) => (
                        <tr key={item._id}>
                          <td><img src={item.image} alt="" /></td>
                          <td>{item.title}</td>
                          <td>{item.position}</td>

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
              <Formik
                initialValues={{
                  title: editedRehberlik.title || "",
                  position: editedRehberlik.position || "",
                }}
                validationSchema={Yup.object({
                  title: Yup.string().required("Required"),
                  position: Yup.string().required("Required"),
                  image: Yup.mixed().notRequired(), 
                })}
                onSubmit={(values) => {
                  const formData = new FormData();
                  formData.append("title", values.title);
                  formData.append("position", values.position);
                  if (selectedFile) {
                    formData.append("image", selectedFile);
                  }

                  editRehberlik(editedRehberlik._id, formData);
                }}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <div className="inpp">
                      <Field name="title" type="text" placeholder="pozisiya" />
                      <div className="red">
                        <ErrorMessage name="title" />
                      </div>
                    </div>

                    <div className="inpp">
                      <Field name="position" type="text" placeholder="ad" />
                      <div className="red">
                        <ErrorMessage name="position" />
                      </div>
                    </div>
                    

                    <div className="inpp">
                      <label className="custom-file-upload">
                      <input
                        type="file"
                        onChange={(event) => {
                          setSelectedFile(event.currentTarget.files[0]);
                          setFieldValue("image", event.currentTarget.files[0]);
                        }}
                      />
                      </label>
                      <div className="red">
                        <ErrorMessage name="image" />
                      </div>
                    </div>
<div className="di">
 <button className="btn" type="submit">
                      düzəliş et
                    </button>
</div>
                   
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default RehberlikAdmin;
