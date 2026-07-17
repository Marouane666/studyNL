// StudyNL service worker — installability + web push only. No offline asset
// caching yet, so it can't go stale and serve outdated pages; add caching
// deliberately later if that's needed.

// Public VAPID key — not a secret (that's the point of the "public" half of
// VAPID), but it must match NEXT_PUBLIC_VAPID_PUBLIC_KEY exactly. This file
// is a static asset, not processed by Next.js, so it can't read that env var
// directly — keep both in sync by hand if the key ever rotates.
const VAPID_PUBLIC_KEY = "BFgwJe5QHD9yxbzsZ4S9l2Klq7TMdv18TDvJ4UJftaMiUfgGjyuT61E5K6nU8cO01bhIJ42BajgqiMR_6W5Pa14";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  console.log("[push-debug] push event received, hasData:", !!event.data);
  let payload;
  try {
    payload = event.data ? event.data.json() : null;
  } catch {
    payload = event.data ? { title: "StudyNL", body: event.data.text() } : null;
  }

  const title = (payload && payload.title) || "StudyNL";
  const options = {
    body: (payload && payload.body) || "",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    data: { url: (payload && payload.url) || "/" },
  };

  // Always show something, even with an empty payload — some browsers
  // penalize a push event that doesn't result in a visible notification and
  // can start silently suppressing future ones for this site.
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url ? event.notification.data.url : "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (client.url === url && "focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    }),
  );
});

// Fires when the push service invalidates or rotates the subscription for
// reasons outside our control (token expiry/rotation on the push service's
// side, not anything the user did). Without this handler, a subscription
// that dies has no way to ever come back — the site has no other trigger
// that would notice and re-subscribe.
self.addEventListener("pushsubscriptionchange", (event) => {
  console.log("[push-debug] pushsubscriptionchange fired, old:", event.oldSubscription && event.oldSubscription.endpoint);
  event.waitUntil(
    self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      })
      .then((subscription) => {
        console.log("[push-debug] resubscribed:", subscription.endpoint);
        return fetch("/api/push/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subscription),
        }).then((res) => console.log("[push-debug] resubscribe POST status:", res.status));
      })
      .catch((err) => {
        // Logged (not silently swallowed) — revalidateSubscription() now
        // unconditionally re-POSTs on every app boot regardless, so this no
        // longer relies on this comment being true to actually recover.
        console.error("[push-debug] pushsubscriptionchange resubscribe failed:", err);
      }),
  );
});
