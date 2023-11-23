import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import SidebarV2 from "./sidebar/SidebarV2";
import { isLoggedIn } from "../hooks/services/auth.service";
import { useEffect, useState } from "react";
import { Loader, Placeholder } from "rsuite";

const MainLayout = () => {
  const userLoggedIn = isLoggedIn();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login", { state: { from: location.pathname } });
    }
    setIsLoading(true);
  }, [isLoading, userLoggedIn, navigate]);

  if (!isLoading) {
    return (
      <div>
        <Placeholder.Paragraph rows={8} />
        <Loader size="lg" backdrop content="loading..." vertical />
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex">
        <div
          className="border-r bg-[#F7F7FA]"
          style={{ transition: "width 0.2s ease" }}
        >
          {/* <Sidebar /> */}
          <SidebarV2 />
        </div>
        <div className="w-[100%] overflow-clip">
          <Navbar />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
