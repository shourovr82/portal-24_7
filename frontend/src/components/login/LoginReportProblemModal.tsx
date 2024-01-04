/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, SelectPicker } from "rsuite";
import { ProblemReportIssues } from "../../constants";

const LoginReportProblemModal = ({ handleClose }: any) => {
  return (
    <div className="space-y-4 px-1">
      {/* select issue */}
      <div>
        <label htmlFor="">
          Select your issue <span className="text-red-600">*</span>
        </label>
        <SelectPicker
          placeholder="Select your issue..."
          searchable={false}
          data={ProblemReportIssues}
          className="!w-full"
          menuMaxHeight={200}
        />
      </div>
      {/* email */}
      <div>
        <label htmlFor="">
          Your Email Address <span className="text-red-600">*</span>
        </label>
        <Input
          className="!w-full"
          placeholder="Your Email Address..."
          type="text"
        />
      </div>
      {/*  description*/}
      <div className="space-y-2">
        <label htmlFor="">
          Description about your problem <span className="text-red-600">*</span>
        </label>
        <Input
          as="textarea"
          placeholder="Description about your issue..."
          rows={4}
        />
      </div>
      {/* submit and cancel */}
      <div className="pt-2 flex *:duration-300 *:rounded-xl justify-end gap-5 items-center">
        <button
          onClick={handleClose}
          className="!border px-5 py-2 hover:border-transparent 
         text-center hover:bg-[#2a2e573b]"
        >
          Cancel
        </button>
        <Button
          loading={false}
          className="border px-5 py-2.5 hover:text-white text-white
         text-center bg-[#0d1065e0] hover:bg-[#0d1065]"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default LoginReportProblemModal;
