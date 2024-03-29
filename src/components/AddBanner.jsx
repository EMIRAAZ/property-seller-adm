import { useRef, useState } from 'react';
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from '../toast';
import { useDispatch, useSelector } from 'react-redux';
import { addingBanner } from '../api';
import { addBannerSuccess, setLoading } from '../features/bannerSlice';
import { setError } from '../features/propertiesSlice';

function AddBanner() {

    const { isLoading } = useSelector((state) => state.banner); 
    const dispatch = useDispatch();

    // --------------------------------------------
    const uploadImage = useRef(null);
    // --------------------------------------------

    // -----------------------------------------------------
    const [formData,setFormData] = useState({bannerHeadline:'',bannerSubtext:'',buttonText:'',buttonLink:'',mainImgaeLink:''})
    // -----------------------------------------------------

    //------------------------------------------------------------------
    const uploadImageButton = ()=> uploadImage.current.click();
    // -----------------------------------------------------------------

    // -----------------------------------------------
    const hanldeUploading = (e)=>{
        const file = e.target.files
        if(file.length > 0){
            const [selectedFile] = file
            const fileReader = new FileReader();
            fileReader.onload = ()=>{
                const srcData = fileReader.result;
                setFormData({...formData,mainImgaeLink:srcData,})
            } 
            fileReader.readAsDataURL(selectedFile) 
        }
    }
   
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    // -------------------------------------------------

    const handleSubmit = async(e)=>{

        try {
            e.preventDefault()
            let data = {
                ...formData,
            }
            dispatch(setLoading());
            await addingBanner(data);
            dispatch(addBannerSuccess());
            successToast('Successfully added')
            setFormData({
                bannerSubtext:'',
                buttonLink:'',
                buttonText:'',
                bannerHeadline:'',
                mainImgaeLink:''
            })
        }  catch (error) {
            if (error.response && error.response.data) {
              dispatch(setError(error.response.data.message));
              errorToast(error.response.data.message)
            } else {
              dispatch(setError('An error occurred during login.'));
              errorToast('An error occurred during login.');
            }
          }
    }
   

  return (
    <form onSubmit={handleSubmit} className='flex flex-wrap'>
        <div className='flex-1'>

            {/* Banner Headline */}
            <div className="flex flex-col gap-2 mx-3">
                <label   htmlFor="bannerHeadline" className="sf-medium text-sm text-[#000000]">Banner Headline</label>
                <input disabled={isLoading} autoComplete="" value={formData.bannerHeadline} name="bannerHeadline" onChange={handleChange} type="text" id="bannerHeadline" placeholder="Find Your Dream Home Today" className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none" />
            </div>

            {/* Banner Subtext */}
            <div className="flex flex-col gap-2 mx-3">
                <label   htmlFor="bannerSubtext" className="sf-medium text-sm text-[#000000]">Banner Subtext</label>
                <input disabled={isLoading} autoComplete="" name="bannerSubtext" value={formData.bannerSubtext} onChange={handleChange} type="text" id="bannerSubtext" placeholder="Explore our curated collection of exquisite properties for sale and discover the perfect place to call home." className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none" />
            </div>

            {/* Button Text */}
            <div className="flex flex-col gap-2 mx-3">
                <label   htmlFor="buttonText" className="sf-medium text-sm text-[#000000]">Button Text</label>
                <input disabled={isLoading} autoComplete="" name="buttonText" value={formData.buttonText} onChange={handleChange} type="text" id="buttonText" placeholder="View All Propreties" className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none" />
            </div>

            {/* Button Link */}
            <div className="flex flex-col gap-2 mx-3">
                <label htmlFor="buttonLink" className="sf-medium text-sm text-[#000000]">Button Link</label>
                <input disabled={isLoading} autoComplete="" name="buttonLink" value={formData.buttonLink} onChange={handleChange} type="url" id="buttonLink" placeholder="View All Propreties" className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none" />
            </div>

        </div>

        <div className="px-4 flex-1">

            {/*  Main image */}
            <h1 className='mb-3 text-4xl sf-medium'>Media</h1>
            <h2 className='sf-medium text-sm mb-3'>Main Image</h2>
            <div className="flex gap-3 items-center">
                <div className="w-80 h-64  rounded-[20px] overflow-hidden">
                    <img src={ formData.mainImgaeLink || PlaceHolder} alt="placeholder" className='w-full h-full object-cover ' />
                </div>
                <div onClick={uploadImageButton} className="w-48 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer">
                    <span>Select Image </span>
                </div>
                <input disabled={isLoading} ref={uploadImage} type="file" accept="image/jpg, image/jpeg, image/png" onChange={hanldeUploading} className='hidden' />
            </div>

              {/* submit */}
            <div className="p-3 poppins-semibold text-lg">
              <div className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer">
                <button type='submit'>Save</button>
              </div>
            </div>

           
        </div>

    </form>

  )
}

export default AddBanner