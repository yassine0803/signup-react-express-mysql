import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import camera from '../../images/camera_white.png';
import draw from '../../images/draw.png';
import check from '../../images/check.png';
import { getData, uploadImage, postData, updateData, url } from '../../api';
import styles from './Profile.module.css';

const Profile = () => {
    const { id } = useParams();
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState(false);
    const [username, setUsername] = useState(false);
    const [newUser, setNewUser] = useState(true);
    const [profileGallery, setProfileGallery] = useState([]);

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

    const fetUsergallery = async () => {
        const { data } = await getData('/images/gallery/user/' + id);
        setProfileGallery(data);
    }

    const handleChangeInput = (e) => {
        if (e.target.value.length)
            setUser(values => ({ ...values, [e.target.name]: e.target.value }));
    }
    const hundleUploadImage = async (e, currentImage) => {
        const { data } = await uploadImage('/images/edit-profile-image/' + currentImage, e);
        setUser(oldvalues => ({ ...oldvalues, profileImg: data.filename }))

    }
    const hundleUploadGallery = async (e, currentImage) => {
        const { data } = await uploadImage('/images/edit-gallery-image/' + currentImage, e);
        let objIndex = profileGallery.findIndex((obj => obj.image === currentImage));
        profileGallery[objIndex] = { image: data.filename };
        setProfileGallery([]);
        setProfileGallery(profileGallery);
    }

    const hundleSubmit = async () => {
        if (newUser) {
            const { status } = await updateData('/users/' + user.id, user);
            if (status === 201) {
                fetchUser();
                setEdit(false);
            }
            else {
                console.log('error');
            }
        }
    }
    useEffect(() => {
        fetchUser();
        fetUsergallery();
    }, [id]);
    return (
        <div className={styles.root}>
            <h1 className={styles.profile__title}>
                Profile
            </h1>
            {user.name && <div className={styles.profile}>
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
                    {!name ? <span className={styles.input_preview}>{user?.name}</span> : <input name="name" placeholder={user.name} className={styles.input_edit} onBlur={() => setName(false)} onChange={handleChangeInput} />}
                    {edit && <img className={styles.image_upload} src={name ? check : draw} alt="" onClick={() => { setName(!name); setUsername(false) }} />}
                </div>
                <div className={styles.profile_username}>
                    {!username ? <span className={styles.input_preview}>{user?.username}</span> : <input name="username" placeholder={user.username} className={newUser ? styles.input_edit : styles.input_edit_error} onChange={handleChangeInput} onBlur={() => { checkUsername(); setUsername(false) }} />}
                    {edit && <img className={styles.image_upload} src={username ? check : draw} alt="" onClick={() => { setUsername(!username); setName(false) }} />}
                    {!newUser && <div className={styles.username_error}>Username already taken</div>}
                </div>
                <button className={styles.edit_button} onClick={() => edit ? hundleSubmit() : setEdit(true)}>Edit Profile</button>
            </div>}
            {profileGallery && profileGallery.length > 0
                &&
                <div className={styles.profile__gallery}>

                    {profileGallery.map((img) => (
                        <div key={img.image} className={styles.image_container}>
                            {edit && <div className={styles.gallery_edit}>
                                <input type='file' className={styles.gallery_input} id={img.image} accept=".png, .jpg, .jpeg" onChange={(e) => hundleUploadGallery(e, img.image)} />
                                <label className={styles.gallery_label} htmlFor={img.image}>
                                    <img className={styles.image_upload} src={draw} alt="" />
                                </label>
                            </div>}
                            <img src={`${url}/uploads/${img.image}`} alt="" className={styles.gallery_image} />
                        </div>
                    ))}

                </div>
            }
            {loading && <div className={styles.profil__loader}></div>}
        </div>
    );
}

export default Profile;