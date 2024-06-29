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

const ContactAdmin = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [editedContact, setEditedContact] = useState(null); 
  const [search, setSearch] = useState('')
  const [property, setProperty] = useState(null)

  async function getData() {
    const res = await axios("https://amina-back-end.onrender.com/contact");
    setData(res.data);
    setLoading(false)
  }

  

  async function deleteContact(id) {
    const res = await axios.delete(`https://amina-back-end.onrender.com/contact/${id}`);
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
        await deleteContact(id);
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
  async function editContact(id, values) {
    const res = await axios.put(`https://amina-back-end.onrender.com/contact/${id}`, values);
    toast.success("Successfully edited!");
    setShowModal(false);
    getData();
  }

  const openEditModal = (Contact) => { 
    setEditedContact(Contact); 
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
              <button className='btn'><Link to="/admin/addContact">Contact əlavə et</Link></button>
            </div>
            {/* <div className="filter">
    <input type="search" placeholder='Search by name...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
    <div onClick={()=>setProperty({name:"location",asc:true})} className="btn">a-z</div>
    <div onClick={()=>setProperty({name:"location",asc:false})} className="btn">z-a</div>
     <div onClick={()=>setProperty({name:"location",asc:null})} className="btn">default</div>
</div> */}
            </div>
            <div className="usertable">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      {/* <th>id</th> */}
                      <th>ünvan</th>
                      <th>nömrə</th>
                      <th>email</th>
                      
                      <th><RiListSettingsLine /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? <span>loading...</span> :
                      (data && data
    //                     .filter(x=>x.location.toLowerCase().includes(search.toLowerCase()))
    // .sort((a,b)=>{
    //     if (property && property.asc===true) {
    //         return a[property.name]<b[property.name] ? -1 : (a[property.name]<b[property.name] ? 1 : 0)
    //     }
    //     else if (property && property.asc===false) {
    //         return a[property.name]>b[property.name] ? -1 : (a[property.name]>b[property.name] ? 1 : 0)
    //     }
    //     else{
    //         return 0;
    //     }
    // })
                        .map(Contact => (
                        <tr key={Contact._id}>
                          {/* <td>{Contact._id}</td> */}
                          <td>{Contact.location}</td>
                          <td>{Contact.number}</td>
                          <td>{Contact.email}</td>
                          

                          <td>
                            <button  onClick={()=>openModal(Contact._id)} className='btn'><AiOutlineDelete /></button>
                            <button onClick={() => openEditModal(Contact)} className='btn'><CiEdit /></button>
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
                initialValues={{ location: editedContact.location || '', number: editedContact.number || '',email: editedContact.email || ''  }}
                validationSchema={Yup.object({
                  location: Yup.string()
                    
                    ,
                  number: Yup.string()
                    
                    ,
                    email: Yup.string().email("invalid email")
                    
                    ,
                 
                })}
                onSubmit={(values) => {
                  editContact(editedContact._id, values);

                }}
              >
                <Form>


                  <div className="inpp">
                    <Field name="location" type="text" placeholder="location" />
                    <div className="red"><ErrorMessage name="location" /></div>
                  </div>

                  <div className="inpp">
                    <Field name="number" type="text" placeholder="number" />
                    <div className="red"><ErrorMessage name="number" /></div>
                  </div>

                  <div className="inpp">
                    <Field name="email" type="email" placeholder="email" />
                    <div className="red"><ErrorMessage name="email" /></div>
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

export default ContactAdmin;
