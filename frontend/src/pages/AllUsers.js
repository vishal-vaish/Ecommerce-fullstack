import {useEffect, useState} from "react";
import SummaryApi from "../common";
import {toast} from "react-toastify";
import moment from "moment";
import {MdModeEdit} from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include"
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUser(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, [])

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
        <tr className="bg-black text-white">
          <th>Sr.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Create Date</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {allUser.map((user, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{user?.name}</td>
            <td>{user?.email}</td>
            <td>{user?.role}</td>
            <td>{moment(user?.createdAt).format("LL")}</td>
            <td>
              <button
                className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                onClick={() => {
                  setUpdateUserDetails(user);
                  setOpenUpdateRole(true);
                }}
              >
                <MdModeEdit/>
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          user={updateUserDetails}
          onClose={() => setOpenUpdateRole(false)}
          callFunc={fetchAllUsers}
        />
      )

      }
    </div>
  )
}

export default AllUsers;