import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const createUser = async (userData) => {
  const response = await axios.post('http://localhost:5000/api/user/create', userData);
  return response.data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

const loginUser = async (userData) => {
  const response = await axios.post('http://localhost:5000/api/user/Login', userData);
  return response.data; // should include both token and user data from backend
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // ✅ Store both token and user data
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      if (data?.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};