/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Uploader, Modal } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import toast from "react-hot-toast";

const StyleImageUpload = ({
  handleChangeFile,
}: {
  handleChangeFile: (arg0: FileType | undefined) => void;
}) => {
  const [fileValue, setFileValue] = useState<FileType[]>([]);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState<string>("");

  const handleChangeImages = (files: FileType[]) => {
    if (files.length > 0) {
      const latestFile = files[files.length - 1];
      const fileSizeLimit = 1024 * 1024; // 1 MB

      if (
        latestFile.blobFile?.size &&
        latestFile.blobFile?.size <= fileSizeLimit
      ) {
        setFileValue([latestFile]);
        handleChangeFile(latestFile);

        const file = latestFile;
        const reader = new FileReader();

        reader.onload = (e) => {
          const imagePreviewUrl = e.target?.result as string;
          setImagePreview(imagePreviewUrl);
          setTitle(file.name as string);
        };

        reader.readAsDataURL(file.blobFile as File);
      } else {
        clearImagePreview();
        toast.error("File size exceeds 1MB.");
      }
    } else {
      clearImagePreview();
    }
  };

  const clearImagePreview = () => {
    setImagePreview(undefined);
    setTitle("");
    setFileValue([]);
    handleChangeFile(undefined);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // const openModal = () => {
  //   if (imagePreview) {
  //     setShowModal(true);
  //   }
  // };

  return (
    <div className="relative group">
      <Uploader
        fileList={fileValue}
        onChange={handleChangeImages}
        draggable
        autoUpload={false}
        action={""}
        onRemove={clearImagePreview}
        className="w-full"
        accept="image/*"
      >
        {imagePreview ? (
          <div className="relative border-4">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-full h-full object-contain object-center cursor-pointer"
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>Click or Drag files to this area to upload</span>
          </div>
        )}
      </Uploader>
      <div className="w-full">
        {/* <button
          type="button"
          onClick={openModal}
          className="hidden group-hover:block absolute z-50 text-white bg-black/40 rounded-full duration-300 ease-in-out transition-all  focus:scale-90 top-[35%] left-[48%] p-5 "
          style={{
            visibility: imagePreview ? "visible" : "hidden",
          }}
        >
          <MdZoomOutMap style={{ fontSize: "2em" }} />
        </button> */}
      </div>

      <Modal open={showModal} onClose={closeModal} size="md">
        <Modal.Header>
          <Modal.Title className="font-medium text-sm">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex justify-center">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="object-cover object-center "
              />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StyleImageUpload;
