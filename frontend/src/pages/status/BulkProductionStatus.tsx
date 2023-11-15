import BulkStatusEditor from "../../components/addStatusEditor/BulkStatusEditor";
import { useGetStyleNoQuery } from "../../redux/features/styles/styleApi";

const BulkProductionStatus = () => {
  const { data: styles, isLoading: isLoadingStyleNo } =
    useGetStyleNoQuery(null);

  const allStyle = styles?.data?.map((style: any) => ({
    label: style?.styleNo,
    value: style?.styleNo,
  }));
  return (
    <div className="p-4">
      <BulkStatusEditor
        isLoadingStyleNo={isLoadingStyleNo}
        allStyle={allStyle}
      />
    </div>
  );
};

export default BulkProductionStatus;
