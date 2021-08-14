import styles from './Signup.module.css';
import camera from '../../images/camera.png';
import { useState } from 'react';
import { uploadImage, postData } from '../../api';

const Signup = () => {
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        profileImg: '',
        galleryImg: []
    });
    const [newUser, setNewUser] = useState(true);
    const upload = async (e) => {
        const fd = new FormData();
        fd.append('file', e.target.files[0]);
        const { data } = await uploadImage('/images/upload',fd);
        setUser(oldUser => ({ ...oldUser, profileImg: data.filename }));

    }
    const checkUsername = async()=>{
        const result = await postData('/users/check-user', {username: user.username});
        if(result.status !== 201) setNewUser(false)
    }
    return (
        <div className={styles.root}>
            <h1 className={styles.title}>
                <span className={styles.title__right}>june</span>fox
            </h1>
            <div className={styles.signup}>
                <h2 className={styles.signup__title}>Sign Up</h2>
                <p className={styles.signup__paragraph}> You need a JuneFox account to continue</p>
                <form className={styles.form}>
                    <div className={styles.form__avatar}>
                        {!user.profileImg &&
                            <div className={styles.avatar_edit}>
                                <input onChange={upload} type='file' className={styles.avatar_input} id="imageUpload" accept=".png, .jpg, .jpeg" />
                                <label className={styles.avatar_label} htmlFor="imageUpload">
                                    <img className={styles.avatar_upload} src={camera} alt="" />
                                </label>
                            </div>
                        }
                        <div className={!user.profileImg ? styles.avatar_preview : ''}>
                            {user.profileImg &&
                                <div className={styles.avatar_image} >
                                    <img src={`http://localhost:5000/uploads/${user.profileImg}`} alt="" className={styles.image_preview} />
                                </div>}
                        </div>
                    </div>
                    <input className={styles.form__input} name="Name" type="text" placeholder="Name" />
                    <input className={newUser ? styles.form__input : styles.input_error} name="Username"  type="text" placeholder="Username" onBlur={checkUsername} onChange={(e)=>setUser(olduser =>({...olduser, username: e.target.value}))} />
                    {!newUser && <span className={styles.username_error}>Username already taken</span>}
                    <input className={styles.form__input} name="email" type="email" placeholder="Email Adress" />
                    <input className={styles.form__input} name="password" type="password" placeholder="Password" />
                    <ul>
                        Your password need to:
                        <li>include both upper and lower case characters.</li>
                        <li>include at least one number or symbol.</li>
                        <li>Be at least 8 characters long.</li>
                    </ul>
                    <div className={styles.form__gallery}>
                        <div className={styles.gallery_image} >
                            <div className={styles.gallery}>
                                <div className={styles.avatar_edit}>
                                    <input type='file' className={styles.avatar_input} id="imageUpload" accept=".png, .jpg, .jpeg" />
                                    <label className={styles.avatar_label} htmlFor="imageUpload">
                                        <img className={styles.avatar_upload} src={camera} alt="" />
                                    </label>
                                </div>
                                <div className={styles.avatar_preview}>
                                    {/* <div id="imagePreview" >
                                <img src="http://i.pravatar.cc/500?img=7" width="100%" />
                            </div> */}
                                </div>
                            </div>
                            <div className={styles.gallery}>
                                <div className={styles.avatar_edit}>
                                    <input type='file' className={styles.avatar_input} id="imageUpload" accept=".png, .jpg, .jpeg" />
                                    <label className={styles.avatar_label} htmlFor="imageUpload">
                                        <img className={styles.avatar_upload} src={camera} alt="" />
                                    </label>
                                </div>
                                <div className={styles.avatar_preview}>
                                    {/* <div id="imagePreview" >
                                <img src="http://i.pravatar.cc/500?img=7" width="100%" />
                            </div> */}
                                </div>
                            </div>
                            <div className={styles.gallery}>
                                <div className={styles.avatar_edit}>
                                    <input type='file' className={styles.avatar_input} id="imageUpload" accept=".png, .jpg, .jpeg" />
                                    <label className={styles.avatar_label} htmlFor="imageUpload">
                                        <img className={styles.avatar_upload} src={camera} alt="" />
                                    </label>
                                </div>
                                <div className={styles.avatar_preview}>
                                    {/* <div id="imagePreview" >
                                <img src="http://i.pravatar.cc/500?img=7" width="100%" />
                            </div> */}
                                </div>
                            </div>

                        </div>
                    </div>
                    <button className={styles.form__button} >Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;