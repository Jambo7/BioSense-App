import { Fragment, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Minimal, dependency-free renderer for the light markdown the AI returns:
 *   **bold**, markdown headings (#, ##…) and line/paragraph breaks.
 * Intentionally small — not a full markdown engine — so chat bubbles stay
 * clean and we don't ship a heavy parser.
 */

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const regex = /\*\*(.+?)\*\*/g
  let last = 0
  let key = 0
  let m: RegExpExecArray | null
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>)
    nodes.push(
      <strong key={key++} className="font-semibold text-ink">
        {m[1]}
      </strong>,
    )
    last = m.index + m[0].length
  }
  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>)
  return nodes
}

export function RichText({ text, className }: { text: string; className?: string }) {
  const lines = text.replace(/\r\n/g, '\n').split('\n')

  return (
    <div className={cn('space-y-1.5', className)}>
      {lines.map((line, i) => {
        const trimmed = line.trim()
        if (trimmed === '') return <div key={i} className="h-1.5" aria-hidden />

        // Markdown heading → bold line.
        const heading = trimmed.match(/^#{1,6}\s+(.*)$/)
        if (heading) {
          return (
            <p key={i} className="font-semibold text-ink">
              {renderInline(heading[1])}
            </p>
          )
        }

        return <p key={i}>{renderInline(line)}</p>
      })}
    </div>
  )
}
