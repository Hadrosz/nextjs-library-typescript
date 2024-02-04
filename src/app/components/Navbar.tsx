"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { SearchIcon } from "@/app/assets/NavBarLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Data } from "../types/type";
import { createClient } from "@/app/utils/supabase/client";

export default function NavBar({ session }: { session: Data }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(session.data.user);

  const supabase = createClient();
  const path = usePathname();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const navbarItems = [
    { name: "Home", link: "/" },
    { name: "Books", link: "/category/books" },
    { name: "Authors", link: "/category/authors" },
    { name: "Series", link: "/category/series" },
  ];

  return (
    <Navbar maxWidth="2xl" onMenuOpenChange={setIsMenuOpen} className="h-16">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">STEP'S</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="gap-8" justify="center">
        {navbarItems.map((item, i) => {
          return (
            <NavbarItem className="hidden sm:flex" key={i}>
              <Link
                href={item.link}
                className={`${path == item.link ? "text-purple-500" : ""} `}
              >
                {item.name}
              </Link>
            </NavbarItem>
          );
        })}
        <NavbarItem>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[20rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon key={5} />}
            type="search"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {!user && (
          <NavbarItem className="hidden lg:flex">
            <Link
              href="/auth/login"
              className="py-2 px-6 bg-purple-600 rounded-xl"
            >
              Login
            </Link>
          </NavbarItem>
        )}
        <NavbarItem className={`${user ? "" : "hidden"}`}>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
