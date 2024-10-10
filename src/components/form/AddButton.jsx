import { RiSaveLine } from "react-icons/ri";

const AddButton = ({textButton}) => {
    return (
        <button
            type="submit"
            className="flex items-center gap-1 bg-gray-900 text-white p-2 rounded mt-5"
        >
            <span>{textButton}</span>
            <RiSaveLine />
        </button>
    )
}
export default AddButton;