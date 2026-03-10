import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { FaUserCog, FaBell, FaSignOutAlt, FaCamera } from "react-icons/fa";
import { UpdateUserDetail, UploadProfileImage } from "../API/ProfileSettingAPI";
import type ProfileSettingModel from "../Model/ProfileSettingModel";
import { useAppDispatch, useAppSelector } from "../../../Hooks/ReduxHook";
import { AddUserDetail } from "../../../ReduxManager/Slices/User/UserSlice";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {

  const [data, setData] = useState<ProfileSettingModel>({
    id: 0,
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    profileImage: ""
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const originalData = useAppSelector(state => state.userDetail);
  const navigate = useNavigate();

  useEffect(() => {
    if (originalData) {
      setData(originalData);
    }
  }, [originalData]);


  const hasChanges =
    data.name !== originalData?.name ||
    data.phoneNumber !== originalData?.phoneNumber ||
    data.dateOfBirth !== originalData?.dateOfBirth ||
    imageFile !== null;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name" && value.length > 45) return;
    if (name === "phoneNumber" && value.length > 15) return;
    setData(prev => ({ ...prev, [name]: value }));
  };


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024) {
      alert("Image must be less than 500KB");
      return;
    }
    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setData(prev => ({ ...prev, profileImage: previewUrl }));
  };


  const handleSave = async () => {
    let imageUrl = "";
    if (imageFile) {
      const res = await UploadProfileImage(imageFile);
      if (res.success) {
        alert("Profile Updated");
      }
    }

    const payload = {
      id: data.id,
      name: data.name !== originalData?.name ? data.name : "",
      email: "",
      phoneNumber: data.phoneNumber !== originalData?.phoneNumber ? data.phoneNumber : "",
      dateOfBirth: data.dateOfBirth !== originalData?.dateOfBirth ? data.dateOfBirth : "",
      profileImage: imageUrl
    };

    const res = await UpdateUserDetail(payload);

    if (res.success) {
      const refreshedData = {
        ...data,
        profileImage: imageUrl || data.profileImage
      };
      dispatch(AddUserDetail(refreshedData));
      setData(refreshedData);
      setImageFile(null);
    }

  };


  return (
    <div className="container py-4">      
      <div className="mb-3">
        <h4 className="fw-bold mb-1 text-primary">User Profile Settings</h4>
        <p className="text-muted mb-0">
          Manage your account information and preferences.
        </p>
      </div>
      <div className="card shadow-lg p-4 rounded-4">
        <div className="row">
          <div className="col-lg-8">
            <div className="d-flex align-items-center mb-4">
              <div className="position-relative">

                <div className="d-flex justify-content-center align-items-center rounded-circle bg-warning" style={{ width: 110, height: 110 }}>
                  {data.profileImage ?
                    <img className="rounded-circle" src={data.profileImage} width={110} height={110} />
                    :
                    <span className="fs-1 text-white">
                      {data.name?.charAt(0) || "U"}
                    </span>
                  }
                </div>

                <input type="file" id="upload" hidden accept="image/*" onChange={handleImageUpload} />
                <label className="btn btn-primary rounded-circle position-absolute" htmlFor="upload" style={{ bottom: 0, right: 0 }}>
                  <FaCamera size={12} />
                </label>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label text-primary">
                  FULL NAME
                </label>
                <input className="form-control rounded-pill" type="text" name="name" value={data.name} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label text-primary">
                  EMAIL
                </label>
                <input className="form-control rounded-pill" type="email" name="email" value={data.email} disabled={true} />
              </div>

              <div className="col-md-6">
                <label className="form-label text-primary">
                  PHONE
                </label>
                <input className="form-control rounded-pill" type="text" name="phoneNumber" value={data.phoneNumber} onChange={handleChange} />
              </div>


              <div className="col-md-6">
                <label className="form-label text-primary">
                  DATE OF BIRTH
                </label>
                <input className="form-control rounded-pill" type="date" name="dateOfBirth" value={data.dateOfBirth} onChange={handleChange} />
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4 gap-3">
              <button className="btn btn-light">
                Cancel
              </button>
              <button className="btn btn-primary px-4 rounded-pill shadow" onClick={handleSave} disabled={!hasChanges}>
                Save Changes
              </button>
            </div>
          </div>


          <div className="col-lg-4">
            <div className="card p-3 rounded-4 shadow-sm my-4">
              <h6 className="fw-bold mb-3">
                <FaUserCog className="me-2" />
                Account Settings
              </h6>
              <button className="btn btn-light w-100 mb-2 text-start rounded-pill" onClick={() => navigate("/resetpassword")}>
                Change Password
              </button>
              <button className="btn btn-light w-100 mb-3 text-start rounded-pill">
                <FaBell className="me-2" />
                Notifications
              </button>
              <hr />
              {/* <button className="btn btn-link text-danger text-start" onClick={() => {
                localStorage.removeItem("auth_token"); 
                navigate("/login")
                }}>
                <FaSignOutAlt className="me-2" />
                Sign Out
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}