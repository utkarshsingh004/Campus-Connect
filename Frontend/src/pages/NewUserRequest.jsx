// NewUser.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function NewUser() {
  const { fetchNewUsers, newUsers, loading } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch new users on mount
  useEffect(() => {
    fetchNewUsers();
  }, []);

  // Keep local users state in sync with global context
  useEffect(() => {
    setUsers(newUsers);
  }, [newUsers]);

  const handleAddUser = (user) => {
    navigate(
      `/register?name=${encodeURIComponent(user.collegeName || user.name)}&email=${encodeURIComponent(user.email)}`
    );
    setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All New Users</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-2 border">{user._id}</td>
                <td className="p-2 border">{user.collegeName || user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                    onClick={() => handleAddUser(user)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default NewUser;
