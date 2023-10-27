"use client";

import { SWRConfig } from "swr";

import Header from "./header";
import Navbar from "./navbar";
import Footer from "./footer";
import fetcher from "../util/fetcher";

interface Props {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: Props) {
  return (
    <SWRConfig value={{ fetcher }}>
      <div>
        <Header />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </SWRConfig>
  );
}
