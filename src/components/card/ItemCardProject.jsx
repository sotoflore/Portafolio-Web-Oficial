import IconGoogle from "../icons/IconGoogle";

const ItemCardProject = ({ projectLink, imageUrl, title }) => {
    return (
        <article className="h-full p-2">
            <h3 className="ps-2 text-start text-lg font-bold text-cyan-700 mb-3 transition duration-500 group-hover:text-purple-600 group-hover:font-bold">{title}</h3>
            <img className="p-2.5 lg:h-48 md:h-36 w-full object-cover object-center" src={imageUrl} alt="imagen de los proyectos" />
            <div className="p-6">
                <a href={projectLink} className="text-white md:mb-2 lg:mb-0 bg-black shadow-3xl hover:bg-gray-800 rounded-lg px-5 py-1.5 inline-flex items-center justify-center border-0 w-full" target="_blank" rel="noopener noreferrer">
                    <IconGoogle />
                    <span className='ps-1'>Ver WebSite</span>
                </a>
            </div>
        </article>
    )
}
export default ItemCardProject;