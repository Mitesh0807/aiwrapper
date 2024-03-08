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

export const SidebarWrapper = () => {
  const sidebarItemData = [
    {
      _id: "65e8375877f458805b0fb03e",
      prompt: "last 4 fifa worlcup winners",
      user_id: "65c35b1f73dc212cb9b9c78d",
      createdAt: "Wed Mar 06 2024 14:58:56 GMT+0530 (India Standard Time)",
      updatedAt: "2024-03-06T09:28:56.000Z",
      __v: 0,
    },
    {
      _id: "65e70add95ab8895d866aaa2",
      prompt: "full form of cng",
      user_id: "65c35b1f73dc212cb9b9c78d",
      createdAt: "Tue Mar 05 2024 17:36:53 GMT+0530 (India Standard Time)",
      updatedAt: "2024-03-05T12:06:53.000Z",
      __v: 0,
    },
    {
      _id: "65e6f3e7420dc6fd65869b35",
      prompt: "full form of cng",
      user_id: "65c35b1f73dc212cb9b9c78d",
      createdAt: "Tue Mar 05 2024 15:58:55 GMT+0530 (India Standard Time)",
      updatedAt: "2024-03-05T10:28:55.000Z",
      __v: 0,
    },
    {
      _id: "65e6f065f9aed145c2380ce6",
      prompt: "color of mars",
      user_id: "65c35b1f73dc212cb9b9c78d",
      createdAt: "Tue Mar 05 2024 15:43:57 GMT+0530 (India Standard Time)",
      updatedAt: "2024-03-05T10:13:57.000Z",
      __v: 0,
    },
    {
      _id: "65e6f03645dab04f09e46133",
      prompt: "color of mars",
      user_id: "65c35b1f73dc212cb9b9c78d",
      createdAt: "Tue Mar 05 2024 15:43:10 GMT+0530 (India Standard Time)",
      updatedAt: "2024-03-05T10:13:10.000Z",
      __v: 0,
    },
    {
      _id: "65e6e748e75e730c659181c8",
      prompt: "test prompt",
      createdAt: " test",
      user_id: "65c35b1f73dc212cb9b9c78d",
      __v: 0,
    },
  ];

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
            <Button color="primary" variant="solid">
              New Chat
            </Button>

            {sidebarItemData.map((information) => (
              <SidebarItem
                title={information.prompt}
                icon={<DevIcon />}
                isActive={false}
                href={`${information._id}`}
              />
            ))}

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
            <SidebarItem title="Home" icon={<HomeIcon />} href="/" />
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
            <SidebarItem title="Home" icon={<HomeIcon />} href="/" />
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
