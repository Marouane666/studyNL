"use client";

import { useEffect, useState } from "react";
import { SiAndroidauto } from "react-icons/si";
import { FaAppStoreIos, FaBell, FaCheck } from "react-icons/fa";
import { FaMobileScreen } from "react-icons/fa6";
import { useT } from "../i18n/I18nProvider";

const NAVY = "#092A4D";

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

type PushOutcome = "idle" | "loading" | "success" | "failed";

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

// Permission being "granted" doesn't mean a live subscription still exists —
// the push service can invalidate/rotate it for reasons outside our control,
// and without this check there is no other path that would ever notice and
// re-subscribe (the ask UI only ever shows once, gated by PUSH_ASKED_KEY).
// This intentionally ignores that gate: it's about keeping an
// already-granted subscription alive, not about whether to show the prompt.
async function revalidateSubscription(): Promise<void> {
  if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
  try {
    const registration = await navigator.serviceWorker.ready;
    const existing = await registration.pushManager.getSubscription();
    if (existing) return;
  } catch {
    return;
  }
  subscribeToPush();
}

// Returns whether the subscription genuinely ended up saved server-side —
// every failure mode (permission denied, unsupported browser, subscribe
// error, network error saving it) is reported back instead of swallowed, so
// the UI can tell the user the truth instead of silently doing nothing.
async function subscribeToPush(): Promise<boolean> {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!publicKey || !("serviceWorker" in navigator) || !("PushManager" in window)) return false;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return false;

    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
    }

    const res = await fetch("/api/push/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function PwaBoot() {
  const t = useT();
  const [device, setDevice] = useState<Device | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installDismissed, setInstallDismissed] = useState(true);
  const [installing, setInstalling] = useState(false);
  const [showPushCard, setShowPushCard] = useState(false);
  const [pushOutcome, setPushOutcome] = useState<PushOutcome>("idle");

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

    revalidateSubscription();

    function onBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }

    function onAppInstalled() {
      // Only clear the live prompt — don't permanently mark the banner as
      // dismissed. If this install is later uninstalled, isStandalone goes
      // back to false and the browser can offer to install again; a
      // permanent flag here would hide the banner forever after that.
      setDeferredPrompt(null);
      // Covers installs triggered from the browser's own UI (e.g. the address-bar
      // icon) rather than our button, which otherwise chains this itself.
      maybeShowPushCard();
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    // Already-installed users (including iOS, which has no beforeinstallprompt
    // event at all) still get one chance to confirm push notifications.
    if (detectDevice().isStandalone) maybeShowPushCard();

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  function persistDismissed() {
    setInstallDismissed(true);
    try {
      window.localStorage.setItem(INSTALL_DISMISSED_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  function maybeShowPushCard() {
    if (typeof Notification === "undefined" || Notification.permission !== "default") return;
    try {
      if (window.localStorage.getItem(PUSH_ASKED_KEY) === "1") return;
    } catch {
      /* localStorage unavailable — fall through and ask anyway */
    }
    setPushOutcome("idle");
    setShowPushCard(true);
  }

  function dismissPushCard() {
    setShowPushCard(false);
    try {
      window.localStorage.setItem(PUSH_ASKED_KEY, "1");
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
    maybeShowPushCard();
  }

  async function handleAcceptPush() {
    setPushOutcome("loading");
    const ok = await subscribeToPush();
    // Mark as asked only once we have a real answer — an unlucky reload mid-request
    // won't permanently skip the ask.
    try {
      window.localStorage.setItem(PUSH_ASKED_KEY, "1");
    } catch {
      /* ignore */
    }
    setPushOutcome(ok ? "success" : "failed");
  }

  if (!device || !device.isMobile) return null;

  const showInstallBanner = !device.isStandalone && !installDismissed && (device.isAndroid ? !!deferredPrompt : device.isIOS);

  if (showInstallBanner) {
    const platformActionLabel = device.isAndroid
      ? t("pwa.install.actionAndroid")
      : device.isIOS
        ? t("pwa.install.actionIOS")
        : t("pwa.install.action");

    const PlatformIcon = device.isAndroid ? SiAndroidauto : device.isIOS ? FaAppStoreIos : FaMobileScreen;

    return (
      <PwaCard
        icon={<PlatformIcon size={16} />}
        title={t("pwa.install.title")}
        subtitle={device.isAndroid ? t("pwa.install.valueProp") : t("pwa.install.iosSubtitle")}
        actionLabel={device.isAndroid && installing ? t("pwa.install.installing") : platformActionLabel}
        onAction={device.isAndroid ? handleInstallClick : persistDismissed}
        onDismiss={persistDismissed}
        dismissAriaLabel={t("pwa.dismissAriaLabel")}
      />
    );
  }

  if (showPushCard) {
    if (pushOutcome === "success") {
      return (
        <PwaCard
          icon={<FaCheck size={16} />}
          title={t("pwa.pushConfirm.successTitle")}
          subtitle={t("pwa.pushConfirm.successSubtitle")}
          actionLabel={t("pwa.pushConfirm.done")}
          onAction={dismissPushCard}
          onDismiss={dismissPushCard}
          dismissAriaLabel={t("pwa.dismissAriaLabel")}
        />
      );
    }
    if (pushOutcome === "failed") {
      return (
        <PwaCard
          icon={<FaBell size={16} />}
          title={t("pwa.pushConfirm.failTitle")}
          subtitle={t("pwa.pushConfirm.failSubtitle")}
          actionLabel={t("pwa.pushConfirm.done")}
          onAction={dismissPushCard}
          onDismiss={dismissPushCard}
          dismissAriaLabel={t("pwa.dismissAriaLabel")}
        />
      );
    }
    return (
      <PwaCard
        icon={<FaBell size={16} />}
        title={t("pwa.pushConfirm.title")}
        subtitle={t("pwa.pushConfirm.subtitle")}
        actionLabel={pushOutcome === "loading" ? t("pwa.pushConfirm.accepting") : t("pwa.pushConfirm.accept")}
        onAction={handleAcceptPush}
        onDismiss={dismissPushCard}
        dismissAriaLabel={t("pwa.dismissAriaLabel")}
      />
    );
  }

  return null;
}

function PwaCard({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
  onDismiss,
  dismissAriaLabel,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  actionLabel: string;
  onAction: () => void;
  onDismiss: () => void;
  dismissAriaLabel: string;
}) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-sm">
      <div className="relative rounded-4xl bg-white p-4 text-center shadow-[0_12px_40px_rgba(9,42,77,0.22)]">
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissAriaLabel}
          className="absolute -right-2 -top-2 inline-flex size-5 items-center justify-center rounded-full bg-white text-xs leading-none shadow ring-1 ring-[#092A4D]/10 hover:text-[#092A4D]"
          style={{ color: `${NAVY}80` }}
        >
          <CloseIcon />
        </button>

        <h2 className="text-base font-extrabold" style={{ color: NAVY }}>
          {title}
        </h2>
        <p className="mx-auto mt-1 max-w-70 text-xs leading-snug" style={{ color: `${NAVY}99` }}>
          {subtitle}
        </p>

        <button
          type="button"
          onClick={onAction}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: NAVY }}
        >
          {icon}
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
