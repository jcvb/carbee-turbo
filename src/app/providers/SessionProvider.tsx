"use client";

import React, { ReactNode } from "react";
import { SessionProvider as Provider } from "next-auth/react";
interface Props {
  children: ReactNode;
}

const SessionProvider = ({ children }: Props) => {
  return <Provider>{children}</Provider>;
};

export { SessionProvider };