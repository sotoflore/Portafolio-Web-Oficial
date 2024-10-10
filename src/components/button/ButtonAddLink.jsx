import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const ButtonAddLink = ({to, buttonText}) => {
    return (
        <div className="flex space-x-2">
            <Link to={to} className="flex items-center bg-purple-700 py-1 px-3 rounded text-slate-200 font-bold">
                <IoMdAdd className="w-6 h-6" />
                <span>{buttonText}</span>
            </Link>
        </div>
    )
}
export default ButtonAddLink;