
export default function Tab({ name, href }) {
    return <a className="flex items-center px-3 hover:text-gray-900 transition-colors duration-200 mb-4 text-gray-900" href={href}>
        {name}
    </a>
}