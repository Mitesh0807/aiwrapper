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

export const SidebarWrapper = () => {
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
            <SidebarItem
              title="Home"
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
