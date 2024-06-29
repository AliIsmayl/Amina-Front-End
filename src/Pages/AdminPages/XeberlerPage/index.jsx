import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { RiListSettingsLine } from "react-icons/ri";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';


const XeberlerAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editedXeberler, setEditedXeberler] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [search, setSearch] = useState('');
  const [property, setProperty] = useState(null);

  async function getData() {
    const res = await axios("https://amina-back-end.onrender.com/xeberler");
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
        await deleteXeberler(id);
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
  
  async function deleteXeberler(id) {
    try {
      const res = await axios.delete(`https://amina-back-end.onrender.com/xeberler/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error.message);
      throw new Error("Failed to delete Xeberler");
    }
  }
  

  async function editXeberler(id, values) {
    const res = await axios.put(`https://amina-back-end.onrender.com/xeberler/${id}`, values);
    toast.success('Successfully edited!');
    getData();

    setShowModal(false);
  }

  const openEditModal = (item) => {
    setEditedXeberler(item);
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
              <button className='btn'><Link to="/admin/addXeberler">Xəbər əlavə et</Link></button>
            </div>
            <div className="filter">
              <input type="search" placeholder='Ada gore axtar' value={search} onChange={(e) => setSearch(e.target.value)} />
              <div onClick={() => setProperty({ name: "title", asc: true })} className="btn">a-z</div>
              <div onClick={() => setProperty({ name: "title", asc: false })} className="btn">z-a</div>
              <div onClick={() => setProperty({ name: "title", asc: null })} className="btn">hammisi</div>
            </div>
          </div>
          
          <div className="usertable">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>şəkil 1</th>
                    <th>şəkil 2</th>
                    <th>şəkil 3</th>
                    <th>şəkil 4</th>
                    <th>title</th>
                    <th>yol</th>
                    <th>content</th>
                    <th><RiListSettingsLine /></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <span>yuklenir...</span>
                  ) : (
                    data &&
                    data
                      .filter(x => x.title.toLowerCase().includes(search.toLowerCase()))
                      .sort((a, b) => {
                        if (property && property.asc === true) {
                          return a[property.name] < b[property.name] ? -1 : (a[property.name] < b[property.name] ? 1 : 0);
                        } else if (property && property.asc === false) {
                          return a[property.name] > b[property.name] ? -1 : (a[property.name] > b[property.name] ? 1 : 0);
                        } else {
                          return 0;
                        }
                      })
                      .map((item) => (
                        <tr key={item._id}>
                          <td><img src={item.image1} alt="" /></td>
                          <td><img src={item.image2} alt="" /></td>
                          <td><img src={item.image3} alt="" /></td>
                          <td><img src={item.image4} alt="" /></td>
                          <td><p className="content-p">{item.title}</p></td>
                          <td><p className="content-p">{item.name}</p></td>
                          <td> <p className="content-p">{item.content}</p></td>
                          <td>
                            <button onClick={() => openModal(item._id)} className="btn">
                              <AiOutlineDelete />
                            </button>
                            <button onClick={() => openEditModal(item)} className="btn">
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
                title: editedXeberler.title || "",
                content: editedXeberler.content || "",
                name: editedXeberler.name || "",
                image1: null,
                image2: null,
                image3: null,
                image4: null,
              }}
              validationSchema={Yup.object({
                title: Yup.string().required("Required"),
                name: Yup.string().required("Required"),
                content: Yup.string().required("Required"),
                image1: Yup.mixed().notRequired(),
                image2: Yup.mixed().notRequired(),
                image3: Yup.mixed().notRequired(),
                image4: Yup.mixed().notRequired(),
              })}
              onSubmit={(values) => {
                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("name", values.name);
                formData.append("content", values.content);
                if (selectedFiles.image1) {
                  formData.append("image1", selectedFiles.image1);
                }
                if (selectedFiles.image2) {
                  formData.append("image2", selectedFiles.image2);
                }
                if (selectedFiles.image3) {
                  formData.append("image3", selectedFiles.image3);
                }
                if (selectedFiles.image4) {
                  formData.append("image4", selectedFiles.image4);
                }

                editXeberler(editedXeberler._id, formData);
              }}
            >
              {({ setFieldValue }) => (
                <Form>
                  <div className="inpp">
                    <Field name="title" type="text" placeholder="title" />
                    <div className="red">
                      <ErrorMessage name="title" />
                    </div>
                  </div>
                  <div className="inpp">
                    <Field name="name" type="text" placeholder="name" />
                    <div className="red">
                      <ErrorMessage name="name" />
                    </div>
                  </div>
                  <div className="inpp">
                    <Field name="content" type="text" placeholder="content" />
                    <div className="red">
                      <ErrorMessage name="content" />
                    </div>
                  </div>

                  <div className="inpp">
                    <label className="custom-file-upload">
                      <input
                        type="file"
                        onChange={(event) => {
                          setSelectedFiles({ ...selectedFiles, image1: event.currentTarget.files[0] });
                          setFieldValue("image1", event.currentTarget.files[0]);
                        }}
                      />
                      şəkil 1
                    </label>
                    <div className="red">
                      <ErrorMessage name="image1" />
                    </div>
                  </div>

                  <div className="inpp">
                    <label className="custom-file-upload">
                      <input
                        type="file"
                        onChange={(event) => {
                          setSelectedFiles({ ...selectedFiles, image2: event.currentTarget.files[0] });
                          setFieldValue("image2", event.currentTarget.files[0]);
                        }}
                      />
                      şəkil 2
                    </label>
                    <div className="red">
                      <ErrorMessage name="image2" />
                    </div>
                  </div>

                  <div className="inpp">
                    <label className="custom-file-upload">
                      <input
                        type="file"
                        onChange={(event) => {
                          setSelectedFiles({ ...selectedFiles, image3: event.currentTarget.files[0] });
                          setFieldValue("image3", event.currentTarget.files[0]);
                        }}
                      />
                      şəkil 3
                    </label>
                    <div className="red">
                      <ErrorMessage name="image3" />
                    </div>
                  </div>

                  <div className="inpp">
                    <label className="custom-file-upload">
                      <input
                        type="file"
                        onChange={(event) => {
                          setSelectedFiles({ ...selectedFiles, image4: event.currentTarget.files[0] });
                          setFieldValue("image4", event.currentTarget.files[0]);
                        }}
                      />
                      şəkil 4
                    </label>
                    <div className="red">
                      <ErrorMessage name="image4" />
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
  );
};

export default XeberlerAdmin;
  