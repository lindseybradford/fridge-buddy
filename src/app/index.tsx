import { AppProvider } from "./provider";
import { TestError } from "@src/components/TestError";

export const App = () => {
    
  return (
    <AppProvider>
      <h1>App</h1>
      <TestError />
    </AppProvider>
  )
}

export default App;