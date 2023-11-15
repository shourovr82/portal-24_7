/* eslint-disable @typescript-eslint/no-explicit-any */
import LdCpAopTextEditor from "../../components/addStatusEditor/LdCpAopTextEditor";
import { useGetStyleNoQuery } from "../../redux/features/styles/styleApi";

const LdCpAopStatus = () => {
  // Fetching All Style
  const { data: styles, isLoading: isLoadingStyleNo } =
    useGetStyleNoQuery(null);

  const allStyle = styles?.data?.map((style: any) => ({
    label: style?.styleNo,
    value: style?.styleNo,
  }));
  return (
    <>
      <div className="p-4">
        {/* header */}
        <div>
          <LdCpAopTextEditor
            isLoadingStyleNo={isLoadingStyleNo}
            allStyle={allStyle}
          />
        </div>
      </div>
    </>
  );
};

export default LdCpAopStatus;
