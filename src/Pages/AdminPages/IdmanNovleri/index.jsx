import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineDelete, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Swal from 'sweetalert2'
import { RiListSettingsLine } from "react-icons/ri";
import { Helmet } from "react-helmet-async";

const IdmanNovleriAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editedIdmanNovleri, setEditedIdmanNovleri] = useState(null);
  const [search, setSearch] = useState("");
  const [property, setProperty] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  async function getData() {
    const res = await axios("https://amina-back-end.onrender.com/idmanNovleri");
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
        await deleteIdmanNovleri(id);
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
  

  async function deleteIdmanNovleri(id) {
    await axios.delete(`https://amina-back-end.onrender.com/idmanNovleri/${id}`);
    getData();
  }

  async function editIdmanNovleri(id, values) {
    await axios.put(`https://amina-back-end.onrender.com/idmanNovleri/${id}`, values);
    toast.success("Dəyişildi!");
    setShowModal(false);
    getData();
  }

  const openEditModal = (IdmanNovleri) => {
    setEditedIdmanNovleri(IdmanNovleri);
    setShowModal(true);
  };

  const toggleRowExpansion = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <Helmet>
        <title>Idman Növləri </title>
        </Helmet>
      <div className="adminpage">
        <div className="userpage">
          <div className="filterDD">
            <div className="addUser">
              <button className="btn">
                <Link to="/admin/addIdmanNovleri"> İdman növü əlavə et</Link>
              </button>
            </div>
            <div className="filter">
              <input
                type="search"
                placeholder="Ada gore axtar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div
                onClick={() => setProperty({ name: "tittle", asc: true })}
                className="btn"
              >
                A-Z
              </div>
              <div
                onClick={() => setProperty({ name: "tittle", asc: false })}
                className="btn"
              >
                Z-A
              </div>
              <div
                onClick={() => setProperty({ name: "tittle", asc: null })}
                className="btn"
              >
                Default
              </div>
            </div>
          </div>
          <div className="usertable">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tittle</th>
                    <th>Content</th>
                    <th>Yol</th>
                    <th><RiListSettingsLine /></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <span>Loading...</span>
                  ) : (
                    data &&
                    data
                      .filter((x) =>
                        x.tittle.toLowerCase().includes(search.toLowerCase())
                      )
                      .sort((a, b) => {
                        if (property && property.asc === true) {
                          return a[property.name] < b[property.name] ? -1 : 1;
                        } else if (property && property.asc === false) {
                          return a[property.name] > b[property.name] ? -1 : 1;
                        } else {
                          return 0;
                        }
                      })
                      .map((IdmanNovleri) => (
                        <React.Fragment key={IdmanNovleri._id}>
                          <tr >
                            <td className="sport-name">{IdmanNovleri.tittle}</td>
                            <td > <p className="content-p">{IdmanNovleri.content}</p></td>
                            <td>{IdmanNovleri.name}</td>
                            <td>
                              <button
                                onClick={()=>openModal(IdmanNovleri._id)}
                                className="btn"
                              >
                                <AiOutlineDelete />
                              </button>
                              <button
                                onClick={() => openEditModal(IdmanNovleri)}
                                className="btn"
                              >
                                <CiEdit />
                              </button>
                              <button
                                onClick={() => toggleRowExpansion(IdmanNovleri._id)}
                                className="btn"
                              >
                                {expandedRows[IdmanNovleri._id] ? (
                                  <AiOutlineUp />
                                ) : (
                                  <AiOutlineDown />
                                )}
                              </button>
                            </td>
                          </tr>
                          {expandedRows[IdmanNovleri._id] &&
                            IdmanNovleri.Alt.map((alt, index) => (
                              <tr  key={`${IdmanNovleri._id}-${index}`}>
                                <td  className="pl-10 sport-name">-- {alt.tittle}</td>
                                <td><p className="content-p">{alt.content}</p></td>
                                <td>{alt.name}</td>
                                <td></td>
                              </tr>
                            ))}
                        </React.Fragment>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal" onClick={() => setShowModal(false)}></div>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Düzəliş et</h2>
            <Formik
              initialValues={{
                tittle: editedIdmanNovleri.tittle || "",
                content: editedIdmanNovleri.content || "",
                name: editedIdmanNovleri.name || "",
                Alt: editedIdmanNovleri.Alt || [{ name: "", tittle: "", content: "" }],
              }}
              validationSchema={Yup.object({
                tittle: Yup.string().required("Xanani doldur"),
                content: Yup.string(),
                name: Yup.string(),
                Alt: Yup.array().of(
                  Yup.object().shape({
                    name: Yup.string().required("Xanani doldur"),
                    tittle: Yup.string(),
                    content: Yup.string(),
                  })
                ),
              })}
              onSubmit={(values) => {
                editIdmanNovleri(editedIdmanNovleri._id, values);
              }}
            >
              {({ values }) => (
                <Form>
                   <h6>əsas məzmun  </h6>
                  <div className="inpp">
                    <Field name="tittle" type="text" placeholder="Tittle" />
                    <div className="red">
                      <ErrorMessage name="tittle" />
                    </div>
                  </div>

                  <div className="inpp">
                    <Field name="content" type="text" placeholder="Content" />
                    <div className="red">
                      <ErrorMessage name="content" />
                    </div>
                  </div>

                  <div className="inpp">
                    <Field name="name" type="text" placeholder="Name" />
                    <div className="red">
                      <ErrorMessage name="name" />
                    </div>
                  </div>

                  <FieldArray  name="Alt">
                    {({ insert, remove, push }) => (
                      <div>
                        <h6 className="alt-h">alt məzmun  </h6>
                        {values.Alt.length > 0 &&
                          values.Alt.map((alt, index) => (
                            <div className="nested-form" key={index}>
                              
                              <div className="inpp">
                                <Field
                                  name={`Alt.${index}.tittle`}
                                  type="text"
                                  placeholder="Alt Tittle"
                                />
                                <div className="red">
                                  <ErrorMessage name={`Alt.${index}.tittle`} />
                                </div>
                              </div>
                              <div className="inpp">
                                <Field
                                  name={`Alt.${index}.content`}
                                  type="text"
                                  placeholder="Alt Content"
                                />
                                <div className="red">
                                  <ErrorMessage name={`Alt.${index}.content`} />
                                </div>
                              </div>
                              <div className="inpp">
                                <Field
                                  name={`Alt.${index}.name`}
                                  type="text"
                                  placeholder="Alt Name"
                                />
                                <div className="red">
                                  <ErrorMessage name={`Alt.${index}.name`} />
                                </div>
                              </div>
                              <button
                                type="button"
                                className="btn"
                                onClick={() => remove(index)}
                              >
                                 Alt məzmunu sil
                              </button>
                            </div>
                          ))}
                        <button
                          type="button"
                          className="btn"
                          onClick={() => push({ name: "", tittle: "", content: "" })}
                        >
                           Alt məzmun əlavə et
                        </button>
                      </div>
                    )}
                  </FieldArray>

                  <div className="di">
                    <button className="btn" type="submit">
                    düzəliş et
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </>
  );
};

export default IdmanNovleriAdmin;
