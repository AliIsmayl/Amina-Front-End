

import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";

import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const AddFoto = () => {
  const navigate = useNavigate();
  async function addFoto(values) {
    try {
      const formData = new FormData();
      formData.append("image", values.image);

      const res = await axios.post("https://amina-back-end.onrender.com/foto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/foto");
      toast.success("Successfully added!");
    } catch (error) {
      console.error("Error adding Foto:", error);
      toast.error("Failed to add Foto");
    }
  }

  return (
    <div className="adminpage">
         <div className="btn btn1">
            <Link to="/admin/foto">Foto siyahısına bax</Link>
        </div>
       <div className="text-center margi">
        <h2> Foto  əlavə et</h2>
      </div>
      <div className="formadd">
        <Formik
          initialValues={{
            image: null, 
          }}
          
          validationSchema={Yup.object({
            image: Yup.mixed().required("Required"),
          })}

          onSubmit={(values, { resetForm }) => {
            addFoto(values);
            resetForm();
          }}
        >
          <Form>
            <SpaCategoryFormFields />
            <button className="btn" type="submit">
            əlavə et
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

const SpaCategoryFormFields = () => {
  const { setFieldValue } = useFormikContext();

  return (
    <>
      

      <div className="inpp">
        <input
          name="image"
          type="file"
          onChange={(event) => {
            const file = event.currentTarget.files[0];
            setFieldValue("image", file);
          }}
        />
        <div className="red">
          <ErrorMessage name="image" />
        </div>
      </div>
    </>
  );
};

export default AddFoto;
