import { GlobalProvider } from "./providers/global.provider.tsx";
import { RouterProvider } from "./providers/router.provider.tsx";
import { Toast } from "./libs/toast.tsx";

export function App() {
  return (
    <GlobalProvider>
      <RouterProvider />
      <Toast />
    </GlobalProvider>
  );
}
