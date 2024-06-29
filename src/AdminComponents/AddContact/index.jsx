import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const AddContact = () => {
  const navigate = useNavigate();
  async function AddContact(values) {
    const res = await axios.post("https://amina-back-end.onrender.com/contact", values);
    toast.success("Əlavə edildi!");
    navigate("/admin/contact");
  }

  return (
    <div className="adminpage">
      <div className="btn1 btn">
        <Link to="/admin/contact">Contact siyahısına bax</Link>
      </div>
      <div className="text-center margi">
        <h2>Contact əlavə et</h2>
      </div>
      <div className="formadd">
        <Formik
          initialValues={{ location: "", number: "", email: "" }}
          validationSchema={Yup.object({
            location: Yup.string(),
            number: Yup.string().required("Required"),
            email: Yup.string().email("invalid email"),
          })}
          onSubmit={(values, { resetForm }) => {
            AddContact(values);
            resetForm();
          }}
        >
          <Form>
            <div className="inpp">
              <Field name="location" type="text" placeholder="location" />
              <div className="red">
                <ErrorMessage name="location" />
              </div>
            </div>

            <div className="inpp">
              <Field name="number" type="text" placeholder="number" />
              <div className="red">
                <ErrorMessage name="number" />
              </div>
            </div>

            <div className="inpp">
              <Field name="email" type="email" placeholder="email" />
              <div className="red">
                <ErrorMessage name="email" />
              </div>
            </div>

            <button className="btn" type="submit">
            əlavə et
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddContact;
