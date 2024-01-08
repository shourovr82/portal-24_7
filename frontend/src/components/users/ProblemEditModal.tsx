/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { Button, Modal, SelectPicker } from "rsuite";
import { ProblemReportIssuesStatus } from "../../constants";
import { useForm } from "react-hook-form";
import { IStatusChange } from "../../pages/users/addUser.interface";

const ProblemEditModal = ({ open, handleClose, modalEditData }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IStatusChange>();

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Change Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div className="border space-y-3 border-black shadow-lg  rounded-lg">
              <div className=" p-3  font-medium  space-y-2 ">
                <h4>Email Address : {modalEditData?.emailAddress}</h4>
                <h4>Issue Name : {modalEditData?.issueName}</h4>
                <h4>Issue Description : {modalEditData?.description}</h4>
              </div>

              <div className="flex justify-between border-t  border-black p-3  ">
                <h4>
                  <span className="font-medium">Issue Created Date </span>
                  <p className="text-sm text-black/80">
                    {moment(modalEditData?.createdAt).format("LLL")}
                  </p>
                </h4>
                <h4>
                  <span className="font-medium">Issue Updated Date </span>

                  <p className="text-sm text-black/80">
                    {moment(modalEditData?.updatedAt).format("LLL")}
                  </p>
                </h4>
              </div>
            </div>
            <div className="border space-y-3 border-black p-3 shadow-lg  rounded-lg">
              <h4>Update Issue Status : {modalEditData?.problemStatus}</h4>
              <form>
                <div>
                  <SelectPicker
                    searchable={false}
                    placement="top"
                    data={ProblemReportIssuesStatus}
                    className="!w-full"
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <Button className="bg-[#007bff]  hover:bg-[#0066ff] hover:text-white focus-within:bg-[#0066ff]  focus-within:text-white text-white !px-5 rounded-full">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProblemEditModal;
