import { AiOutlineCloudDownload } from "react-icons/ai";

const DownloadCV = () => {

    const downloadCv = window.location.origin + '/CV_Francisco-Soto-Flores.pdf';

    return (
        <a href={downloadCv} download="/CV_Francisco-Soto-Flores.pdf" className="flex items-center justify-center gap-1 mt-2 w-full bg-purple-800 text-gray-100 py-2 px-4 rounded font-medium">
            <span>Descargar CV</span>
            <AiOutlineCloudDownload className='text-xl' />
        </a>
    )
}
export default DownloadCV;