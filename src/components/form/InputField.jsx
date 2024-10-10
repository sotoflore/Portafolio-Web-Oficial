import { HiOutlineDocumentText } from "react-icons/hi2";

const InputField = ({textLabel, type, placeholder, value, onChange}) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">{textLabel}</label>
            <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5">
                    <HiOutlineDocumentText className="w-4 h-4 text-gray-600" />
                </div>
                <input
                    type={type}
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded block w-full ps-10 p-2.5"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}
export default InputField;