"use client";

import { SWRConfig } from "swr";

import Header from "./header";
import Navbar from "./navbar";
import Footer from "./footer";
import fetcher from "../util/fetcher";
import SearchBar from "./search-bar";

interface Props {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: Props) {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="flex flex-col min-h-screen max-w-md m-auto items-center justify-center">
        <SearchBar />
        <Header />
        <Navbar />
        <main className="w-full p-5 bg-slate-800 rounded-lg my-2">
          {children}
        </main>
        <Footer />
      </div>
    </SWRConfig>
  );
}
