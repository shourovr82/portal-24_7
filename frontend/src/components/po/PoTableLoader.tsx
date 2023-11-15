export default function PoTableLoader() {
  const numberOfRows = 5;

  const renderedRows = [...Array(numberOfRows)].map(() => (
    <div>
      <div className="row">
        <div className="skeleton"></div>
        <div className="skeleton"></div>
        <div className="skeleton"></div>
        <div className="skeleton"></div>
        <div className="skeleton"></div>
      </div>
    </div>
  ));

  return <div className="App">{renderedRows}</div>;
}
