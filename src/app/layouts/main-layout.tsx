import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "@src/index.css"

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Theme accentColor="ruby">
      i am main layout
      {children}
    </Theme>
  );
};
