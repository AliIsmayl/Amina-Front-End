import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const AddMedal = () => {
  const navigate = useNavigate();
  async function AddMedal(values) {
    const res = await axios.post("https://amina-back-end.onrender.com/medal", values);
    toast.success("Əlavə edildi!");
    navigate("/admin/medal");
  }

  return (
    <div className="adminpage">
      <div className="btn1 btn">
        <Link to="/admin/medal">Medal siyahısına bax</Link>
      </div>
      <div className="text-center margi">
        <h2>Medal əlavə et</h2>
      </div>
      <div className="formadd">
        <Formik
          initialValues={{ qold: "", silver: "", bronz: "" }}
          validationSchema={Yup.object({
            qold: Yup.number().required("Required"),
            silver: Yup.number().required("Required"),
            bronz: Yup.number()
          })}
          onSubmit={(values, { resetForm }) => {
            AddMedal(values);
            resetForm();
          }}
        >
          <Form>
            <div className="inpp">
              <Field name="qold" type="number" placeholder="qold" />
              <div className="red">
                <ErrorMessage name="qold" />
              </div>
            </div>

            <div className="inpp">
              <Field name="silver" type="number" placeholder="silver" />
              <div className="red">
                <ErrorMessage name="silver" />
              </div>
            </div>

            <div className="inpp">
              <Field name="bronz" type="number" placeholder="bronz" />
              <div className="red">
                <ErrorMessage name="bronz" />
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

export default AddMedal;
