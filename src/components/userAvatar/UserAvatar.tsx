import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserProvider";
import supabase from "../../utils/supabase";

const UserAvatar = () => {
    const { user } = useUserContext();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (user) downloadImage(user.id);
    }, [user]);

    const downloadImage = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .storage
                .from('avatar')
                .download(`${userId}/avatar.png`);
                
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

            const { error: uploadError } = await supabase
                .storage
                .from('avatar')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            downloadImage(user!.id);
        } catch (error) {
            console.log('Error uploading avatar: ', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="avatar-container">
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="avatar-image"
                    style={{ height: 100, width: 100, borderRadius: '50%', objectFit: 'cover' }}
                />
            ) : (
                <div className="avatar-placeholder"
                    style={{ height: 100, width: 100, borderRadius: '50%', backgroundColor: '#e2e8f0' }}
                />
            )}
            <div className="avatar-upload">
                <label className="upload-button" htmlFor="single">
                    {uploading ? 'Uploading ...' : 'Upload Avatar'}
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
    );
};

export default UserAvatar;