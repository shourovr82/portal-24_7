import TopTenStyleTable from "../../components/styles/TopTenStyleTable";

const Styles = () => {
  return (
    <>
      <div className="p-5">
        <section className="p-4 border bg-white rounded-md">
          {/* header */}
          <p className="text-lg font-semibold pb-5">
            Top Ten Recent Style Added
          </p>
          <TopTenStyleTable />
        </section>
      </div>
    </>
  );
};

export default Styles;
