import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
const AddRehberlik = () => {
    const navigate = useNavigate();
  async function addRehberlik(values) {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("position", values.position);
      formData.append("image", values.image);

      const res = await axios.post("https://amina-back-end.onrender.com/rehberlik", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      toast.success("Əlavə edildi!");
      navigate("/admin/rehberlik");
    } catch (error) {
      console.error("Error adding Spa Category:", error);
      toast.error("Failed to add Rehberlik");
    }
  }

  return (
    <div className="adminpage">
        <div className="btn btn1">
            <Link to="/admin/rehberlik">Rehberliklər siyahısına bax</Link>
        </div>
       <div className="text-center margi">
        <h2>Rəhbərlik əlavə et</h2>
      </div>
      <div className="formadd">
        <Formik
          initialValues={{
            title: "",
            position: "",
            image: null, 
          }}
          
          validationSchema={Yup.object({
            title: Yup.string().required("Required"),
            position: Yup.string(),
            image: Yup.mixed(),
          })}

          onSubmit={(values, { resetForm }) => {
            addRehberlik(values);
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
        <Field name="title" type="text" placeholder="pozisiya" />
        <div className="red">
          <ErrorMessage name="title" />
        </div>
      </div>

      <div className="inpp">
        <Field name="position" type="text" placeholder="Ad" />
        <div className="red">
          <ErrorMessage name="position" />
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

export default AddRehberlik;
