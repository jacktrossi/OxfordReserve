import { Nav } from "@/components/nav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="pt-14">{children}</main>
    </>
  );
}
