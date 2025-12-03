import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { toast } from "react-toastify";

interface RegisterFormValues {
  userName: string;
  email: string;
  password: string;
}

const registerSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const RegisterPage = () => {
  const navigate = useNavigate();

  const initialValues: RegisterFormValues = {
    userName: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      await register({
        email: values.email,
        password: values.password,
        userName: values.userName,
      });

      toast.success("Account created successfully");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message ?? "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-semibold text-slate-800">
          Register
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="userName"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Username
                </label>
                <div className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2">
                  <Field
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="John"
                    className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  />
                </div>
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <div className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <div className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-emerald-700 disabled:opacity-70"
              >
                {isSubmitting ? "Please wait..." : "Create account"}
              </button>

              <button
                type="button"
                className="w-full rounded-md border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
                onClick={() => navigate("/")}
              >
                Back to login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
