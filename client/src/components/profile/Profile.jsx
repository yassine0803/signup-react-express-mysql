import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import camera from '../../images/camera.png';
import draw from '../../images/draw.png';
import { getData, url } from '../../api';
import styles from './Profile.module.css';

const Profile = () => {
    const { id } = useParams();
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    
    const fetchUser = async () => {
        const { data } = await getData('/users/' + id);
        setUser(data);
        setLoading(false);
        console.log(data);
    }
    useEffect(() => {
        fetchUser();
    }, [id]);
    return (
        <div className={styles.root}>
            {user.name && <div className={styles.profile}>
                <h1 className={styles.profile__title}>
                    Profile
                </h1>
                <div className={styles.profile__avatar}>
                    {edit && <div className={styles.avatar_edit} >
                        <input type='file' className={styles.edit_input} id="profileImg" accept=".png, .jpg, .jpeg" />
                        <label className={styles.edit_label} htmlFor="profileImg">
                            <img className={styles.avatar_upload} src={camera} alt="" />
                        </label>
                    </div>}
                    <div className={edit ? styles.avatar_preview_new : styles.avatar_preview}>
                        {
                            user?.profileImg
                            &&
                            <img className={edit ? styles.avatar_iamge_edit : styles.avatar_iamge} src={`${url}/uploads/${user.profileImg}`} alt="" />
                        }
                    </div>
                </div>
                <div className={styles.profile_name}>{user?.name}</div>
                <div className={styles.profile_username}>@{user.username}</div>
                <button className={styles.edit_button} onClick={() => setEdit(true)}>Edit Profile</button>
                {user.galleryImg && user.galleryImg.length > 0 && <div className={styles.profile__gallery}>

                    {user.galleryImg.map((img) => (
                        <div key={img} className={styles.image_container}>
                            {edit && <div className={styles.gallery_edit}>
                                <input type='file' className={styles.gallery_input} id="profileImg" accept=".png, .jpg, .jpeg" />
                                <label className={styles.gallery_label} htmlFor="profileImg">
                                    <img className={styles.image_upload} src={draw} alt="" />
                                </label>
                            </div>}
                            <img src={`${url}/uploads/${img}`} alt="" className={styles.gallery_image} />
                        </div>
                    ))}

                </div>}
            </div>}
            {loading &&  <div className={styles.profil__loader}></div> }
        </div>
    );
}

export default Profile;