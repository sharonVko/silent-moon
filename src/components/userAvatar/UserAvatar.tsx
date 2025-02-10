import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserProvider';
import supabase from '../../utils/supabase';
import { Logout } from '../../assets/svg/Logout';

const UserAvatar = () => {
  const { user, logoutFromSystem } = useUserContext();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) downloadImage(user.id);
  }, [user]);

  const downloadImage = async (userId: string) => {
    try {
      const { data, error } = await supabase.storage.from('avatar').download(`${userId}/avatar.png`);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error);
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('avatar').upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      downloadImage(user!.id);
    } catch (error) {
      console.log('Error uploading avatar: ', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center  gap-7 mb-7 justify-between">
      <div className="flex flex-col items-center">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            style={{ height: 100, width: 100, borderRadius: '50%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ height: 100, width: 100, borderRadius: '50%', backgroundColor: '#e2e8f0' }} />
        )}
        <div className="w-full text-center p-0.5">
          <label className="grey f-s-14 sans-pro-600 mt-2" htmlFor="single">
            {uploading ? 'Uploading ...' : avatarUrl ? 'Edit Avatar' : 'Upload Avatar'}
          </label>
          <input
            style={{
              visibility: 'hidden',
              position: 'absolute',
            }}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      </div>
      <div className="font-black text-4xl text-[#4A503D]">{user?.user_metadata.first_name}</div>
      <div className="flex flex-col justify-center items-center" onClick={logoutFromSystem}>
        {' '}
        <Logout /> Logout
      </div>
    </div>
  );
};

export default UserAvatar;
