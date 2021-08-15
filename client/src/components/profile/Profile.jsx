import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import camera from '../../images/camera_white.png';
import draw from '../../images/draw.png';
import { getData, uploadImage, postData, updateData, url } from '../../api';
import styles from './Profile.module.css';

const Profile = () => {
    const { id } = useParams();
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState(false);
    const [username, setUsername] = useState(false);
    const [oldImages, setOldImages] = useState([]);
    const [newUser, setNewUser] = useState(true);

    const checkUsername = async () => {
        console.log('Checking');
        const result = await postData('/users/check-user', { username: user.username });
        if (result.status !== 201)
            setNewUser(false)
        else
            setNewUser(true)
    }

    const fetchUser = async () => {
        const { data } = await getData('/users/' + id);
        setUser(data);
        setLoading(false);
    }

    const handleChangeInput = (e) => {
        if (e.target.value.length)
            setUser(values => ({ ...values, [e.target.name]: e.target.value }));
    }
    const hundleUploadImage = async (e, currentImage) => {
        setOldImages(values => ([...values, currentImage]));
        const { data } = await uploadImage('/images/upload', e);
        setUser((values) => ({ ...values, profileImg: data.filename }))

    }
    const hundleUploadGallery = async (e, currentImage) => {
        setOldImages(values => ([...values, currentImage]));
        const { data } = await uploadImage('/images/upload', e);
        user.galleryImg.splice(user.galleryImg.indexOf(currentImage), 1, data.filename);
        setUser((values) => ({ ...values, galleryImg: user.galleryImg }))

    }

    const hundleSubmit = async () => {
        const { data } = await updateData('/users/' + user._id, user);
        setUser(data);
        setEdit(false);
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
                        <input type='file' className={styles.edit_input} id="profileImg" accept=".png, .jpg, .jpeg" onChange={(e) => hundleUploadImage(e, user.profileImg)} />
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
                <div className={styles.profile_name}>
                    {!edit && user?.name}
                    {edit && <input name="name" placeholder={user.name} className={name ? styles.input_edit : styles.input_preview} onBlur={() => setName(false)} onChange={handleChangeInput} />}
                    {edit && <img className={styles.image_upload} src={draw} alt="" onClick={() => setName(true)} />}
                </div>
                <div className={styles.profile_username}>
                    {!edit && user?.username}
                    {edit && <input name="username" placeholder={user.username} className={username ? styles.input_edit : styles.input_preview} onChange={handleChangeInput} onBlur={() => { checkUsername(); setUsername(false) }} />}
                    {edit && <img className={styles.image_upload} src={draw} alt="" onClick={() => setUsername(true)} />}
                    {!newUser && <div className={styles.username_error}>Username already taken</div>}
                </div>
                <button className={styles.edit_button} onClick={() => edit ? hundleSubmit() : setEdit(true)}>Edit Profile</button>
                {user.galleryImg && user.galleryImg.length > 0
                    &&
                    <div className={styles.profile__gallery}>

                        {user.galleryImg.map((img) => (
                            <div key={img} className={styles.image_container}>
                                {edit && <div className={styles.gallery_edit}>
                                    <input type='file' className={styles.gallery_input} id={img} accept=".png, .jpg, .jpeg" onChange={(e) => hundleUploadGallery(e, img)} />
                                    <label className={styles.gallery_label} htmlFor={img}>
                                        <img className={styles.image_upload} src={draw} alt="" />
                                    </label>
                                </div>}
                                <img src={`${url}/uploads/${img}`} alt="" className={styles.gallery_image} />
                            </div>
                        ))}

                    </div>
                }
            </div>}
            {loading && <div className={styles.profil__loader}></div>}
        </div>
    );
}

export default Profile;