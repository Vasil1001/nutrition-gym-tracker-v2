import React from 'react'

const GuestBanner: React.FC = () => {
  return (
    <div className="rounded-lg bg-zinc-100 px-4 py-3 shadow-sm">
      <p className="text-sm text-zinc-800">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-500"></span>
        You are currently using guest mode.
      </p>
    </div>
  )
}

export default GuestBanner
