

import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";

import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const AddVideo = () => {
  const navigate = useNavigate();
  async function addVideo(values) {
    try {
      const formData = new FormData();
      formData.append("video", values.video);

      const res = await axios.post("https://amina-back-end.onrender.com/video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/video");
      toast.success("Successfully added!");
    } catch (error) {
      console.error("Error adding Video:", error);
      toast.error("Failed to add Video");
    }
  }

  return (
    <div className="adminpage">
         <div className="btn btn1">
            <Link to="/admin/Video">Video siyahısına bax</Link>
        </div>
       <div className="text-center margi">
        <h2> Video əlavə et</h2>
      </div>
      <div className="formadd">
        <Formik
          initialValues={{
            video: null, 
          }}
          
          validationSchema={Yup.object({
            video: Yup.mixed().required("Required"),
          })}

          onSubmit={(values, { resetForm }) => {
            addVideo(values);
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
          name="video"
          type="file"
          onChange={(event) => {
            const file = event.currentTarget.files[0];
            setFieldValue("video", file);
          }}
        />
        <div className="red">
          <ErrorMessage name="video" />
        </div>
      </div>
    </>
  );
};

export default AddVideo;
