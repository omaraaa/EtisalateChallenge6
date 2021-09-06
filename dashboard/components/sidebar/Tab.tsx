
export default function Tab({ name, href }) {
    return <a className="flex items-center px-3 hover:text-gray-900 transition-colors duration-200 mb-4 text-gray-900 lg:w-48 hover:bg-gray-200 rounded-sm p-2" href={href}>
        {name}
    </a>
}