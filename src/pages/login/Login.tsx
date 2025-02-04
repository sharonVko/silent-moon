import React, { useEffect } from 'react';
import supabase from '../../utils/supabase';

export const Login = () => {
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from('yoga_meditation').select('*');

      console.log(data, error);
    };

    fetch();
  }, []);

  return <div>Login</div>;
};
