"use client";
import { useState } from "react";
import { usePublicClient, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Checkbox from "@/components/ui/checkbox";

type AbiItem = {
  type: string;
  name?: string;
  inputs?: { name?: string; type: string; internalType?: string }[];
  outputs?: { name?: string; type: string; internalType?: string }[];
  stateMutability?: string;
};

function coerceArg(type: string, raw: string | boolean) {
  if (type.startsWith("uint") || type.startsWith("int")) {
    if (typeof raw === "boolean") throw new Error("期望数字");
    return BigInt(raw);
  }
  if (type === "bool") return Boolean(raw);
  return raw as string;
}

function stringifyResult(value: any): string {
  try {
    if (typeof value === "string") return value;
    if (typeof value === "bigint") return value.toString();
    return JSON.stringify(value, (_, v) =>
      typeof v === "bigint" ? v.toString() : v
    );
  } catch {
    return String(value);
  }
}

export default function FunctionForm({
  item,
  abi,
  address,
  isView,
}: {
  item: AbiItem;
  abi: AbiItem[];
  address: `0x${string}`;
  isView: boolean;
}) {

  const publicClient = usePublicClient();
  const { writeContractAsync, isPending } = useWriteContract();
  const [args, setArgs] = useState<Record<string, string | boolean>>({});
  const [valueEth, setValueEth] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const onChangeArg = (idx: number, v: string | boolean) => {
    const name = item.inputs?.[idx]?.name || `arg${idx}`;
    setArgs((prev) => ({ ...prev, [name]: v }));
  };

  const handleCall = async () => {
    setError("");
    setResult(null);
    try {
      const fn = item.name as string;
      const coerced = (item.inputs || []).map((input, i) =>
        coerceArg(input.type, args[input.name || `arg${i}`])
      );

      if (isView) {
        const data = await publicClient.readContract({
          abi,
          address,
          functionName: fn,
          args: coerced as any,
        });
        setResult(data);
      } else {
        const txHash = await writeContractAsync({
          abi,
          address,
          functionName: fn,
          args: coerced as any,
          value:
            item.stateMutability === "payable" && valueEth
              ? parseEther(valueEth)
              : undefined,
        });
        setResult(txHash);
      }
    } catch (e: any) {
      setError(e?.message || String(e));
    }
  };

  return (
    <Card className="space-y-4 p-4 sm:p-6 rounded-lg border border-black/10 dark:border-white/10 shadow-sm bg-white dark:bg-neutral-900">
      <div className="flex items-center justify-between">
        <div className="font-mono text-sm font-semibold">{item.name}</div>
        <div className="text-xs rounded px-2 py-1 border border-black/10 dark:border-white/20">
          {isView ? "view/pure" : item.stateMutability}
        </div>
      </div>
      <div className="grid gap-3">
        {(item.inputs || []).map((input, idx) => (
          <div key={idx} className="grid gap-1">
            <Label>
              {input.name || `arg${idx}`} ({input.type})
            </Label>
            {input.type === "bool" ? (
              <div className="flex items-center gap-2">
                <Checkbox onChange={(e) => onChangeArg(idx, e.target.checked)} />
                <span className="text-sm text-foreground/70">true/false</span>
              </div>
            ) : (
              <Input
                className="font-mono"
                placeholder={
                  input.type.startsWith("address")
                    ? "0x..."
                    : input.type.startsWith("uint") || input.type.startsWith("int")
                    ? "数字 (将转为 bigint)"
                    : "输入值"
                }
                onChange={(e) => onChangeArg(idx, e.target.value)}
              />
            )}
          </div>
        ))}
        {!isView && item.stateMutability === "payable" && (
          <div className="grid gap-1">
            <Label>附加以太（ETH）</Label>
            <Input
              className="w-[200px] font-mono"
              placeholder="例如 0.01"
              value={valueEth}
              onChange={(e) => setValueEth(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={handleCall} disabled={isPending}>
          {isPending ? "处理中..." : isView ? "读取" : "调用"}
        </Button>
      </div>
      <div>
        {error && (
          <div className="flex items-start gap-2">
            <pre
              className={`text-sm font-mono whitespace-pre-wrap break-words text-red-600 dark:text-red-400 max-w-[70ch]`}
              aria-live="polite"
            >
              {error}
            </pre>
          </div>
        )}
      </div>
      {result !== null && (
        <div className="grid gap-1">
          <Label>结果</Label>
          <pre className="text-xs font-mono whitespace-pre-wrap break-words p-2 rounded border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/10">
            {stringifyResult(result)}
          </pre>
        </div>
      )}
    </Card>
  );
}