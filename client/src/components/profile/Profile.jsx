import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import camera from '../../images/camera_white.png';
import { getData, url } from '../../api';
import styles from './Profile.module.css';

const Profile = () => {
    const { id } = useParams();
    const [edit, setEdit] = useState(true);
    const [user, setUser] = useState({});
    const fetchUser = async () => {
        const { data } = await getData('/users/' + id);
        setUser(data);
        console.log(data);
    }
    useEffect(() => {
        fetchUser();
    }, [id]);
    return (
        <div className={styles.root}>
            <div className={styles.profile}>
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
            </div>
        </div>
    );
}

export default Profile;