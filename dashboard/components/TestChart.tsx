import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { AreaClosed, Line, Bar, LinePath } from '@visx/shape';
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { curveMonotoneX } from '@visx/curve';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleTime, scaleLinear } from '@visx/scale';
import { withTooltip, Tooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { max, extent, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';

type TooltipData = AppleStock;

const stock = appleStock.slice(800);
export const background = '#ffffff';
export const background2 = '#204051';
export const accentColor = '#000000';
export const accentColorDark = '#1d701a';
const tooltipStyles = {
    ...defaultStyles,
    background,
    border: '1px solid white',
    color: 'grey',
};

// util
const formatDate = timeFormat("%b %d, '%y");

// accessors
const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;
const bisectDate = bisector(d => new Date(d.date)).left;

export type AreaProps = {
    margin?: { top: number; right: number; bottom: number; left: number };
};

export default withTooltip<AreaProps, TooltipData>(
    ({
        margin = { top: 0, right: 0, bottom: 0, left: 0 },
        showTooltip,
        hideTooltip,
        tooltipData,
        tooltipTop = 0,
        tooltipLeft = 0,
    }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
        const [size, setSize] = useState({
            width: 100,
            height: 100,
        })

        const canvasRef = useRef(null);

        // useEffect will run on stageCanvasRef value assignment
        useEffect(() => {

            // The 'current' property contains info of the reference:
            // align, title, ... , width, height, etc.


            // only execute all the code below in client side
            if (typeof window !== 'undefined') {
                // Handler to call on window resize
                const handleResize = () => {
                    // Set window width/height to state
                    if (canvasRef.current) {

                        let h = canvasRef.current.offsetHeight;
                        let w = canvasRef.current.offsetWidth;
                        setSize(
                            {
                                width: w,
                                height: h,

                            })
                    }
                }

                // Add event listener
                window.addEventListener("resize", handleResize);

                // Call handler right away so state gets updated with initial window size
                handleResize();

                // Remove event listener on cleanup
                return () => window.removeEventListener("resize", handleResize);
            }
        }, [canvasRef]);


        if (size.width < 10) return null;



        // bounds
        const innerWidth = size.width - margin.left - margin.right;
        const innerHeight = size.height - margin.top - margin.bottom;

        // scales
        const dateScale = useMemo(
            () =>
                scaleTime({
                    range: [margin.left, size.width + margin.left],
                    domain: extent(stock, getDate) as [Date, Date],
                }),
            [size.width, margin.left],
        );
        const stockValueScale = useMemo(
            () =>
                scaleLinear({
                    range: [size.height + margin.top, margin.top],
                    domain: [0, (max(stock, getStockValue) || 0) + size.height / 3],
                    nice: true,
                }),
            [margin.top, size.height],
        );

        // tooltip handler
        const handleTooltip = useCallback(
            (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
                const { x } = localPoint(event) || { x: 0 };
                const x0 = dateScale.invert(x);
                const index = bisectDate(stock, x0, 1);
                const d0 = stock[index - 1];
                const d1 = stock[index];
                let d = d0;
                if (d1 && getDate(d1)) {
                    d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
                }
                showTooltip({
                    tooltipData: d,
                    tooltipLeft: x,
                    tooltipTop: stockValueScale(getStockValue(d)),
                });
            },
            [showTooltip, stockValueScale, dateScale],
        );

        return (
            <div ref={canvasRef}>
                <svg width={size.width} height={size.height}>
                    <rect
                        x={0}
                        y={0}
                        width={size.width}
                        height={size.height}
                        fill="url(#area-background-gradient)"
                        rx={14}
                    />
                    <LinearGradient id="area-gradient" from={accentColor} to={accentColor} toOpacity={0.1} />
                    <LinePath
                        data={stock}
                        x={d => dateScale(getDate(d)) ?? 0}
                        y={d => stockValueScale(getStockValue(d)) ?? 0}
                        strokeWidth={1}
                        stroke="black"
                        curve={curveMonotoneX}
                    />
                    <Bar
                        x={margin.left}
                        y={margin.top}
                        width={innerWidth}
                        height={innerHeight}
                        fill="transparent"
                        rx={14}
                        onTouchStart={handleTooltip}
                        onTouchMove={handleTooltip}
                        onMouseMove={handleTooltip}
                        onMouseLeave={() => hideTooltip()}
                    />
                    {tooltipData && (
                        <g>
                            <Line
                                from={{ x: tooltipLeft, y: margin.top }}
                                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                                stroke={accentColorDark}
                                strokeWidth={2}
                                pointerEvents="none"
                                strokeDasharray="5,2"
                            />
                            <circle
                                cx={tooltipLeft}
                                cy={tooltipTop + 1}
                                r={4}
                                fill="black"
                                fillOpacity={0.1}
                                stroke="black"
                                strokeOpacity={0.1}
                                strokeWidth={2}
                                pointerEvents="none"
                            />
                            <circle
                                cx={tooltipLeft}
                                cy={tooltipTop}
                                r={4}
                                fill={accentColorDark}
                                stroke="white"
                                strokeWidth={2}
                                pointerEvents="none"
                            />
                        </g>
                    )}
                </svg>
                {tooltipData && (
                    <div>
                        <TooltipWithBounds
                            key={Math.random()}
                            top={tooltipTop - 12}
                            left={tooltipLeft + 12}
                            style={tooltipStyles}
                        >
                            {`$${getStockValue(tooltipData)}`}
                        </TooltipWithBounds>
                        <Tooltip
                            top={innerHeight + margin.top - 14}
                            left={tooltipLeft}
                            style={{
                                ...defaultStyles,
                                minWidth: 72,
                                textAlign: 'center',
                                transform: 'translateX(-50%)',
                            }}
                        >
                            {formatDate(getDate(tooltipData))}
                        </Tooltip>
                    </div>
                )}
            </div>
        );
    },
);