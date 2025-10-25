"use client";

import { useUserNameStore } from "@/hooks/zustand/userNameStore";

export const Footer = () => {
  const { userName } = useUserNameStore();

  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center bg-neutral-300">
      <p>Copyright © 2025 SG Boilerplate. All rights reserved.</p>
      {userName && <p>Welcome, {userName}!</p>}
    </footer>
  );
};

export default Footer;
