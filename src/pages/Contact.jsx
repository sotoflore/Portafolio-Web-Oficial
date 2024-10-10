import { BsEnvelope, BsTelephonePlus, BsGeoAlt } from "react-icons/bs";
import SendEmails from './admin/emails/SendEmails';

const Contact = () => {

    const contacts = [
        {
            icon:  <BsEnvelope />,
            contact: "sotofloresfrancisco@gmail.com"
        },
        {
            icon: <BsTelephonePlus />,
            contact: "+57 3127393740"
        },
        {
            icon: <BsGeoAlt />,
            contact: "Medellín,Colombia"
        },
    ]

    return (
        <section className="py-5 pb-32 md:pb-20 md:py-32">
            <div className="gap-12 justify-between lg:flex items-center flex-grow px-3 md:px-5 xl:px-0">
                <div className="space-y-3 basis-1/2">
                    <h3 className="text-2xl text-green-500 font-bold">
                        Hablemos
                    </h3>
                    <p className="text-slate-300 text-3xl font-semibold sm:text-4xl">
                        ¿En qué puedo ayudarte?
                    </p>
                    <p className='text-slate-400'>
                        Estoy aquí para resolver cualquier duda que puedas tener o para hablar sobre posibles colaboraciones.
                        Si tienes alguna pregunta, proyecto en mente, o simplemente quieres ponerte en contacto,
                        no dudes en hacerlo. Puedes llenar el formulario o utilizar la información
                        de contacto que te dejo aquí:
                    </p>
                    <div>
                        <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                            {
                                contacts.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-x-3">
                                        <div className="flex-none text-slate-300 bg-purple-600 p-2 rounded-md">
                                            {item.icon}
                                        </div>
                                        <p className="text-slate-300">
                                            {item.contact}
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="flex-1 mt-12 basis-1/2">
                    <SendEmails />
                </div>
            </div>
        </section>
    )
}
export default Contact;
