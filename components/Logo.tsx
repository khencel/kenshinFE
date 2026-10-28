import Link from "next/link";
import { BRAND } from "@/lib/data";

export default function Logo() {
  return (
    <Link href="#home" className="d-flex align-items-center gap-3" aria-label="Kenshin home">
      <span className="k-logo-mark">
        <span className="font-jp">剣心</span>
      </span>
      <span>
        <span className="k-logo-name font-serif">{BRAND.name}</span>
        <span className="k-logo-tag">{BRAND.tagline}</span>
      </span>
    </Link>
  );
}
