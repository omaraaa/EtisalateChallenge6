import Tab from "./sidebar/Tab";

export default function Sidebar() {
    return <div className="fixed z-40 inset-0 flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block hidden">
        <div className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent overflow-auto lg:top-18 bg-white mr-24 lg:mr-0">
            <div className="hidden lg:block h-12 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white"></div>
            <nav className="fixed overflow-y-auto  px-1 pt-6 font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-14 sticky?lg:h-(screen-18) h-screen">
                <Tab name="Payments" href="/payments"></Tab>
                <Tab name="Adjustments" href="/adjustments"></Tab>
            </nav>
        </div>
    </div>
}