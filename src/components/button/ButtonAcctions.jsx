import { LuFileEdit } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';


const ButtonActions = ({ onEdit, onDelete }) => {
    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={onEdit}
                className="text-blue-500 text-2xl hover:text-blue-700"
            >
                <LuFileEdit />
            </button>
            <button
                onClick={onDelete}
                className="text-red-500 text-2xl hover:text-red-700"
            >
                <RiDeleteBin5Line />
            </button>
        </div>
    );
};

export default ButtonActions;
