import { useEffect, useState } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User, Ghost } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import AuthImagePattern from "../Components/AuthImagePattern";

const Update = () => {
  const navigate = useNavigate()
  const {userId} = useParams()

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    avatar: ""
  });

  const { updateUser, isUpdatingProfile, updateUserReqStatus: { isSuccess, isError, error, }, authUser, updateUserResData } = useAuthStore();


  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataObj = new FormData()
    formDataObj.append("fullname", formData.fullname)
    formDataObj.append("email", formData.email)
    formDataObj.append("avatar", formData.avatar)

    useAuthStore.setState((state) => ({
      updateUserReqStatus: {
        ...state.updateUserReqStatus,
        isSuccess: false,
        isError: false,
        error: null,
      },
    }));

    updateUser({formData: formDataObj, userId})
  };

  useEffect(() => {
    if (isSuccess && updateUserResData?.message) {
      toast.success(updateUserResData.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {

        navigate(`/user/${userId}/profile`);
      }, 1500);
    }

    if (isError && error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [isSuccess, isError, updateUserResData, error]);


  return (
    <div className="h-screen grid lg:grid-cols-2  ">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full sm:w-[80%] md:max-w-md mx-auto space-y-5">
          {/* LOGO */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-1 group">
              <div
                className="size-10 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-5 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Update Profile</h1>
              <p className="text-base-content/60">Make changes to your account information</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Fullname
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="New Name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="new@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium"> Profile Avatar </span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                name="avatar"
                onChange={handleChange} />
            </div>

            <div className="form-control">
              <button type="submit" className="btn btn-primary w-full" disabled={isUpdatingProfile}>
                {isUpdatingProfile ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    "Updating..."
                  </>
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* right side */}

      <AuthImagePattern
        title="Keep your profile up to date"
        subtitle="Update your information to get the best experience."
      />


      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
export default Update;