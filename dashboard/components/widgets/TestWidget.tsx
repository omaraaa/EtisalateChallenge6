import React from "react";

import TestChart from "../TestChart";
import Widget from "../Widget";
import { GetServerSideProps } from "next";
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory'

import adjs from '../..//adjsData.json'

function generateData() {
    const ymap = {}
    adjs.forEach((e) => {
        const year = e.TRANSACTION_DATE.split(/[\s-.]+/)[2]
        if (!ymap[year]) ymap[year] = 0;
        ymap[year]++;
    });

    return Object.keys(ymap).map((k) => {
        return { year: k, count: ymap[k] }
    });
}

const data = generateData();

export default function TestWidget() {
    return <Widget>
        <Widget.Header>
            <h3 className="text-2xl font-bold whitespace-nowrap">Adjustments</h3>
        </Widget.Header>

        <Widget.Body>
            <VictoryChart domainPadding={1}>
                <VictoryAxis />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`${x}`)}
                />
                <VictoryBar data={data} x="year" y="count" barWidth={30}
                    events={[
                        {
                            target: "data",
                            eventHandlers: {
                                onMouseOver: () => {
                                    return [{
                                        target: "data",
                                        mutation: (props) => {
                                            return {
                                                style: Object.assign({}, props.style, { fill: "tomato" })
                                            };
                                        }
                                    }];
                                },
                                onMouseOut: () => {
                                    return [{
                                        target: "data",
                                        mutation: () => {
                                            return null;
                                        }
                                    }];
                                },
                                onClick: () => {
                                    return [{
                                        target: "data",
                                        mutation: (props) => {
                                            return props.text === "clicked" ?
                                                null : { text: "clicked" }
                                        }
                                    }];
                                }
                            }
                        }
                    ]}
                />
            </VictoryChart>
        </Widget.Body>
        <Widget.Footer>
            <div>
                <p className="mt-4 text-xl">
                    description
                </p>
            </div>
        </Widget.Footer>
    </Widget>
}


