import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import UserCard from './UserCard';
import Pagination from '../Shared/Pagination';
import Spinner from '../Shared/Spinner';
import Alert from '../Shared/Alert';
import './Users.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/users?page=${currentPage}`);
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
        setError('');
      } catch (err) {
        setError('Failed to fetch users. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      setSuccess('User deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>User List</h2>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
      
      {success && <Alert type="success" message={success} />}
      {error && <Alert type="error" message={error} />}
      
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="users-grid">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={handleDelete}
              />
            ))}
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default UserList;