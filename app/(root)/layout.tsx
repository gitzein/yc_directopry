import { ReactNode } from "react";
import Navbar from "../../components/Navbar";

export default function layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
