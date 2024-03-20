import { NavigationBar } from "@/components/common/navigation-bar";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-1 grid-rows-[auto,_1fr] md:grid-rows-1 md:grid-cols-[auto,_1fr] max-h-screen h-screen">
      <NavigationBar />
      <main className="py-12 h-full overflow-y-scroll bg-muted">
        <div className="container">{children}</div>
      </main>
    </div>
  );
};
