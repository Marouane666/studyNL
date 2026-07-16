"use client";

import { useEffect, useState } from "react";
import { useT } from "../i18n/I18nProvider";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

const INSTALL_DISMISSED_KEY = "studynl.pwa.installDismissed";
const PUSH_ASKED_KEY = "studynl.pwa.pushAsked";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type Device = {
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  isStandalone: boolean;
};

function detectDevice(): Device {
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true;
  return { isIOS, isAndroid, isMobile: isIOS || isAndroid, isStandalone };
}

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

async function subscribeToPush(): Promise<void> {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!publicKey || !("serviceWorker" in navigator) || !("PushManager" in window)) return;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });
  }

  await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscription),
  }).catch(() => {});
}

export function PwaBoot() {
  const t = useT();
  const [device, setDevice] = useState<Device | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installDismissed, setInstallDismissed] = useState(true);
  const [installing, setInstalling] = useState(false);
  const [showPushAsk, setShowPushAsk] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    setDevice(detectDevice());
    try {
      setInstallDismissed(window.localStorage.getItem(INSTALL_DISMISSED_KEY) === "1");
    } catch {
      setInstallDismissed(false);
    }

    function offerPushIfEligible() {
      if (typeof Notification === "undefined" || Notification.permission !== "default") return;
      try {
        if (window.localStorage.getItem(PUSH_ASKED_KEY) === "1") return;
      } catch {
        /* localStorage unavailable — fall through and ask anyway */
      }
      setShowPushAsk(true);
    }

    function onBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }

    function onAppInstalled() {
      setDeferredPrompt(null);
      try {
        window.localStorage.setItem(INSTALL_DISMISSED_KEY, "1");
      } catch {
        /* ignore */
      }
      offerPushIfEligible();
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    // Users who already installed (including iOS, which has no
    // beforeinstallprompt event at all) still get one chance to opt into push.
    if (detectDevice().isStandalone) offerPushIfEligible();

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  function dismissInstall() {
    setInstallDismissed(true);
    try {
      window.localStorage.setItem(INSTALL_DISMISSED_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  async function handleInstallClick() {
    if (!deferredPrompt) return;
    setInstalling(true);
    try {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
    } catch {
      /* user dismissed the native prompt or it failed — nothing to recover */
    }
    setDeferredPrompt(null);
    setInstalling(false);
  }

  function markPushAsked() {
    setShowPushAsk(false);
    try {
      window.localStorage.setItem(PUSH_ASKED_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  async function handleEnablePush() {
    markPushAsked();
    await subscribeToPush();
  }

  if (!device || !device.isMobile) return null;

  const showInstallBanner = !device.isStandalone && !installDismissed && (device.isAndroid ? !!deferredPrompt : device.isIOS);

  if (showInstallBanner) {
    return (
      <InstallBanner
        title={t("pwa.install.title")}
        subtitle={device.isAndroid ? t("pwa.install.subtitle") : t("pwa.install.iosSubtitle")}
        actionLabel={device.isAndroid ? (installing ? t("pwa.install.installing") : t("pwa.install.action")) : undefined}
        onAction={device.isAndroid ? handleInstallClick : undefined}
        dismissLabel={device.isAndroid ? t("pwa.install.dismiss") : t("pwa.install.gotIt")}
        onDismiss={dismissInstall}
      />
    );
  }

  if (showPushAsk) {
    return (
      <InstallBanner
        title={t("pwa.push.title")}
        subtitle={t("pwa.push.subtitle")}
        actionLabel={t("pwa.push.enable")}
        onAction={handleEnablePush}
        dismissLabel={t("pwa.push.dismiss")}
        onDismiss={markPushAsked}
      />
    );
  }

  return null;
}

function InstallBanner({
  title,
  subtitle,
  actionLabel,
  onAction,
  dismissLabel,
  onDismiss,
}: {
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
  dismissLabel: string;
  onDismiss: () => void;
}) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-sm rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(9,42,77,0.18)] ring-1 ring-[#092A4D]/10">
      <p className="text-sm font-bold" style={{ color: NAVY }}>
        {title}
      </p>
      <p className="mt-1 text-xs leading-relaxed" style={{ color: `${NAVY}99` }}>
        {subtitle}
      </p>
      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-full px-4 py-2 text-xs font-bold"
          style={{ color: `${NAVY}99` }}
        >
          {dismissLabel}
        </button>
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center rounded-full px-4 py-2 text-xs font-bold text-white shadow-sm hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
