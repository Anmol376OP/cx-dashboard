"use client"

import React from "react"
import {
  ResponsiveContainer,
  LegendProps,
} from "recharts"
import { cn } from "@/lib/utils"

const THEMES = { light: "", dark: ".dark" } as const

// Config per dataKey
export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = { config: ChartConfig }

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig
    children: React.ReactElement
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        {React.isValidElement(children) ? (
          <ResponsiveContainer>{children}</ResponsiveContainer>
        ) : null}
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, item]) => item.color || item.theme
  )

  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => {
            const lines = colorConfig
              .map(([key, item]) => {
                const color =
                  item.theme?.[theme as keyof typeof THEMES] || item.color
                return color ? `  --color-${key}: ${color};` : null
              })
              .filter(Boolean)
              .join("\n")
            return `${prefix} [data-chart=${id}] {\n${lines}\n}`
          })
          .join("\n"),
      }}
    />
  )
}
type ChartPayloadItem = {
  color: string
  name: string
  value: number | string
  dataKey: string
  payload: Record<string, unknown>
}

type CustomTooltipProps = {
  active?: boolean
  payload?: Array<{
    name: string
    value: number | string
    dataKey?: string
    [key: string]: unknown
  }>

  label?: string
  className?: string
  formatter?: (
    value: number | string,
    name: string,
    item: { [key: string]: unknown },
    index: number,
    all: Array<{ [key: string]: unknown }>
  ) => React.ReactNode
  nameKey?: string
}

export const ChartTooltipContent = React.forwardRef<HTMLDivElement, CustomTooltipProps>(
  ({ active, payload, className, formatter, nameKey }, ref) => {
    const { config } = useChart()

    if (!active || !payload?.length) return null

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-md border bg-background p-3 shadow text-xs min-w-[8rem]",
          className
        )}
      >
        <div className="grid gap-1.5">
          {payload.map((item, idx) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = config[key]

            return (
              <div key={idx} className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">
                  {itemConfig?.label || item.name}
                </span>
                <span className="font-mono font-medium">
                  {formatter
                    ? formatter(item.value, item.name, item, idx, payload)
                    : item.value?.toLocaleString()}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  LegendProps & {
    hideIcon?: boolean
    nameKey?: string
    payload: ChartPayloadItem[]
  }
>(({ className, payload, verticalAlign = "bottom", hideIcon = false }, ref) => {
  const { config } = useChart()

  if (!payload?.length) return null

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((entry, idx) => {
        const item = config[entry.dataKey as string]
        return (
          <div key={idx} className="flex items-center gap-1.5">
            {!hideIcon ? (
              <div
                className="h-2 w-2 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
            ) : null}
            {item?.label}
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"
