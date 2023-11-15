/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Uploader } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import toast from "react-hot-toast";

const TackPackUploadPdf = ({
  handleChangeFile,
}: {
  handleChangeFile: (arg0: FileType) => void;
}) => {
  const [fileValue, setFileValue] = useState<FileType[]>([]);

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

        reader.readAsDataURL(file.blobFile as File);
      } else {
        toast.error("File size exceeds 1MB.");
      }
    } else {
      //
    }
  };

  return (
    <div className="relative group">
      <Uploader
        fileList={fileValue}
        onChange={handleChangeImages}
        draggable
        autoUpload={false}
        action={""}
        className="w-full "
        accept=".pdf"
      >
        <div
          style={{
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>Click or Drag files to this area to upload</span>
        </div>
      </Uploader>
    </div>
  );
};

export default TackPackUploadPdf;
