import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {useRef} from 'react'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase'
import { useDispatch } from 'react-redux';
import {updateUserStart, updateUserFailure,updateUserSuccess } from '../redux/user/userSlice'

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setimagePercentage] = useState(0);
  const [imageError, setimageError] = useState(null);
  const [formData, setformData] = useState({})
  const {currentUser} = useSelector((state) => state.user)
  // console.log(currentUser)
  useEffect(() => {
    if(image) {
      handleFileUpload(image);
    }
  },[image]);

  const handleFileUpload = async (image) => {
    console.log(image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef,image);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done')
      setimagePercentage(Math.round(progress));
    },
    (error) => {
      setimageError(true)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setformData({...formData, profilePicture: downloadURL})
      })
    });
  }

  const handleChange = (e) => {
    console.log("clicked")
    setformData({...formData, [e.target.id]: e.target.value});
  }
  // console.log("formData",formData)

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        dispatch(updateUserStart());
        console.log("current_user",currentUser)
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data)
        if(data.success === false){
          dispatch(updateUserFailure(data));
        }
        dispatch(updateUserSuccess(data));
      } catch (error) {
        dispatch(updateUserFailure(error))
      }
  }

  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form  onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])}/>
        <img src={formData.profilePicture || currentUser.profilePicture} alt="profile-picture" className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2 mb-5'
        onClick={() => fileRef.current.click()}
        />

        <p className='text-sm self-center'>
          {imageError ? (<span className='text-red-700'>Error In Uploading Image</span>) : imagePercentage > 0 && imagePercentage < 100 ? (<span className='text-slate-700'>{`Uploading Image...${imagePercentage} %`}</span>) : imagePercentage === 100 ? (<span className='text-green-700'>Image Uploaded Successfully</span>) : null }
        </p>

        <input defaultValue={currentUser.username} 
        type="text" 
        id='username' 
        placeholder='Username' 
        className='bg-slate-100 rounded-lg p-3'
        onChange={handleChange}
        />

        <input defaultValue={currentUser.email} 
        type="email" id='email' 
        placeholder='Email' className='bg-slate-100 rounded-lg p-3'
        onChange={handleChange}
        />

        <input type="password" id='password' placeholder='Password' className='bg-slate-100 rounded-lg p-3' 
        onChange={handleChange}
        />

        <button onChange={handleChange} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-600 cursor-pointer'>Delete Account</span>
        <span className='text-red-600 cursor-pointer'>Sign Out</span>
      </div>

    </div>
  )
}

export default Profile