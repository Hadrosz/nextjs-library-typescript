"use client";
import React, { useContext, useEffect, useState } from "react";
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
  Button,
} from "@nextui-org/react";
import { SearchIcon } from "@/components/assets/NavBarLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/libs/supabase/client";
import { LogSVG } from "@/components/assets/FormsAsset";
import { useAuth } from "@/libs/context/session";

export default function NavBar() {
  const [isLoading] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { session, user, signOut } = useAuth();

  const handleSignOut = async () => {
    signOut();
  };

  const path = usePathname();
  const userUsername = session?.user?.user_metadata.user_name;

  const menuItems = [
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
        {menuItems.map((item, i) => {
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
            <Button
              as={Link}
              href="/auth/login"
              isLoading={isLoading}
              color="secondary"
            >
              Login
            </Button>
          </NavbarItem>
        )}
        <NavbarItem className={`${session ? "" : "hidden"}`}>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={userUsername}
                size="sm"
                src={
                  user?.user_metadata.avatar_url
                    ? `${user?.user_metadata.avatar_url}`
                    : `https://unavatar.io/${userUsername}`
                }
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="shadow"
              className="w-[230px]"
            >
              <DropdownItem key="profile" className="h-20 gap-3">
                <p className="font-bold">Signed in as</p>
                <p className="font-medium">{userUsername}</p>
                <p className="font-medium truncate">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                onClick={handleSignOut}
                className="flex flex-row bg-red-500 hover:bg-red-600 "
                startContent={<LogSVG />}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="flex">
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            className="py-6 w-full flex justify-center border-b-1 border-gray-800"
          >
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href={item.link}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        {!user && (
          <NavbarMenuItem className="mt-8 w-full flex justify-center self-end">
            <Button as={Link} href="/auth/login" color="secondary">
              Login
            </Button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
