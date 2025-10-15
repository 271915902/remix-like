"use client";
import { useEffect, useState } from "react";
import { useAccount, useSwitchChain, useChains, useSignMessage } from "wagmi";
import Card from "@/components/ui/card";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { chains as wagmiChains } from "@/lib/wagmi";

export default function ChainSignCard() {
  const { isConnected, chainId } = useAccount();
  const chainsHook = useChains() as any;
  const chains = chainsHook && chainsHook.length ? chainsHook : wagmiChains;
  const { switchChain, isPending: switching } = useSwitchChain();
  const { signMessageAsync, data: signature } = useSignMessage();

  const [randMsg, setRandMsg] = useState<string>("");
  useEffect(() => {
    if (!randMsg) {
      setRandMsg(`Sign-${Math.random().toString(36).slice(2)}-${Date.now()}`);
    }
  }, [randMsg]);

  const doSign = async () => {
    await signMessageAsync({ message: randMsg });
  };

  return (
    <Card className="space-y-4 p-4 sm:p-6 rounded-lg border border-black/10 dark:border-white/10 shadow-sm bg-white dark:bg-neutral-900">
      <div className="grid sm:grid-cols-3 gap-3 items-end">
        <div className="grid gap-1">
          <Label>当前链</Label>
          <Select
            value={String(chainId ?? "1")}
            onChange={(e) => switchChain({ chainId: Number(e.target.value) })}
            disabled={!isConnected || switching}
          >
            {chains.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-1 sm:col-span-2">
          <Label>随机消息</Label>
          <div className="flex gap-2">
            <Input className="font-mono" value={randMsg} onChange={(e) => setRandMsg(e.target.value)} />
            <Button onClick={doSign} disabled={!isConnected}>
              {isConnected ? "签名" : "请先连接"}
            </Button>
          </div>
        </div>
        {signature && (
          <div className="grid gap-1">
            <Label>签名</Label>
            <pre className="text-xs font-mono whitespace-pre-wrap break-words p-2 rounded border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/10">
              {signature}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
}