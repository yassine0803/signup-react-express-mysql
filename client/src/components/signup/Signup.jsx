import styles from "./Signup.module.css";
import camera from "../../images/camera.png";
import check from "../../images/check.png";
import cancel from "../../images/cancel.png";
import { uploadImage, postData, url } from "../../api";
import React, { Component } from "react";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: "",
        username: "",
        email: "",
        password: "",
        profileImg: "",
        galleryImg: [],
      },
      newUser: true,
      checkPass: {
        caracters: false,
        number: false,
        long: false,
      },
    };
  }

  uploadImageProfile = async (e) => {
    const { data } = await uploadImage("/images/upload", e);
    this.setState({ user: { ...this.state.user, profileImg: data.filename } });
  };

  uploadImageGallery = async (e) => {
    const { data } = await uploadImage("/images/upload", e);
    this.setState({
      user: {
        ...this.state.user,
        galleryImg: [...this.state.user.galleryImg, data.filename],
      },
    });
  };
  checkUsername = async () => {
    const result = await postData("/users/check-user", {
      username: this.state.user.username,
    });
    if (result.status !== 201) this.setState({ newUser: false });
    else this.setState({ newUser: true });
  };

  handleChangePass = (e) => {
    let password = e.target.value;

    if (password.length >= 8) {
      this.setState({ checkPass: { long: true } });
    } else {
      this.setState({ checkPass: { long: false } });
    }
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      this.setState({
        checkPass: {  caracters: true },
      });
    } else {
      this.setState({
        checkPass: { caracters: false },
      });
    }
    if (/[0-9]/.test(password) || /[!@#$%^&*]/.test(password)) {
      this.setState({ checkPass: { number: true } });
    } else {
      this.setState({ checkPass: { number: false } });
    }

    if (
      this.state.checkPass.caracters &&
      this.state.checkPass.number &&
      this.state.checkPass.long
    )
      this.setState({ user: { ...this.state.user, password: e.target.value } });
  };

  handleChangeInput = (e) => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value },
    });
  };
  //regester user
  hundleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.user);
    if (
      this.state.newUser /*&&
      /*this.state.checkPass.caracters &&
      this.state.checkPass.number &&
      this.state.checkPass.long*/
    ) {
      try {
        const { data } = await postData("/users/signup", this.state.user);
        localStorage.setItem("profile", JSON.stringify({ ...data }));
        this.props.history.push("/profile/" + data.userId);
      } catch (error) {
        console.log(error);
      }
    }
  };
  render() {
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
          <form className={styles.form} onSubmit={this.hundleSubmit}>
            <div className={styles.form__avatar}>
              {!this.state.user.profileImg && (
                <div className={styles.avatar_edit}>
                  <input
                    onChange={this.uploadImageProfile}
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
              <div
                className={
                  !this.state.user.profileImg ? styles.avatar_preview : ""
                }
              >
                {this.state.user.profileImg && (
                  <div className={styles.avatar_image}>
                    <img
                      src={`${url}/uploads/${this.state.user.profileImg}`}
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
              onChange={this.handleChangeInput}
              className={styles.form__input}
              type="text"
              placeholder="Name"
            />
            <input
              required
              className={
                this.state.newUser ? styles.form__input : styles.input_error
              }
              name="username"
              type="text"
              placeholder="Username"
              onBlur={this.checkUsername}
              onChange={this.handleChangeInput}
            />
            {!this.state.newUser && (
              <span className={styles.username_error}>
                Username already taken
              </span>
            )}
            <input
              required
              onChange={this.handleChangeInput}
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
              onChange={this.handleChangePass}
            />
            <ul className={styles.password_check_list}>
              Your password need to:
              <li
                className={
                  !this.state.checkPass.caracters
                    ? styles.regles_error
                    : styles.regles_true
                }
              >
                <img
                  className={styles.check_cancel}
                  alt=""
                  src={this.state.checkPass.caracters ? check : cancel}
                />
                include both upper and lower case characters.
              </li>
              <li
                className={
                  !this.state.checkPass.number
                    ? styles.regles_error
                    : styles.regles_true
                }
              >
                <img
                  className={styles.check_cancel}
                  alt=""
                  src={this.state.checkPass.number ? check : cancel}
                />
                include at least one number or symbol.
              </li>
              <li
                className={
                  !this.state.checkPass.long
                    ? styles.regles_error
                    : styles.regles_true
                }
              >
                <img
                  className={styles.check_cancel}
                  alt=""
                  src={this.state.checkPass.long ? check : cancel}
                />
                Be at least 8 characters long.
              </li>
            </ul>
            <div className={styles.form__gallery}>
              <div className={styles.gallery_image}>
                <div className={styles.gallery}>
                  <div
                    className={
                      this.state.user.galleryImg.length === 0
                        ? styles.avatar_edit
                        : styles.avatar_hide
                    }
                  >
                    <input
                      type="file"
                      className={styles.avatar_input}
                      id="imageUpload"
                      accept=".png, .jpg, .jpeg"
                      onChange={this.uploadImageGallery}
                    />
                    <label
                      className={styles.avatar_label}
                      htmlFor="imageUpload"
                    >
                      <img
                        className={styles.avatar_upload}
                        src={camera}
                        alt=""
                      />
                    </label>
                  </div>
                  <div className={styles.avatar_preview}>
                    {this.state.user.galleryImg.length > 0 && (
                      <div className={styles.avatar_image}>
                        <img
                          src={`${url}/uploads/${this.state.user.galleryImg[0]}`}
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
                      this.state.user.galleryImg.length < 2
                        ? styles.avatar_edit
                        : styles.avatar_hide
                    }
                  >
                    <input
                      type="file"
                      className={styles.avatar_input}
                      id="imageUpload"
                      accept=".png, .jpg, .jpeg"
                      onChange={this.uploadImageGallery}
                    />
                    <label
                      className={styles.avatar_label}
                      htmlFor="imageUpload"
                    >
                      <img
                        className={styles.avatar_upload}
                        src={camera}
                        alt=""
                      />
                    </label>
                  </div>
                  <div className={styles.avatar_preview}>
                    {this.state.user.galleryImg.length > 1 && (
                      <div className={styles.avatar_image}>
                        <img
                          src={`${url}/uploads/${this.state.user.galleryImg[1]}`}
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
                      this.state.user.galleryImg.length < 3
                        ? styles.avatar_edit
                        : styles.avatar_hide
                    }
                  >
                    <input
                      type="file"
                      className={styles.avatar_input}
                      id="imageUpload"
                      accept=".png, .jpg, .jpeg"
                      onChange={this.uploadImageGallery}
                    />
                    <label
                      className={styles.avatar_label}
                      htmlFor="imageUpload"
                    >
                      <img
                        className={styles.avatar_upload}
                        src={camera}
                        alt=""
                      />
                    </label>
                  </div>
                  <div className={styles.avatar_preview}>
                    {this.state.user.galleryImg.length > 2 && (
                      <div className={styles.avatar_image}>
                        <img
                          src={`${url}/uploads/${this.state.user.galleryImg[2]}`}
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
  }
}

export default Signup;
