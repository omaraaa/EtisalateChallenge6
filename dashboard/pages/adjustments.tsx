import Dashboard from '../components/Dashboard'
import { useState, useEffect, useRef } from 'react'
import TestWidget from '../components/widgets/TestWidget'

import AddWidgetBtn from '../components/AddWidgetBtn'


export default function Adjustments() {
    return <Dashboard>
        <TestWidget></TestWidget>
        <TestWidget></TestWidget>
        <TestWidget></TestWidget>
        <AddWidgetBtn />
    </Dashboard>
}