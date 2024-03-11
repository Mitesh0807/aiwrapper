import { Sidebar } from "./sidebar.styles";
import { HomeIcon } from "./icons/sidebar/home-icon";
import { PaymentsIcon } from "./icons/sidebar/payments-icon";
import { AccountsIcon } from "./icons/sidebar/accounts-icon";
import { CustomersIcon } from "./icons/sidebar/customers-icon";
import { ProductsIcon } from "./icons/sidebar/products-icon";
import { ReportsIcon } from "./icons/sidebar/reports-icon";
import { DevIcon } from "./icons/sidebar/dev-icon";
import { ViewIcon } from "./icons/sidebar/view-icon";
import { SettingsIcon } from "./icons/sidebar/settings-icon";
import { CompaniesDropdown } from "./Companies-Dropdown";
import { SidebarItem } from "./sidebar-item";
import { Button } from "@nextui-org/react";

//
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  disableAnimation,
  enableAnimation,
  enableNewChat,
} from "../store/slices/dataSlice";
import { useState } from "react";

export const SidebarWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddNewChat = () => {
    dispatch(enableAnimation());
    navigate("/dashboard", { replace: true });
    dispatch(enableNewChat());
  };

  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    dispatch(disableAnimation());
  };

  const sidebarItemData = useSelector((state) => state?.data?.chatHistoryData);
  console.log(sidebarItemData);

  return (
    <aside className="h-screen z-[202] sticky top-0">
      <div
        className={Sidebar({
          // collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <Button color="primary" onClick={handleAddNewChat} variant="solid">
              New Chat
            </Button>

            {sidebarItemData.map((information) => (
              <SidebarItem
                key={`${information._id}`}
                title={information.prompt}
                icon={<DevIcon />}
                isActive={activeItem === information._id}
                href={`${information._id}`}
                onClick={() => handleItemClick(information._id)}
              />
            ))}
            <h6>7 days</h6>
            <SidebarItem
              title="Home Componenet"
              icon={<HomeIcon />}
              isActive={true}
              href="/"
            />
            <SidebarItem
              title="Accounts"
              icon={<AccountsIcon />}
              href="accounts"
            />
            <SidebarItem title="Payments" icon={<PaymentsIcon />} />

            <SidebarItem title="Customers" icon={<CustomersIcon />} />
            <SidebarItem title="Products" icon={<ProductsIcon />} />
            <SidebarItem title="Reports" icon={<ReportsIcon />} />

            <SidebarItem title="Developers" icon={<DevIcon />} />
            <SidebarItem title="View Test Data" icon={<ViewIcon />} />
            <SidebarItem title="Settings" icon={<SettingsIcon />} />
          </div>
        </div>
      </div>
    </aside>
  );
};
