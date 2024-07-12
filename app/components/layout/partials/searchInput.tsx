"use client";

import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import React from "react";
import { SearchIcon } from "~/components/common/icons";

interface SearchInput {
  show?: boolean;
  isMobile?: boolean;
}
export default function SearchInput({
  show: isShow,
  isMobile,
  ...props
}: SearchInput) {
  const [show, setShow] = React.useState(isShow);

  if (!show && !isMobile)
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div onClick={() => setShow(!show)}>
        <SearchIcon
          className="pointer-events-none shrink-0 text-base"
          size={18}
        />
      </div>
    );

  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="pointer-events-none shrink-0 text-base text-default-400" />
      }
      type="search"
      {...props}
    />
  );
}
