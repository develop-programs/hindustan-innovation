"use client"

import React, {
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react"
import { AnimatePresence, motion, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations: MotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0)
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    )

    useEffect(() => {
      const timeout = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }, [index, delay])

    const itemsToShow = useMemo(() => {
      return Array.from(
        { length: Math.min(index + 1, childrenArray.length) },
        (_, i) => {
          const itemIndex = (index - i) % childrenArray.length
          const item = childrenArray[itemIndex] as React.ReactElement
          // Use absolute index to ensure stable keys for the lifetime of the item
          return React.cloneElement(item, { key: `${item.key}-${index - i}` })
        }
      )
    }, [index, childrenArray])

    return (
      <div
        className={cn(`flex flex-col items-center gap-4`, className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedList.displayName = "AnimatedList"
