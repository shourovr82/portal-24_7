/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { Uploader } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import toast from "react-hot-toast";
import { fileUrlKey } from "../../config/envConfig";

interface TackPackUploadProps {
  field: {
    onChange: (file: FileType | undefined) => void;
    value: FileType | undefined;
  };
  defaultFile: string;
}

const PoUpdateFileUploader = ({ field, defaultFile }: TackPackUploadProps) => {
  const defaultFileType: FileType = {
    name: defaultFile?.split("\\").pop(),
    fileKey: "defaultFile",
    url: `${fileUrlKey()}/${defaultFile}`,
  };

  const [fileValue, setFileValue] = useState<FileType[]>(
    defaultFileType?.name ? [defaultFileType] : []
  );

  const handleChangeFile = (files: FileType[]) => {
    if (files.length > 0) {
      const latestFile = files[files.length - 1];
      const fileSizeLimit = 5 * 1024 * 1024; // 5 MB

      if (
        latestFile.blobFile?.size &&
        latestFile.blobFile?.size <= fileSizeLimit
      ) {
        setFileValue([latestFile]);

        field.onChange(latestFile);

        const file = latestFile;
        const reader = new FileReader();

        reader.readAsDataURL(file.blobFile as File);
      } else {
        clearFilePreview();
        toast.error("File size exceeds 5 MB.");
      }
    } else {
      clearFilePreview();
    }
  };

  const clearFilePreview = () => {
    field.onChange(undefined);
    setFileValue(defaultFileType?.name ? [defaultFileType] : []);
  };

  return (
    <div className="relative group">
      <Uploader
        fileList={fileValue}
        onChange={handleChangeFile}
        draggable
        autoUpload={false}
        action={""}
        onRemove={clearFilePreview}
        className="w-full"
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

export default PoUpdateFileUploader;
