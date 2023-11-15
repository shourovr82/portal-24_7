import Factory from "./Factory";
import Port from "./Port";

const FactoryPort = () => {
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Factory And Port</h1>
        <div className="grid grid-cols-1 gap-3  lg:grid-cols-2">
          {/* Factory */}
          <div>
            <Factory />
          </div>
          {/* port */}
          <div>
            <Port />
          </div>
        </div>
      </div>
    </>
  );
};

export default FactoryPort;
