import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext"; // Update this path if needed

function HostDashboard() {
  const { fetchAllUsers, allUsers, loading } = useAuth();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-2 border">{user._id}</td>
                <td className="p-2 border">{user.collageName || user.name}</td>
                <td className="p-2 border">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HostDashboard;
