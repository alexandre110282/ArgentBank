import React, { useEffect, useState } from 'react';
import EditProfileForm from '../Components/EditProfilForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../Redux/api/callAuth.jsx';
import Transactions from '../Components/Transactions.jsx';

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const storedToken = sessionStorage.getItem('token'); // Continuer d'utiliser sessionStorage ici

  useEffect(() => {
    const fetchData = async () => {
      if (storedToken) { // Vérification si le token existe avant de faire l'appel
        try {
          await fetchUserProfile(storedToken, dispatch); // Utiliser directement storedToken
        } catch (error) {
          console.error('Une erreur s\'est produite lors de la récupération du profil :', error);
        }
      }
    };

    fetchData();
  }, [storedToken, dispatch]); // Utiliser uniquement storedToken et dispatch dans les dépendances

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        {!isEditing && <h1>Welcome back<br />{user.userName}</h1>}
        {isEditing ? (
          <EditProfileForm onCancel={() => setIsEditing(false)} />
        ) : (
          <div className='edit-button-container'>
            <button className="edit-button" onClick={handleEditButtonClick}>
              Modifier le nom
            </button>
          </div>
        )}
      </div>
      <Transactions />
    </main>
  );
};

export default UserProfile;