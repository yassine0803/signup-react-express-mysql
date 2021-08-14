import styles from './Signup.module.css';
import camera from '../../images/camera.png';
import check from '../../images/check.png';
import cancel from '../../images/cancel.png';
import { useState } from 'react';
import { uploadImage, postData } from '../../api';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    let history = useHistory();
    const url = process.env.REACT_APP_API_URL || 'http://localhost:5000' ;
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        profileImg: '',
        galleryImg: []
    });
    const [newUser, setNewUser] = useState(true);
    const [checkPass, setCheckPass] = useState({
        caracters: false,
        number: false,
        long: false
    });
    const upload = async (e) => {
        const fd = new FormData();
        fd.append('file', e.target.files[0]);
        const { data } = await uploadImage('/images/upload', fd);
        return data;

    }
    const uploadImageProfile = async (e) => {
        const fd = new FormData();
        fd.append('file', e.target.files[0]);
        const { data } = await uploadImage('/images/upload', fd);
        setUser(oldUser => ({ ...oldUser, profileImg: data.filename }));
    }

    const uploadImageGallery = async (e) => {
        const fd = new FormData();
        fd.append('file', e.target.files[0]);
        const { data } = await uploadImage('/images/upload', fd);
        setUser(oldUser => ({ ...oldUser, profileImg: oldUser.profileImg, galleryImg: [...oldUser.galleryImg, data.filename] }));
    }
    const checkUsername = async () => {
        const result = await postData('/users/check-user', { username: user.username });
        if (result.status !== 201)
            setNewUser(false)
        else
            setNewUser(true)
    }

    const handleChangePass = (e) => {
        let password = e.target.value;
        if (password.length >= 8)
            setCheckPass(values => ({ ...values, long: true }))
        else
            setCheckPass(values => ({ ...values, long: false }))
        if (/[a-z][A-Z]/.test(password))
            setCheckPass(values => ({ ...values, caracters: true }))
        else
            setCheckPass(values => ({ ...values, caracters: false }))
        if (/(?=.*[0-9])/.test(password) || /(?=.*[!@#$%^&*])/.test(password))
            setCheckPass(values => ({ ...values, number: true }))
        else
            setCheckPass(values => ({ ...values, number: false }))
        if(checkPass.caracters && checkPass.number && checkPass.long) setUser(values => ({ ...values, password: e.target.value}))
    }

    const handleChangeInput =(e)=>{
        setUser(values =>({...values, [e.target.name]: e.target.value}))
    }
    //regester user
    const hundleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await postData('/users/signup', user);
        localStorage.setItem('profile', JSON.stringify({ ...data }));
        history.push('/profile');
        } catch (error) {
            console.log(error);
        }
        
    }
    return (
        <div className={styles.root}>
            <h1 className={styles.title}>
                <span className={styles.title__right}>june</span>fox
            </h1>
            <div className={styles.signup}>
                <h2 className={styles.signup__title}>Sign Up</h2>
                <p className={styles.signup__paragraph}> You need a JuneFox account to continue</p>
                <form className={styles.form} onSubmit={hundleSubmit}>
                    <div className={styles.form__avatar}>
                        {!user.profileImg &&
                            <div className={styles.avatar_edit}>
                                <input onChange={uploadImageProfile} type='file' className={styles.avatar_input} id="profileImg" accept=".png, .jpg, .jpeg" />
                                <label className={styles.avatar_label} htmlFor="profileImg">
                                    <img className={styles.avatar_upload} src={camera} alt="" />
                                </label>
                            </div>
                        }
                        <div className={!user.profileImg ? styles.avatar_preview : ''}>
                            {user.profileImg &&
                                <div className={styles.avatar_image} >
                                    <img src={`${url}/uploads/${user.profileImg}`} alt="" className={styles.image_preview} />
                                </div>}
                        </div>
                    </div>
                    <input required name="name" onChange={handleChangeInput} className={styles.form__input} type="text" placeholder="Name" />
                    <input required className={newUser ? styles.form__input : styles.input_error} name="username" type="text" placeholder="Username" onBlur={checkUsername} onChange={handleChangeInput} />
                    {!newUser && <span className={styles.username_error}>Username already taken</span>}
                    <input required onChange={handleChangeInput} className={styles.form__input} name="email" type="email" placeholder="Email Adress" />
                    <input required className={styles.form__input} name="password" type="password" placeholder="Password" onChange={handleChangePass} />
                    <ul className={styles.password_check_list}>
                        Your password need to:
                        <li className={!checkPass.caracters ? styles.regles_error : styles.regles_true}><img className={styles.check_cancel} alt="" src={checkPass.caracters ? check : cancel} />include both upper and lower case characters.</li>
                        <li className={!checkPass.number ? styles.regles_error : styles.regles_true}><img className={styles.check_cancel} alt="" src={checkPass.number ? check : cancel} />include at least one number or symbol.</li>
                        <li className={!checkPass.long ? styles.regles_error : styles.regles_true}><img className={styles.check_cancel} alt="" src={checkPass.long ? check : cancel} />Be at least 8 characters long.</li>
                    </ul>
                    <div className={styles.form__gallery}>
                        <div className={styles.gallery_image} >
                            <div className={styles.gallery}>
                                <div className={user.galleryImg.length === 0 ? styles.avatar_edit : styles.avatar_hide}>
                                    <input type='file' className={styles.avatar_input} id="imageUpload" accept=".png, .jpg, .jpeg" onChange={uploadImageGallery} />
                                    <label className={styles.avatar_label} htmlFor="imageUpload">
                                        <img className={styles.avatar_upload} src={camera} alt="" />
                                    </label>
                                </div>
                                <div className={styles.avatar_preview}>
                                    {user.galleryImg.length > 0 &&
                                        <div className={styles.avatar_image} >
                                            <img src={`${url}/uploads/${user.galleryImg[0]}`} alt="" className={styles.image_preview} />
                                        </div>}
                                </div>
                            </div>
                            <div className={styles.gallery}>
                                <div className={user.galleryImg.length < 2 ? styles.avatar_edit : styles.avatar_hide}>
                                    <input type='file' className={styles.avatar_input} id="imageUpload" accept=".png, .jpg, .jpeg" onChange={uploadImageGallery} />
                                    <label className={styles.avatar_label} htmlFor="imageUpload">
                                        <img className={styles.avatar_upload} src={camera} alt="" />
                                    </label>
                                </div>
                                <div className={styles.avatar_preview}>
                                    {user.galleryImg.length > 1 &&
                                        <div className={styles.avatar_image} >
                                            <img src={`${url}/uploads/${user.galleryImg[1]}`} alt="" className={styles.image_preview} />
                                        </div>}
                                </div>
                            </div>
                            <div className={styles.gallery}>
                                <div className={user.galleryImg.length < 3 ? styles.avatar_edit : styles.avatar_hide}>
                                    <input type='file' className={styles.avatar_input} id="imageUpload" accept=".png, .jpg, .jpeg" onChange={uploadImageGallery} />
                                    <label className={styles.avatar_label} htmlFor="imageUpload">
                                        <img className={styles.avatar_upload} src={camera} alt="" />
                                    </label>
                                </div>
                                <div className={styles.avatar_preview}>
                                    {user.galleryImg.length > 2 &&
                                        <div className={styles.avatar_image} >
                                            <img src={`${url}/uploads/${user.galleryImg[2]}`} alt="" className={styles.image_preview} />
                                        </div>}
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