import { Formik } from "formik"

const ProfileForm = ({namecompany,eslogan,description,email,phone}) => {
    return (
        <Formik
            initialValues={{
                namecompany,
                eslogan,
                description,
                email,
                phone,
            }}
        >
            {({handleSubmit, handleChange, isSubmitting, values}) => (
                <form className="space-y-2 [&>label>input]:bg-stone-200">
                    <label className="block w-full">
                        <p className="pb-2 pl-1 font-bold">Compañía</p>
                        <input
                            type="text"
                            name="namecompany"
                            onChange={handleChange}
                            value={values.namecompany}
                            placeholder="Nombre de compañía"
                        />
                    </label>
                    <label className="block w-full">
                        <p className="pb-2 pl-1 font-bold">Lema empresarial</p>
                        <input
                            type="text"
                            name="eslogan"
                            onChange={handleChange}
                            value={values.eslogan}
                            placeholder="Impacta con tu eslogan!"
                        />
                    </label>
                    <label className="block w-full">
                        <p className="pb-2 pl-1 font-bold">Descripción</p>
                        <textarea
                            name="description"
                            onChange={handleChange}
                            value={values.description}
                            placeholder="Describe la Esencia de tu compañía..."
                        ></textarea>
                    </label>
                    <label className="block w-full">
                        <p className="pb-2 pl-1 font-bold">Correo Electrónico</p>
                        <input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            placeholder="Correo Electrónico"
                        />
                    </label>
                    <label className="block w-full">
                        <p className="pb-2 pl-1 font-bold">Contacto</p>
                        <input
                            type="text"
                            name="phone"
                            onChange={handleChange}
                            value={values.phone}
                            placeholder="Número telefónico"
                        />
                    </label>
                    <label className="block w-full text-right [&>button]:bg-blue-500 [&>button]:text-white [&>button]:font-bold">
                        <button
                            type="submit"
                            className="btn_base btn_base_hover before:bg-transparent "
                        >Guardar Cambios</button>
                    </label>
                </form>
            )}
        </Formik>
    )
}

export default ProfileForm