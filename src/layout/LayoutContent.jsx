import CardPerfil from "../components/card/CardPerfil"
import CardProject from "../components/card/CardProject"

import { IoIosCheckbox } from "react-icons/io";
import CallToAction from "../components/home/CallToAction"

const LayoutContent = () => {
    return (
        <section className="flex flex-col flex-wrap lg:flex-nowrap md:flex-row gap-8 px-3 md:px-5 xl:px-0 pb-28 relative w-full">
            <div className="hidden xl:block basis-full md:basis-1/2  lg:basis-1/4 lg:sticky xl:order-1 mt-3 md:mt-28 md:top-28 h-[24rem] border bg-slate-900 border-slate-700 rounded-md">
                <CardPerfil />
            </div>
            <div className="w-full lg:basis-9/12 xl:basis-1/2 md:mt-28 order-3 xl:order-2">
                <div className="w-full rounded-md border relative bg-slate-900 border-slate-700">
                    <h2 className="text-xl text-center uppercase text-purple-600 py-2 font-black">
                        Proyectos Realizados
                    </h2>
                </div>

                <div className="w-full mt-5">
                    <CardProject/>
                </div>
            </div>
            <div className="w-full lg:basis-1/4 lg:sticky mt-5 md:top-28 order-2 xl:order-3 lg:h-[24rem] relative border border-slate-700 bg-slate-900 rounded-md">
                <h2 className="text-center text-slate-300 font-bold my-3 md:my-5 text-xl">Contáctame</h2>
                <div className="w-full lg:px-4">
                    <p className="hidden lg:flex my-5 w-full items-center  gap-1 flex-1 text-gray-400 rounded">
                        <IoIosCheckbox className="text-green-500" />
                        <span>Paginas web</span>
                    </p>
                    <p className="hidden lg:flex my-5 w-full items-center  gap-1 flex-1 text-gray-400 rounded">
                        <IoIosCheckbox className="text-green-500" />
                        <span>Aplicaciones web</span>
                    </p>
                    <p className="hidden lg:flex my-5 w-full items-center  gap-1 flex-1 text-gray-400 rounded">
                        <IoIosCheckbox className="text-green-500" />
                        <span>Aplicaciones web</span>
                    </p>
                    <CallToAction />
                </div>
            </div> 
        </section>
    )
}
export default LayoutContent
