
const TextArea = ({textLabel, placeholder, value, onChange}) => {
    return (
        <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">{textLabel}</label>
            <textarea
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
export default TextArea;