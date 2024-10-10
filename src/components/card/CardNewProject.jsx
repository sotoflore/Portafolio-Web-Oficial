import { FaCheckCircle } from "react-icons/fa";

const CardNewProject = ({href, text}) => {
    return (
        <>
            <a href={href} className="flex items-center gap-2 border border-gray-500 w-full py-2 px-4 rounded mb-3">
                <FaCheckCircle className="text-green-500" />
                <span>{text}</span>
            </a>
        </>
    )
}
export default CardNewProject;