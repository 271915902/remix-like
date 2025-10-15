"use client";
import { useMemo } from "react";
import FunctionForm from "@/components/FunctionForm";

type AbiItem = {
  type: string;
  name?: string;
  inputs?: { name?: string; type: string; internalType?: string }[];
  outputs?: { name?: string; type: string; internalType?: string }[];
  stateMutability?: string;
};

function isBasicSolType(t: string) {
  if (t.includes("tuple") || t.includes("[") || t.includes("]")) return false;
  return ["address", "bool", "string", "bytes", "bytes32", "uint", "int"].some((x) => t.startsWith(x));
}

export default function FunctionsPanel({ abi, address }: { abi: AbiItem[]; address: `0x${string}` }) {
  const functions = useMemo(() => {
    const list = (abi || []).filter((i) => i.type === "function");
    return list.filter((i) => (i.inputs || []).every((inp) => isBasicSolType(inp.type)));
  }, [abi]);

  const views = functions.filter((f) => ["view", "pure"].includes(f.stateMutability || ""));
  const writes = functions.filter((f) => !["view", "pure"].includes(f.stateMutability || ""));

  return (
    <div className="grid gap-6">
      <h2 className="text-lg font-semibold">根据 ABI 生成的函数</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="grid gap-4">
          <div className="text-sm font-medium">只读函数</div>
          {views.length === 0 && <div className="text-sm text-foreground/60">无</div>}
          {views.map((item, i) => (
            <FunctionForm key={`v-${i}`} item={item} abi={abi} address={address} isView />
          ))}
        </div>
        <div className="grid gap-4">
          <div className="text-sm font-medium">写入/交易函数</div>
          {writes.length === 0 && <div className="text-sm text-foreground/60">无</div>}
          {writes.map((item, i) => (
            <FunctionForm key={`w-${i}`} item={item} abi={abi} address={address} isView={false} />
          ))}
        </div>
      </div>
    </div>
  );
}