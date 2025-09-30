import { useEffect } from "react";
import PWABadge from "@src/PWABadge";

function App() {
  // const requestNotificationPermission = async () => {
  //   const permission = await Notification.requestPermission();
  //   console.log('Permission:', permission); // Should be "granted" if user clicks Allow
  //   return permission;
  // };

  // requestNotificationPermission();
  // In your App.tsx or wherever
  const testNotification = async () => {
    console.log("Test button clicked");
    console.log("Permission:", Notification.permission);

    if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      console.log("New permission:", permission);
      if (permission !== "granted") return;
    }

    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        console.log("Service worker ready, showing notification...");

        await registration.showNotification("Fridge Update! 🥬", {
          body: "New tampon drop at 5th St Fridge",
          icon: "/pwa-192x192.png",
          tag: "fridge-update",
        });

        console.log("Notification shown!");
      } catch (error) {
        console.error("Notification error:", error);
      }
    }
  };

  return (
    <>
      <h1>Fridge Buddy…</h1>

      <button onClick={testNotification}>Test Notification</button>
      <PWABadge />
    </>
  );
}

export default App;
