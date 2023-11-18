/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "rsuite";
import { imageUrlKey } from "../../config/envConfig";

const UserDetailsModal = ({
  openDetails,
  setOpenDetails,
  userDetails,
}: any) => {
  return (
    <>
      <Modal open={openDetails} onClose={() => setOpenDetails(false)}>
        <Modal.Header>
          <Modal.Title className="font-semibold">
            User Profile Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex gap-5 items-center">
            <div>
              <img
                className="w-[150px] h-[150px] object-cover  rounded-full "
                src={`${imageUrlKey()}/${userDetails?.profile?.profileImage}`}
              />
            </div>
            <div className="space-y-3">
              <h2 className="font-semibold text-2xl">
                {userDetails?.profile?.firstName}{" "}
                {userDetails?.profile?.lastName}
              </h2>
              <p className="font-medium text-black/80">{userDetails?.email} </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenDetails(false)} appearance="primary">
            Ok
          </Button>
          <Button onClick={() => setOpenDetails(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserDetailsModal;
