/* eslint-disable @typescript-eslint/no-explicit-any */
import AddPpStatusTextEditor from "../../components/addStatusEditor/AddPpStatusTextEditor";
import { useGetStyleNoQuery } from "../../redux/features/styles/styleApi";

const PpStatus = () => {
  const { data: styles, isLoading: isLoadingStyleNo } =
    useGetStyleNoQuery(null);

  const allStyle = styles?.data?.map((style: any) => ({
    label: style?.styleNo,
    value: style?.styleNo,
  }));
  return (
    <div className="p-4">
      <AddPpStatusTextEditor
        isLoadingStyleNo={isLoadingStyleNo}
        allStyle={allStyle}
      />
    </div>
  );
};

export default PpStatus;
