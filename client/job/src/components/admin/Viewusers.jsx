import React from 'react'
import "../styles/Admin.css"
import { MyContext } from './../../index';
import { useContext, useState, useEffect } from 'react';
import { api } from './../../axios';
import { FiDelete, FiLock, FiUnlock } from 'react-icons/fi';
import toast from 'react-hot-toast';
const Viewusers = () => {
  const {user}=useContext(MyContext);
  const [users, setusers] = useState([])
  const { isAuthorized } = useContext(MyContext);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/job/admin/allusers');
        
        if (Array.isArray(response.data.users)) {
          
          const filteredUsers = response.data.users.filter(u => u.role !== 'Admin');
          setusers(filteredUsers.reverse());
        }

      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (user && user.role === 'Admin') {
      fetchUsers();
    }
  }, [user]);
  const handleBlock = async (userId) => {
    try {
      await api.patch(`/job/admin/block/${userId}`);
      console.log(userId, "hi");
      setusers(users.map(u => u._id === userId ? { ...u, Blocked: true } : u));
      toast.success("User has been blocked successfully.");
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  };

  const handleUnblock = async (userId) => {
    try {
      await api.patch(`/job/admin/unblock/${userId}`);
      console.log(userId, "hi");
      setusers(users.map(u => u._id === userId ? { ...u, Blocked: false } : u));
      toast.success("User has been unblocked successfully.");
    } catch(err){
      console.log(err);
      
    }
  };
 

  if (!isAuthorized || !user || user.role !== 'Admin') {
    return <div>Access Denied</div>;
  }
  return (
      
    
    <div className='all-users'>
      <h1 className="users-title">ALL USERS</h1>
      
    <div className="users-container">
      {users.length === 0 ? (
        <p className="no-users">No users found</p>
      ) : (
        <div className="users-list">
          <span className="users-subtitle">Total users:  {users.length}</span>
         <div className="tablewrapper">
         <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneno}</td>
                  <td>{user.role}</td>
                  <td>{user.Blocked ? 'Yes' : 'No'}</td>
                
                  <td>
                    {
                      user.Blocked ?(  <button className="unblock-btn" onClick={() => handleUnblock(user._id)}>
                      <FiUnlock /> Unblock
                    </button>):(
                       <button className="block-btn" onClick={() => handleBlock(user._id)}>
                       <FiLock /> Block
                     </button>
                    )
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          
        </div>
      )}
    </div>
  </div>
  )
}

export default Viewusers