"use client"
import Image from "next/image"
import posthog from "posthog-js"

const ExploreBtn = () => {
  const handleClick = () => {
    console.log("Hello World")
    posthog.capture("explore_events_clicked")
  }

  return (
    <button type="button"  className="mt-7 mx-auto" id="explore-btn" onClick={handleClick}>
    <a href = "events">
        Explore Events
        <Image src="/icons/arrow-down.svg" alt="arrow down" width={24} height={26} />
    </a>

    </button>
  )
}

export default ExploreBtn
