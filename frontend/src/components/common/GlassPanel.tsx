import type { HTMLAttributes } from "react"

export type GlassPanelProps = HTMLAttributes<HTMLDivElement>

/**
 * Glass surface panel - for headers, sidebars, toolbars.
 * Uses bg-white/60 with backdrop blur.
 */
export function GlassPanel({ className = "", ...props }: GlassPanelProps) {
  return <div className={`glass ${className}`} {...props} />
}
