import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { toast } from "react-toastify";
import { useUser } from "../providers/UserContext";

interface LoginFormValues {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LoginPage = () => {
  const { setUser, setToken } = useUser();
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const res = await login(values); 

      setUser({ 
        id: res.id, 
        email: res.email, 
        userName: res.userName || "", });

      setToken(res.token);
      localStorage.setItem("token", res.token); 

      toast.success("Logged in successfully");
      navigate("/recipes");
    } catch (err: any) {
      toast.error(err.message ?? "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-semibold text-slate-800">
          Login
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
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
                {isSubmitting ? "Please wait..." : "Login"}
              </button>

              <button
                type="button"
                className="w-full rounded-md border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
                onClick={() => navigate("/register")}
              >
                Create account
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
