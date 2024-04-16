import { MdOutlineUploadFile } from "react-icons/md";

type TImageForm = {
    imageDisplay: string,
    setImageDisplay: React.Dispatch<React.SetStateAction<string>>,
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>
};

export default function ImageForm({ imageDisplay, setImageDisplay, setImageFile }: TImageForm) {
    function handleCoverPhoto(e: React.FormEvent<HTMLLabelElement>) {
        const event = e.target as HTMLInputElement

        if (event.files) {
            const uploadedImg = URL.createObjectURL(event.files[0]);
            setImageDisplay(uploadedImg);
            setImageFile(event.files[0])
        }
    }
    return (
        <section className="image-container">
            <h3>Cover Photo</h3>
            <p className="padding-bottom">You may upload a cover photo that will be displayed at the top of your event page.You will be given a default picture if none is uploaded.</p>
            <div className="input-container">
                <label onChange={handleCoverPhoto} htmlFor="input-image" className="icon-container">
                    <input type="file" id="input-image" hidden />
                    <div className="upload-icon">
                        <MdOutlineUploadFile className="icon" />
                        <span className="text">Upload Photo</span>
                    </div>
                </label>
                <img src={imageDisplay} alt="default picture" />
            </div>
        </section>
    )
}