/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import MessageIcon from "@rsuite/icons/Message";
import PeoplesIcon from "@rsuite/icons/Peoples";
import PageIcon from "@rsuite/icons/Page";
import { Icon } from "@rsuite/icons";
import { FaRegPaperPlane } from "react-icons/fa";
import { MdOutlineFactory } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import ListIcon from "@rsuite/icons/List";
import logo from "../../assets/logo/portal-logo.png";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getUserInfo } from "../../hooks/services/auth.service";
import {
  getFromLocalStorage,
  storeSideBarMode,
} from "../../utils/local-storage";
import { sideBarModeKey } from "../../config/envConfig";

const SidebarV2 = () => {
  const [expanded, setExpanded] = useState<boolean>(
    !!getFromLocalStorage(sideBarModeKey())
      ? JSON.parse(getFromLocalStorage(sideBarModeKey()) as string)
      : false
  );

  const sidebarWidth = expanded ? 240 : 56;
  const [activeKey, setActiveKey] = useState("1");

  const handleSidebarExpand = () => {
    setExpanded(!expanded);
    storeSideBarMode({ expanded: JSON.stringify(!expanded) });
  };

  const { role } = getUserInfo() as any;
  const { pathname } = useLocation();

  return (
    <div
      style={{ width: `${sidebarWidth}px`, transition: "width 0.2s ease" }}
      className={`${
        expanded
          ? "h-screen shadow-md sticky top-0 overflow-y-auto"
          : "sticky top-0 shadow-md z-[100]"
      }`}
    >
      <Sidenav expanded={expanded} className="h-screen ">
        <Sidenav.Header>
          <Link to="/">
            <div
              className={`${
                expanded
                  ? "flex h-16 shrink-0 items-center gap-x-[14px] p-5"
                  : "flex h-16 shrink-0 items-center gap-x-[14px]"
              }`}
            >
              <img
                className={`${expanded ? "h-auto w-10" : "h-auto w-10 ml-3"}`}
                src={logo}
                alt="logo"
              />

              <p className={`${expanded ? "font-semibold text-xl" : "hidden"}`}>
                Portal
              </p>
            </div>
          </Link>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            {/* dashboard */}
            <Nav.Item
              eventKey="1"
              icon={<DashboardIcon />}
              as={NavLink}
              active={pathname === "/"}
              className={`${pathname === "/" && "!bg-blue-100"}`}
              to="/"
            >
              Dashboard
            </Nav.Item>
            {/* styles */}
            <Nav.Menu
              placement="rightStart"
              eventKey="2"
              title="Styles"
              icon={<Icon as={GiClothes} />}
            >
              <Nav.Item
                eventKey="2-1"
                as={NavLink}
                to="/styles/listofstyle"
                active={pathname === "/styles/listofstyle"}
                className={`${
                  pathname === "/styles/listofstyle" && "!bg-blue-100"
                }`}
              >
                List Of Styles
              </Nav.Item>
              <Nav.Item
                eventKey="2-2"
                as={NavLink}
                to="/styles/addstyle"
                active={pathname === "/styles/addstyle"}
                className={`${
                  pathname === "/styles/addstyle" && "!bg-blue-100"
                }`}
              >
                Add Style
              </Nav.Item>
              <Nav.Item
                eventKey="2-3"
                as={NavLink}
                to="/styles/styleAssign"
                active={pathname === "/styles/styleAssign"}
                className={`${
                  pathname === "/styles/styleAssign" && "!bg-blue-100"
                }`}
              >
                Style Assign
              </Nav.Item>
            </Nav.Menu>
            {/* PO */}
            <Nav.Menu
              placement="rightStart"
              eventKey="3"
              title="PO"
              icon={<ListIcon />}
            >
              <Nav.Item
                eventKey="3-1"
                as={NavLink}
                to="/po/poLists"
                active={pathname === "/styles/poLists"}
                className={`${
                  pathname === "/styles/poLists" && "!bg-blue-100"
                }`}
              >
                List Of PO
              </Nav.Item>
              <Nav.Item
                eventKey="3-2"
                as={NavLink}
                to="/po/addpo"
                active={pathname === "/styles/addpo"}
                className={`${pathname === "/styles/addpo" && "!bg-blue-100"}`}
              >
                Add PO
              </Nav.Item>
            </Nav.Menu>
            {/* PP & Bulk Status */}
            <Nav.Menu
              placement="rightStart"
              eventKey="4"
              title="Status"
              icon={<MessageIcon />}
            >
              <Nav.Item
                eventKey="4-1"
                as={NavLink}
                to="/LdCpAopStatus"
                active={pathname === "/styles/LdCpAopStatus"}
                className={`${
                  pathname === "/styles/LdCpAopStatus" && "!bg-blue-100"
                }`}
              >
                LD/CP/AOP Strike Off Status
              </Nav.Item>
              <Nav.Item
                eventKey="4-2"
                as={NavLink}
                to="/ppStatus"
                active={pathname === "/styles/ppStatus"}
                className={`${
                  pathname === "/styles/ppStatus" && "!bg-blue-100"
                }`}
              >
                PP Status
              </Nav.Item>
              <Nav.Item
                eventKey="4-3"
                as={NavLink}
                to="/bulkProductionStatus"
                active={pathname === "/styles/bulkProductionStatus"}
                className={`${
                  pathname === "/styles/bulkProductionStatus" && "!bg-blue-100"
                }`}
              >
                Bulk production Status
              </Nav.Item>
            </Nav.Menu>
            {/* Tack Pack  */}
            <Nav.Item
              eventKey="5"
              icon={<Icon as={IoDocumentTextOutline} />}
              as={NavLink}
              to="/tackPack"
              active={pathname === "/styles/tackPack"}
              className={`${pathname === "/styles/tackPack" && "!bg-blue-100"}`}
            >
              Tack Pack
            </Nav.Item>
            {/* PP Submission  */}
            <Nav.Item
              eventKey="6"
              icon={<Icon as={MdOutlineFactory} />}
              as={NavLink}
              to="/ppSubmission"
              active={pathname === "/ppSubmission"}
              className={`${pathname === "/ppSubmission" && "!bg-blue-100"}`}
            >
              PP Submission
            </Nav.Item>
            {/* Courier */}
            <Nav.Menu
              placement="rightStart"
              eventKey="7"
              title="Courier"
              icon={<Icon as={FaRegPaperPlane} />}
            >
              <Nav.Item
                eventKey="7-1"
                as={NavLink}
                to="/courier/courierLists"
                active={pathname === "/courier/courierLists"}
                className={`${
                  pathname === "/courier/courierLists" && "!bg-blue-100"
                }`}
              >
                Courier Lists
              </Nav.Item>
              <Nav.Item
                eventKey="7-2"
                as={NavLink}
                to="/courier/noOfCourier"
                active={pathname === "/courier/noOfCourier"}
                className={`${
                  pathname === "/courier/noOfCourier" && "!bg-blue-100"
                }`}
              >
                No Of Courier
              </Nav.Item>
              <Nav.Item
                eventKey="6-3"
                as={NavLink}
                to="/courier/addcourier"
                active={pathname === "/courier/addcourier"}
                className={`${
                  pathname === "/courier/addcourier" && "!bg-blue-100"
                }`}
              >
                Add Courier
              </Nav.Item>
            </Nav.Menu>
            {/*Factory & Port*/}
            <Nav.Item
              eventKey="8"
              icon={<Icon as={MdOutlineFactory} />}
              as={NavLink}
              to="/factoryPort"
              active={pathname === "/factoryPort"}
              className={`${pathname === "/factoryPort" && "!bg-blue-100"}`}
            >
              Factory & Port
            </Nav.Item>
            {/*Item */}
            <Nav.Item
              eventKey="9"
              icon={<PageIcon />}
              as={NavLink}
              to="/item/addItem"
              active={pathname === "/item/addItem"}
              className={`${pathname === "/item/addItem" && "!bg-blue-100"}`}
            >
              Item
            </Nav.Item>
            {/* Users */}
            {(role === "ADMIN" || role === "SUPERADMIN") && (
              <Nav.Menu
                placement="rightStart"
                eventKey="10"
                title="Users"
                icon={<PeoplesIcon />}
              >
                <Nav.Item
                  eventKey="10-1"
                  as={NavLink}
                  to="/users/userLists"
                  active={pathname === "/users/userLists"}
                  className={`${
                    pathname === "/users/userLists" && "!bg-blue-100"
                  }`}
                >
                  User Lists
                </Nav.Item>
                <Nav.Item
                  eventKey="10-2"
                  as={NavLink}
                  to="/users/addUser"
                  active={pathname === "/users/addUser"}
                  className={`${
                    pathname === "/users/addUser" && "!bg-blue-100"
                  }`}
                >
                  Add User
                </Nav.Item>
                <Nav.Item
                  eventKey="10-3"
                  as={NavLink}
                  to="/users/problems-reported"
                  active={pathname === "/users/report-problems"}
                  className={`${
                    pathname === "/users/report-problems" && "!bg-blue-100"
                  }`}
                >
                  Problem Reported
                </Nav.Item>
              </Nav.Menu>
            )}
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle
          className="sticky bottom-0 z-20 bg-[#f7f7fa]"
          // expanded={expanded}
          onToggle={handleSidebarExpand}
        />
      </Sidenav>
    </div>
  );
};

export default SidebarV2;
