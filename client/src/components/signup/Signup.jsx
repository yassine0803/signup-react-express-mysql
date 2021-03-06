import styles from "./Signup.module.css";
import camera from "../../images/camera.png";
import check from "../../images/check.png";
import cancel from "../../images/cancel.png";
import { useState } from "react";
import { uploadImage, postData, url } from "../../api";
import { useHistory } from "react-router-dom";

const Signup = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    profileImg: "",
    galleryImg: [],
  });
  const [newUser, setNewUser] = useState(true);
  const [checkPass, setCheckPass] = useState({
    caracters: false,
    number: false,
    long: false,
  });

  const uploadImageProfile = async (e) => {
    uploadImage("/images/upload", e)
      .then((response) => {
        if (response.status === 201)
          setUser((oldUser) => ({
            ...oldUser,
            profileImg: response.data.filename,
          }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadImageGallery = async (e) => {
    uploadImage("/images/upload", e)
      .then((response) => {
        if (response.status === 201)
          setUser((oldUser) => ({
            ...oldUser,
            galleryImg: [...oldUser.galleryImg, response.data.filename],
          }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkUsername = async () => {
    console.log("Checking");
    postData("/users/check-user", {
      username: user.username,
    })
      .then((response) => {
        if (response.status !== 201) setNewUser(false);
      })
      .catch((error) => {
        setNewUser(true);
        console.log(error);
      });
  };

  const handleChangePass = (e) => {
    let password = e.target.value;
    if (password.length >= 8)
      setCheckPass((values) => ({ ...values, long: true }));
    else setCheckPass((values) => ({ ...values, long: false }));
    if (/[a-z]/.test(password) && /[A-Z]/.test(password))
      setCheckPass((values) => ({ ...values, caracters: true }));
    else setCheckPass((values) => ({ ...values, caracters: false }));
    if (/(?=.*[0-9])/.test(password) || /(?=.*[!@#$%^&*])/.test(password))
      setCheckPass((values) => ({ ...values, number: true }));
    else setCheckPass((values) => ({ ...values, number: false }));
    if (checkPass.caracters && checkPass.number && checkPass.long)
      setUser((values) => ({ ...values, password: e.target.value }));
  };

  const handleChangeInput = (e) => {
    setUser((values) => ({
      ...values,
      [e.target.name]: e.target.value.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, ""),
    }));
  };
  //regester user
  const hundleSubmit = async (e) => {
    e.preventDefault();
    if (
      newUser &&
      checkPass.caracters &&
      checkPass.number &&
      checkPass.long &&
      user.name &&
      user.username &&
      user.email &&
      user.profileImg &&
      user.galleryImg.length
    ) {
      await postData("/users/signup", user)
        .then((response) => {
          localStorage.setItem("profile", JSON.stringify({ ...response.data }));
          history.push("/profile/" + response.data.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>
        <span className={styles.title__right}>june</span>fox
      </h1>
      <h2 className={styles.signup__title}>Sign Up</h2>
      <p className={styles.signup__paragraph}>
        {" "}
        You need a JuneFox account to continue
      </p>
      <div className={styles.signup}>
        <form className={styles.form} onSubmit={hundleSubmit}>
          <div className={styles.form__avatar}>
            {!user.profileImg && (
              <div className={styles.avatar_edit}>
                <input
                  onChange={uploadImageProfile}
                  type="file"
                  className={styles.avatar_input}
                  id="profileImg"
                  accept=".png, .jpg, .jpeg"
                />
                <label className={styles.avatar_label} htmlFor="profileImg">
                  <img className={styles.avatar_upload} src={camera} alt="" />
                </label>
              </div>
            )}
            <div className={!user.profileImg ? styles.avatar_preview : ""}>
              {user.profileImg && (
                <div className={styles.avatar_image}>
                  <img
                    src={`${url}/uploads/${user.profileImg}`}
                    alt=""
                    className={styles.image_preview}
                  />
                </div>
              )}
            </div>
          </div>
          <input
            required
            name="name"
            onChange={handleChangeInput}
            className={styles.form__input}
            type="text"
            placeholder="Name"
          />
          <input
            required
            className={newUser ? styles.form__input : styles.input_error}
            name="username"
            type="text"
            placeholder="Username"
            onBlur={checkUsername}
            onChange={handleChangeInput}
          />
          {!newUser && (
            <span className={styles.username_error}>
              Username already taken
            </span>
          )}
          <input
            required
            onChange={handleChangeInput}
            className={styles.form__input}
            name="email"
            type="email"
            placeholder="Email Adress"
          />
          <input
            required
            className={styles.form__input}
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChangePass}
          />
          <ul className={styles.password_check_list}>
            Your password need to:
            <li
              className={
                !checkPass.caracters ? styles.regles_error : styles.regles_true
              }
            >
              <img
                className={styles.check_cancel}
                alt=""
                src={checkPass.caracters ? check : cancel}
              />
              include both upper and lower case characters.
            </li>
            <li
              className={
                !checkPass.number ? styles.regles_error : styles.regles_true
              }
            >
              <img
                className={styles.check_cancel}
                alt=""
                src={checkPass.number ? check : cancel}
              />
              include at least one number or symbol.
            </li>
            <li
              className={
                !checkPass.long ? styles.regles_error : styles.regles_true
              }
            >
              <img
                className={styles.check_cancel}
                alt=""
                src={checkPass.long ? check : cancel}
              />
              Be at least 8 characters long.
            </li>
          </ul>
          <div className={styles.form__gallery}>
            <div className={styles.gallery_image}>
              <div className={styles.gallery}>
                <div
                  className={
                    user.galleryImg.length === 0
                      ? styles.avatar_edit
                      : styles.avatar_hide
                  }
                >
                  <input
                    type="file"
                    className={styles.avatar_input}
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    onChange={uploadImageGallery}
                  />
                  <label className={styles.avatar_label} htmlFor="imageUpload">
                    <img className={styles.avatar_upload} src={camera} alt="" />
                  </label>
                </div>
                <div className={styles.avatar_preview}>
                  {user.galleryImg.length > 0 && (
                    <div className={styles.avatar_image}>
                      <img
                        src={`${url}/uploads/${user.galleryImg[0]}`}
                        alt=""
                        className={styles.image_preview}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.gallery}>
                <div
                  className={
                    user.galleryImg.length < 2
                      ? styles.avatar_edit
                      : styles.avatar_hide
                  }
                >
                  <input
                    type="file"
                    className={styles.avatar_input}
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    onChange={uploadImageGallery}
                  />
                  <label className={styles.avatar_label} htmlFor="imageUpload">
                    <img className={styles.avatar_upload} src={camera} alt="" />
                  </label>
                </div>
                <div className={styles.avatar_preview}>
                  {user.galleryImg.length > 1 && (
                    <div className={styles.avatar_image}>
                      <img
                        src={`${url}/uploads/${user.galleryImg[1]}`}
                        alt=""
                        className={styles.image_preview}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.gallery}>
                <div
                  className={
                    user.galleryImg.length < 3
                      ? styles.avatar_edit
                      : styles.avatar_hide
                  }
                >
                  <input
                    type="file"
                    className={styles.avatar_input}
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    onChange={uploadImageGallery}
                  />
                  <label className={styles.avatar_label} htmlFor="imageUpload">
                    <img className={styles.avatar_upload} src={camera} alt="" />
                  </label>
                </div>
                <div className={styles.avatar_preview}>
                  {user.galleryImg.length > 2 && (
                    <div className={styles.avatar_image}>
                      <img
                        src={`${url}/uploads/${user.galleryImg[2]}`}
                        alt=""
                        className={styles.image_preview}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button className={styles.form__button}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
