"use client"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

const UserAvatar = () => {
  return (
    <Dropdown>
    <DropdownTrigger>
      <div className="flex flex-row cursor-pointer justify-center items-center gap-3">
        <Avatar
          as="button"
          className="transition-transform"
          name="Jason Hughes"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
        <p className="hidden xl:block">Jason Hughes</p>
      </div>
    </DropdownTrigger>
    <DropdownMenu aria-label="User menu">
      <DropdownItem key="profile">Profile</DropdownItem>
      <DropdownItem key="settings">Settings</DropdownItem>
      <DropdownItem key="logout" className="text-danger" color="danger">
        Logout
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
  );
};

export default UserAvatar;
