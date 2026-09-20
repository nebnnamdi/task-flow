import { useState, useEffect } from "react";
import { getAllUsers, updateUser } from "@/actions";
import { useGlobal } from "@/components/GlobalContext";

import { FaRegUser } from "react-icons/fa";

const UpdateProfile = () => {
  const { user } = useGlobal();

  const [currentUser, setCurrentUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function allUsers() {
      setLoading(true);

      const users = await getAllUsers();

      if (users) {
        const activeUser = users?.find((item) => item?.email === user?.email);

        setCurrentUser({
          name: activeUser?.name || "",
          email: activeUser?.email || "",
        });
      }
      setLoading(false);
    }

    allUsers();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-sm animate-pulse text-xs text-gray-400">
        Loading profile details...
      </div>
    );
  }

  const onChangeHandler = (e) => {
    const prevName = user.name;

    setCurrentUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
    };

    const response = await updateUser(userData);

    if (!response.success) {
      setCurrentUser((prev) => {
        return {
          ...prev,
          name: prevName,
        };
      });
    }

    alert(response.message);
  };

  return (
    <div className="bg-white p-4 rounded-sm">
      <div className="flex gap-4 items-center mb-4">
        <span className="bg-blue-100 p-2 rounded-md">
          <FaRegUser className="text-blue-500 " />
        </span>
        <span>
          <p className="text-sm font-semibold">Account</p>
          <p className="text-xs text-gray-500">
            Update your personal information
          </p>
        </span>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="flex flex-col md:flex-row gap-2 md:ml-12">
          <div className="flex flex-col pb-2 md:w-1/2">
            <label htmlFor="name" className="font-semibold text-xs">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={currentUser?.name}
              onChange={onChangeHandler}
              className="p-1 rounded-sm border border-gray-200 text-xs"
              required
            />
          </div>

          <div className="flex flex-col pb-2 md:w-1/2">
            <label htmlFor="email" className="font-semibold text-xs">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={currentUser?.email}
              onChange={onChangeHandler}
              className="p-1 text-xs cursor-not-allowed"
              readOnly
            />
          </div>
        </div>

        <div className="flex md:justify-end">
          <button className="bg-black text-white text-xs py-2 px-4 rounded-sm w-full md:w-auto cursor-pointer">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
