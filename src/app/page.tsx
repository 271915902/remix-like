"use client";
import { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";
import WalletControls from "@/components/WalletControls";
import ChainSignCard from "@/components/ChainSignCard";
import AbiEditorCard from "@/components/AbiEditorCard";
import FunctionsPanel from "@/components/FunctionsPanel";

type AbiItem = {
  type: string;
  name?: string;
  inputs?: { name?: string; type: string; internalType?: string }[];
  outputs?: { name?: string; type: string; internalType?: string }[];
  stateMutability?: string;
};



export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const [abiText, setAbiText] = useState<string>("");
  const [addrText, setAddrText] = useState<string>("");
  const [abiErr, setAbiErr] = useState<string>("");
  // 防止 SSR 与客户端初始渲染不一致导致的水合报错
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const parsedAbi = useMemo(() => {
    if (!abiText) return null;
    try {
      const json = JSON.parse(abiText) as AbiItem[];
      setAbiErr("");
      return json;
    } catch (e: any) {
      setAbiErr(e?.message || "ABI 解析失败");
      return null;
    }
  }, [abiText]);


  const metamask =
    connectors.find((c) => c.name.toLowerCase().includes("metamask")) ||
    connectors[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 px-2 sm:px-4 py-6 sm:py-10 max-w-7xl mx-auto grid gap-8">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Remix-like ABI 调用演示</h1>
        <WalletControls
          mounted={mounted}
          address={address}
          isConnected={isConnected}
          isConnecting={isConnecting}
          onConnect={() => connect({ connector: metamask })}
          onDisconnect={() => disconnect()}
        />
      </header>

      {mounted && <ChainSignCard />}

      <AbiEditorCard
        addrText={addrText}
        setAddrText={setAddrText}
        abiText={abiText}
        setAbiText={setAbiText}
        abiErr={abiErr}
      />

      {parsedAbi && addrText && addrText.startsWith("0x") && (
        <FunctionsPanel abi={parsedAbi as any} address={addrText as `0x${string}`} />
      )}
    </div>
  );
}
