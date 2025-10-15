"use client";
import Card from "@/components/ui/card";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";

export default function AbiEditorCard({
  addrText,
  setAddrText,
  abiText,
  setAbiText,
  abiErr,
}: {
  addrText: string;
  setAddrText: (v: string) => void;
  abiText: string;
  setAbiText: (v: string) => void;
  abiErr?: string;
}) {
  return (
    <Card className="space-y-4 p-4 sm:p-6 rounded-lg border border-black/10 dark:border-white/10 shadow-sm bg-white dark:bg-neutral-900">
      <Label>合约地址</Label>
      <Input className="font-mono" placeholder="0x..." value={addrText} onChange={(e) => setAddrText(e.target.value)} />
      <Label>ABI JSON</Label>
      <Textarea
        className="font-mono min-h-40 resize-y"
        placeholder="粘贴编译好的 ABI JSON 字符串"
        value={abiText}
        onChange={(e) => setAbiText(e.target.value)}
      />
      {abiErr && (
        <pre className="text-sm font-mono whitespace-pre-wrap break-words text-red-600 dark:text-red-400 max-w-[70ch]">{abiErr}</pre>
      )}
    </Card>
  );
}