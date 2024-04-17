import loginIcons from '../assest/signin.gif'
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {toast} from "react-toastify";
import SummaryApi from "../common";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleOnChange = (e) => {
    const {name, value} = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data)
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate('/');
      fetchUserDetails();
    }

    if (dataApi.error) {
      toast.error(dataApi.message)
    }
  }

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded-md">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
            <img src={loginIcons} alt="login icon"/>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                    <span>
                      {showPassword ? (
                        <FaEyeSlash/>
                      ) : (
                        <FaEye/>
                      )}
                    </span>
                </div>
              </div>
              <Link to={"/forget-password"} className="block w-fit ml-auto hover:underline hover:text-red-600">
                Forget password ?
              </Link>
            </div>

            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>

          <p className="my-5 text-center">
            Don't have account ?
            <Link to={"/sign-up"} className="text-red-600 hover:text-red-700 hover:underline"> Sign Up</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login;