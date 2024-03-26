import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ActivateAccount } from '../Services/apiServices';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

const AccountActivation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await ActivateAccount(token);
        if (response.status === 200) {
          // Activation successful, redirect to login page
          toast.success('Account Activation Success! Login to Continue..')
          navigate('/');
        } else {
            toast.error(`Activation Failed! or Invalid Token!`);
          console.error('Activation failed:', response.data);
          // Handle activation failure
        }
      } catch (error) {
        toast.error(`Activation Failed! or Invalid Token!`);
        console.error('Error activating account:', error);
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    activateAccount();
  }, [token, history]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loading ? <CircularProgress /> : <p>Activation completed. Redirecting...</p>}
    </div>
  );
};

export default AccountActivation;
