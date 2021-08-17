import React, { Component } from "react";
import camera from "../../images/camera_white.png";
import draw from "../../images/draw.png";
import check from "../../images/check.png";
import { getData, uploadImage, postData, updateData, url } from "../../api";
import styles from "./Profile.module.css";
import { withRouter } from "react-router";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      edit: false,
      user: {},
      loading: false,
      name: false,
      username: false,
      newUser: true,
      profileGallery: [],
    };
  }

  checkUsername = async () => {
    console.log("Checking");
    const result = await postData("/users/check-user", {
      username: this.state.user.username,
    });
    if (result.status !== 201) this.setState({ ...this.state, newUser: false });
    else this.setState({ ...this.state, newUser: true });
  };

  fetchUser = async () => {
    const { data } = await getData("/users/" + this.state.id);
    this.setState({ ...this.state, loading: false, user: data });
  };

  fetUsergallery = async () => {
    const { data } = await getData("/images/gallery/user/" + this.state.id);
    this.setState({ ...this.state, profileGallery: data });
  };

  handleChangeInput = (e) => {
    if (e.target.value.length)
      this.setState({
        ...this.state,
        user: { ...this.state.user, [e.target.name]: e.target.value },
      });
  };
  hundleUploadImage = async (e, currentImage) => {
    const { data } = await uploadImage(
      "/images/edit-profile-image/" + currentImage,
      e
    );
    this.setState({
      ...this.state,
      user: { ...this.state.user, profileImg: data.filename },
    });
  };
  hundleUploadGallery = async (e, currentImage) => {
    const { data } = await uploadImage(
      "/images/edit-gallery-image/" + currentImage,
      e
    );
    let objIndex = this.state.profileGallery.findIndex(
      (obj) => obj.image === currentImage
    );
    this.state.profileGallery[objIndex] = { image: data.filename };
    this.setState({ ...this.state, profileGallery: this.state.profileGallery });
  };

  hundleSubmit = async () => {
    if (this.state.newUser) {
      const { status } = await updateData(
        "/users/" + this.state.user.id,
        this.state.user
      );
      if (status === 201) {
        this.fetchUser();
        this.setState({ ...this.state, edit: false });
      } else {
        console.log("error");
      }
    }
  };
  componentDidMount() {
    this.fetchUser();
    this.fetUsergallery();
  }
  render() {
    return (
      <div className={styles.root}>
        <h1 className={styles.profile__title}>Profile</h1>
        {this.state.user.name && (
          <div className={styles.profile}>
            <div className={styles.profile__avatar}>
              {this.state.edit && (
                <div className={styles.avatar_edit}>
                  <input
                    type="file"
                    className={styles.edit_input}
                    id="profileImg"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) =>
                      this.hundleUploadImage(e, this.state.user.profileImg)
                    }
                  />
                  <label className={styles.edit_label} htmlFor="profileImg">
                    <img className={styles.avatar_upload} src={camera} alt="" />
                  </label>
                </div>
              )}
              <div
                className={
                  this.state.edit
                    ? styles.avatar_preview_new
                    : styles.avatar_preview
                }
              >
                {this.state.user?.profileImg && (
                  <img
                    className={
                      this.edit ? styles.avatar_iamge_edit : styles.avatar_iamge
                    }
                    src={`${url}/uploads/${this.state.user.profileImg}`}
                    alt=""
                  />
                )}
              </div>
            </div>
            <div className={styles.profile_name}>
              {!this.state.name ? (
                <span className={styles.input_preview}>
                  {this.state.user?.name}
                </span>
              ) : (
                <input
                  name="name"
                  placeholder={this.state.user.name}
                  className={styles.input_edit}
                  onBlur={() => this.setState({ ...this.state, name: false })}
                  onChange={this.handleChangeInput}
                />
              )}
              {this.state.edit && (
                <img
                  className={styles.image_upload}
                  src={this.state.name ? check : draw}
                  alt=""
                  onClick={() => {
                    this.setState({
                      ...this.state,
                      name: !this.state.name,
                      username: false,
                    });
                  }}
                />
              )}
            </div>
            <div className={styles.profile_username}>
              {!this.state.username ? (
                <span className={styles.input_preview}>
                  @{this.state.user?.username}
                </span>
              ) : (
                <input
                  name="username"
                  placeholder={this.state.user.username}
                  className={
                    this.state.newUser
                      ? styles.input_edit
                      : styles.input_edit_error
                  }
                  onChange={this.handleChangeInput}
                  onBlur={() => {
                    this.checkUsername();
                    this.setState({ ...this.state, username: false });
                  }}
                />
              )}
              {this.state.edit && (
                <img
                  className={styles.image_upload}
                  src={this.state.username ? check : draw}
                  alt=""
                  onClick={() => {
                    this.setState({
                      ...this.state,
                      username: !this.state.username,
                      name: false,
                    });
                  }}
                />
              )}
              {!this.state.newUser && (
                <div className={styles.username_error}>
                  Username already taken
                </div>
              )}
            </div>
            <button
              className={styles.edit_button}
              onClick={() =>
                this.state.edit
                  ? this.hundleSubmit()
                  : this.setState({ ...this.state, edit: true })
              }
            >
              Edit Profile
            </button>
          </div>
        )}
        {this.state.profileGallery && this.state.profileGallery.length > 0 && (
          <div className={styles.profile__gallery}>
            {this.state.profileGallery.map((img) => (
              <div key={img.image} className={styles.image_container}>
                {this.state.edit && (
                  <div className={styles.gallery_edit}>
                    <input
                      type="file"
                      className={styles.gallery_input}
                      id={img.image}
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => this.hundleUploadGallery(e, img.image)}
                    />
                    <label className={styles.gallery_label} htmlFor={img.image}>
                      <img className={styles.image_upload} src={draw} alt="" />
                    </label>
                  </div>
                )}
                <img
                  src={`${url}/uploads/${img.image}`}
                  alt=""
                  className={styles.gallery_image}
                />
              </div>
            ))}
          </div>
        )}
        {this.state.loading && <div className={styles.profil__loader}></div>}
      </div>
    );
  }
}

export default withRouter(Profile);
