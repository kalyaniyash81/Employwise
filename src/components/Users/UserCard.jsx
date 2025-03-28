import { useState } from 'react';
import { Link } from 'react-router-dom';
import EditUser from './EditUser';

const UserCard = ({ user, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="user-card">
      {isEditing ? (
        <EditUser 
          user={user} 
          onClose={() => setIsEditing(false)} 
        />
      ) : (
        <>
          <div className="user-avatar">
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
          </div>
          <div className="user-info">
            <h3>{user.first_name} {user.last_name}</h3>
            <p>{user.email}</p>
          </div>
          <div className="user-actions">
            <button 
              onClick={() => setIsEditing(true)}
              className="edit-btn"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(user.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCard;