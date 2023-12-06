/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { GoBell } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { getUserInfo, removeUserInfo } from "../../hooks/services/auth.service";
import { getAuthKey, fileUrlKey } from "../../config/envConfig";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    removeUserInfo(getAuthKey());
    navigate("/login");
  };

  const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#", onClick: logOut },
  ];

  const user = getUserInfo() as any;

  // console.log(user);
  // console.log(`${fileUrlKey()}/${user?.profileImage}`);

  return (
    <>
      <div className="flex z-50 flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-between py-3 border-b h-[60px] shadow-sm bg-white sticky top-0 items-center">
        <div className="pl-5">
          <h2 className="font-semibold">
            Welcome back, {user?.firstName} {user?.lastName} 👋
          </h2>
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6 pr-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <GoBell size={24} aria-hidden="true" />
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex border items-center p-1 rounded-full ">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-10 w-10 object-cover  rounded-full "
                src={`${fileUrlKey()}/${user?.profileImage}`}
                alt=""
              />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        onClick={item.onClick}
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900"
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Navbar;
