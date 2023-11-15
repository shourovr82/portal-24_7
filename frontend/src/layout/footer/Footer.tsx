const FooterPage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex justify-center items-center mt-20 mb-5 text-gray-600">
      <h1>Developed By CodeQuivers @{currentYear} </h1>
    </div>
  );
};

export default FooterPage;
