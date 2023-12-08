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
import { Link, NavLink } from "react-router-dom";
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

  return (
    <div
      style={{ width: `${sidebarWidth}px`, transition: "width 0.2s ease" }}
      className={`${
        expanded
          ? "h-screen shadow-md sticky top-0 overflow-y-auto"
          : "sticky top-0 shadow-md z-[100]"
      }`}
    >
      <Sidenav expanded={expanded} className="h-screen">
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
              {/* {expanded ? (
                <img
                  src={logo}
                  alt="logo"
                  className={`${expanded ? "h-auto w-10" : "hidden"}`}
                />
              ) : (
                <img src={logo} alt="logo" className="h-auto w-10 ml-3" />
              )} */}
              <p className={`${expanded ? "font-semibold text-xl" : "hidden"}`}>
                Portal
              </p>
            </div>
          </Link>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            {/* dashboard */}
            <Nav.Item eventKey="1" icon={<DashboardIcon />} as={NavLink} to="/">
              Dashboard
            </Nav.Item>
            {/* styles */}
            <Nav.Menu
              placement="rightStart"
              eventKey="2"
              title="Styles"
              icon={<Icon as={GiClothes} />}
            >
              <Nav.Item eventKey="2-1" as={NavLink} to="/styles/listofstyle">
                List Of Styles
              </Nav.Item>
              <Nav.Item eventKey="2-2" as={NavLink} to="/styles/addstyle">
                Add Style
              </Nav.Item>
              <Nav.Item eventKey="2-3" as={NavLink} to="/styles/styleAssign">
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
              <Nav.Item eventKey="3-1" as={NavLink} to="/po/poLists">
                List Of PO
              </Nav.Item>
              <Nav.Item eventKey="3-2" as={NavLink} to="/po/addpo">
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
              <Nav.Item eventKey="4-1" as={NavLink} to="/LdCpAopStatus">
                LD/CP/AOP Strike Off Status
              </Nav.Item>
              <Nav.Item eventKey="4-2" as={NavLink} to="/ppStatus">
                PP Status
              </Nav.Item>
              <Nav.Item eventKey="4-3" as={NavLink} to="/bulkProductionStatus">
                Bulk production Status
              </Nav.Item>
            </Nav.Menu>
            {/* Tack Pack  */}
            <Nav.Item
              eventKey="5"
              icon={<Icon as={IoDocumentTextOutline} />}
              as={NavLink}
              to="/tackPack"
            >
              Tack Pack
            </Nav.Item>
            {/* PP Submission  */}
            <Nav.Item
              eventKey="6"
              icon={<Icon as={MdOutlineFactory} />}
              as={NavLink}
              to="/ppSubmission"
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
              <Nav.Item eventKey="7-1" as={NavLink} to="/courier/courierLists">
                Courier Lists
              </Nav.Item>
              <Nav.Item eventKey="7-2" as={NavLink} to="/courier/noOfCourier">
                No Of Courier
              </Nav.Item>
              <Nav.Item eventKey="6-3" as={NavLink} to="/courier/addcourier">
                Add Courier
              </Nav.Item>
            </Nav.Menu>
            {/*Factory & Port*/}
            <Nav.Item
              eventKey="8"
              icon={<Icon as={MdOutlineFactory} />}
              as={NavLink}
              to="/factoryPort"
            >
              Factory & Port
            </Nav.Item>
            {/*Item */}
            <Nav.Item
              eventKey="9"
              icon={<PageIcon />}
              as={NavLink}
              to="/item/addItem"
            >
              <NavLink to="/item/addItem">
                <p>Item</p>
              </NavLink>
            </Nav.Item>
            {/* Users */}
            {(role === "ADMIN" || role === "SUPERADMIN") && (
              <Nav.Menu
                placement="rightStart"
                eventKey="10"
                title="Users"
                icon={<PeoplesIcon />}
              >
                <Nav.Item eventKey="10-1" as={NavLink} to="/users/userLists">
                  User Lists
                </Nav.Item>
                <Nav.Item eventKey="10-2" as={NavLink} to="/users/addUser">
                  Add User
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
