import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Form, Link, useNavigate } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import { Logo } from "../common/icons";

export default function Header() {
  const user = useOptionalUser();
  const navigate = useNavigate()

  return (
    <Navbar isBordered isBlurred classNames={{ wrapper: "max-w-4xl" }}>
      <NavbarContent>
        <NavbarBrand as={Link} to={"/"} className="max-h-16 overflow-hidden">
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {user ?
          <Dropdown
            placement="bottom-end"
            showArrow
            radius="sm"
            classNames={{
              base: "before:bg-default-200", // change arrow background
              content: "p-0 border-small border-divider bg-background",
            }}
          >
            <DropdownTrigger>
              <Image src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="avatar" className="rounded-full" width={40} />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Custom item styles"
              disabledKeys={["profile"]}
              className="p-3"
              itemClasses={{
                base: [
                  "rounded-md",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "data-[hover=true]:bg-default-100",
                  "dark:data-[hover=true]:bg-default-50",
                  "data-[selectable=true]:focus:bg-default-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              }}
            >
              <DropdownSection aria-label="Profile & Actions" showDivider>
                <DropdownItem
                  isReadOnly
                  key="profile"
                  className="h-14 gap-2 opacity-100"
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem key="dashboard" onClick={() => navigate("/posts")}>
                  My posts
                </DropdownItem>
              </DropdownSection>

              <DropdownSection aria-label="Preferences" showDivider>
                <DropdownItem key="quick_search" shortcut="⌘K">
                  Quick search
                </DropdownItem>
                <DropdownItem
                  isReadOnly
                  key="theme"
                  className="cursor-default"
                  endContent={
                    <select
                      className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                      id="theme"
                      name="theme"
                    >
                      <option>System</option>
                      <option>Dark</option>
                      <option>Light</option>
                    </select>
                  }
                >
                  Theme
                </DropdownItem>
              </DropdownSection>

              <DropdownSection aria-label="Help & Feedback">
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout">
                  <Form action="/logout" method="post">
                    <button type="submit">Logout</button>
                  </Form>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
          : <>
            <NavbarItem as={Link} to={"/login"}>
              Login
            </NavbarItem>
            <NavbarItem as={Link} to={"/register"}>
              <Button color="primary" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        }
      </NavbarContent>
    </Navbar>
  );
}
