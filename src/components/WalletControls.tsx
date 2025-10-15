"use client";
import Button from "@/components/ui/button";

export default function WalletControls({
  mounted,
  address,
  isConnected,
  isConnecting,
  onConnect,
  onDisconnect,
}: {
  mounted: boolean;
  address?: string;
  isConnected: boolean;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      {!mounted ? (
        <div className="h-10" />
      ) : !isConnected ? (
        <Button onClick={onConnect} disabled={isConnecting}>
          {isConnecting ? "连接中..." : "连接钱包 (MetaMask)"}
        </Button>
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-sm text-foreground/70">{address}</span>
          <Button variant="outline" onClick={onDisconnect}>
            断开
          </Button>
        </div>
      )}
    </div>
  );
}