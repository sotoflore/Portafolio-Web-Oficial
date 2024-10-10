import { RiFolder5Fill } from "react-icons/ri";

const InputFile = ({ onChange }) => {
    return (
        <div className="flex items-center justify-center w-full mt-10">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-auto border-2 border-gray-400 shadow-sm border-dashed rounded-md cursor-pointer bg-white">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <RiFolder5Fill className="w-20 h-20 mb-4 text-purple-700 bg-purple-300 p-4 rounded-full" />
                    <p className="mb-2 text-sm text-gray-700 font-semibold">Haga clic para cargar sus imágenes</p>
                    <p className="text-xs text-gray-700">PNG, JPG, JPEG (MAX. 1 IMÁGENES)</p>
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={onChange}
                />
            </label>
        </div>
    )
}
export default InputFile;