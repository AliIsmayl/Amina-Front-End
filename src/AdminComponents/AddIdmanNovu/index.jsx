import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const AddIdmanNovleri = () => {
  const [showAltFields, setShowAltFields] = useState(false);
  const navigate = useNavigate();
  async function AddIdmanNovleri(values) {
    try {
      const res = await axios.post("https://amina-back-end.onrender.com/idmanNovleri", values);
      toast.success('Əlavə edildi!');
      navigate("/admin/idmanNovleri");
    } catch (error) {
      toast.error('Xəta baş verdi!');
    }
  }

  return (
    <div className="adminpage">
       <div className="btn btn1">
            <Link to="/admin/idmanNovleri">İdman növlərinin siyahısına bax</Link>
        </div>
      <div className="text-center margi">
        <h2>Idman Növü əlavə et</h2>
      </div>
      <div className='formadd'>
        <Formik
          initialValues={{
            tittle: '',
            content: '',
            name: '',
            Alt: [{ name: '', tittle: '', content: '' }],
          }}
          validationSchema={Yup.object({
            tittle: Yup.string().required('Required'),
            content: Yup.string(),
            name: Yup.string().required('Required'),
            Alt: Yup.array().of(
              Yup.object().shape({
                name: Yup.string(),
                tittle: Yup.string(),
                content: Yup.string(),
              })
            )
          })}
          onSubmit={(values, { resetForm }) => {
            AddIdmanNovleri(values);
            resetForm();
            setShowAltFields(false); // Reset the state after form submission
          }}
        >
          {({ values }) => (
            <Form>
              <div className="inpp">
                <Field name="tittle" type="text" placeholder="tittle" />
                <div className="red"><ErrorMessage name="tittle" /></div>
              </div>

              <div className="inpp">
                <Field name="content" type="text" placeholder="content" />
                <div className="red"><ErrorMessage name="content" /></div>
              </div>

              <div className="inpp">
                <Field name="name" type="text" placeholder="name" />
                <div className="red"><ErrorMessage name="name" /></div>
              </div>

              {showAltFields ? (
                <FieldArray name="Alt">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.Alt.length > 0 && values.Alt.map((alt, index) => (
                        <div className="nested-form" key={index}>
                          <div className="inpp">
                            <Field name={`Alt.${index}.name`} type="text" placeholder="Alt Name" />
                            <div className="red"><ErrorMessage name={`Alt.${index}.name`} /></div>
                          </div>
                          <div className="inpp">
                            <Field name={`Alt.${index}.tittle`} type="text" placeholder="Alt tittle" />
                            <div className="red"><ErrorMessage name={`Alt.${index}.tittle`} /></div>
                          </div>
                          <div className="inpp">
                            <Field name={`Alt.${index}.content`} type="text" placeholder="Alt Content" />
                            <div className="red"><ErrorMessage name={`Alt.${index}.content`} /></div>
                          </div>
                         
                        </div>
                      ))}
                     
                      <button
                        type="button"
                        className='btn'
                        onClick={() => setShowAltFields(false)}
                      >
                        Alt kategoriya kapat
                      </button>
                    </div>
                  )}
                </FieldArray>
              ) : (
                <button
                  type="button"
                  className='btn'
                  onClick={() => setShowAltFields(true)}
                >
                  Alt kategoriya əlave et
                </button>
              )}
<div className="div">
   <button className='btn' type="submit">Əlavə et</button>
</div>
             
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddIdmanNovleri;
