import { LeftPanel } from "./LeftPanel";
import { TopBar } from "./TopBar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <LeftPanel />

      <div className="flex-1 flex flex-col">
        <TopBar /> 
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
};
