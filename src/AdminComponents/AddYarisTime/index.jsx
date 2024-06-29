import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import "./index.scss"
import { Link, Navigate, useNavigate } from "react-router-dom";
const AddYaris = () => {
    const navigate = useNavigate();
  async function addYaris(values) {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("time", values.time);
      formData.append("image", values.image);

      const res = await axios.post("https://amina-back-end.onrender.com/yaris", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      toast.success("Əlavə edildi!");
      navigate("/admin/yaris");
    } catch (error) {
      console.error("Error adding Spa Category:", error);
      toast.error("Failed to add Spa Category");
    }
  }

  return (
    <div className="adminpage">
        <div className="btn btn1">
            <Link to="/admin/yaris">Yaris siyahısına bax</Link>
        </div>
       <div className="text-center margi">
        <h2>Idmançı əlavə et</h2>
      </div>
      <div className="formadd">
        <Formik
          initialValues={{
            title: "",
            time: "",
            image: null, 
          }}
          
          validationSchema={Yup.object({
            title: Yup.string().required("Required"),
            time: Yup.string(),
            image: Yup.mixed(),
          })}

          onSubmit={(values, { resetForm }) => {
            addYaris(values);
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
        <Field name="title" type="text" placeholder="title" />
        <div className="red">
          <ErrorMessage name="title" />
        </div>
      </div>

      <div className="inpp">
        <Field name="time" type="text" placeholder="vaxt" />
        <div className="red">
          <ErrorMessage name="time" />
        </div>
      </div>

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

export default AddYaris;
