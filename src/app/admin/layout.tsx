import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | İnşaat Yapı",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
