'use client'
type BottomContentProps = {
  updatedAt: string
}
const BottomContent = ({ updatedAt }: BottomContentProps) => {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="text-small text-default-400" suppressHydrationWarning>
        Updated at {updatedAt}
      </span>
    </div>
  )
}

export default BottomContent
