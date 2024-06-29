import React from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const AddXeberler = () => {
  const navigate = useNavigate();

  async function addXeberler(values) {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("name", values.name);

      if (values.image1) formData.append("image1", values.image1);
      if (values.image2) formData.append("image2", values.image2);
      if (values.image3) formData.append("image3", values.image3);
      if (values.image4) formData.append("image4", values.image4);

      const res = await axios.post("https://amina-back-end.onrender.com/xeberler", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Əlavə edildi!");
      navigate("/admin/xeberler");
    } catch (error) {
      console.error("Error adding Xeberler:", error);
      toast.error("Failed to add Xeberler");
    }
  }

  return (
    <div className="adminpage">
      <div className="btn btn1">
        <Link to="/admin/xeberler">Xəbər siyahısına bax</Link>
      </div>
      <div className="text-center margi">
        <h2>Xəbər əlavə et</h2>
      </div>
      <div className="formadd">
        <Formik
          initialValues={{
            title: "",
            name: "",
            content: "",
            image1: null,
            image2: null,
            image3: null,
            image4: null,
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Required"),
            name: Yup.string().required("Required"),
            content: Yup.string(),
            image1: Yup.mixed().notRequired(),
            image2: Yup.mixed().notRequired(),
            image3: Yup.mixed().notRequired(),
            image4: Yup.mixed().notRequired() ,
          })}
          onSubmit={(values, { resetForm }) => {
            addXeberler(values);
            resetForm();
          }}
        >
          <Form>
            <XeberlerFormFields />
            <button className="btn" type="submit">
              əlavə et
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

const XeberlerFormFields = () => {
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <div className="inpp">
        <Field name="title" type="text" placeholder="ad" />
        <div className="red">
          <ErrorMessage name="title" />
        </div>
      </div>
      <div className="inpp">
        <Field name="name" type="text" placeholder="yol" />
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
        <input
          name="image1"
          type="file"
          onChange={(event) => {
            const file = event.currentTarget.files[0];
            setFieldValue("image1", file);
          }}
        />
        <div className="red">
          <ErrorMessage name="image1" />
        </div>
      </div>
      <div className="inpp">
        <input
          name="image2"
          type="file"
          onChange={(event) => {
            const file = event.currentTarget.files[0];
            setFieldValue("image2", file);
          }}
        />
        <div className="red">
          <ErrorMessage name="image2" />
        </div>
      </div>
      <div className="inpp">
        <input
          name="image3"
          type="file"
          onChange={(event) => {
            const file = event.currentTarget.files[0];
            setFieldValue("image3", file);
          }}
        />
        <div className="red">
          <ErrorMessage name="image3" />
        </div>
      </div>
      <div className="inpp">
        <input
          name="image4"
          type="file"
          onChange={(event) => {
            const file = event.currentTarget.files[0];
            setFieldValue("image4", file);
          }}
        />
        <div className="red">
          <ErrorMessage name="image4" />
        </div>
      </div>
    </>
  );
};

export default AddXeberler;
