import { Formik } from "formik";
import Swal from 'sweetalert2';

import Message, { typeMessages } from "../Message";
import { errorsFieldValidations, fieldValidations, nameFields } from "../../utils/formValidations";
import useProductUserStore from "../../stores/useProductUserStore";
import { toast } from "../../config/showAlert";
import Loader from "../Loader";

const FormCreateProduct = () => {
    const createNewProduct = useProductUserStore(({createNewProduct}) => createNewProduct);

    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                price: '',
                image: ''
            }}
            validate={(values) => {
                let errors = [];
                const objValues = Object.entries(values);
                
                //* Validate if exist empty values
                for(let [k,v] of objValues){
                    const currentValue = (v + "").trim();
                    //* is Empty
                    if(!currentValue){
                        errors.push([k,`${nameFields[k] ?? 'El campo'} no puede estar vacío`]);
                        continue;
                    }
                    //* if exist validation
                    const validation = fieldValidations[k];
                    if(validation){
                        const resultValidation = validation(v, k.toString() === 'image' ? '.png,.jpg,.jpeg' : null);
                        if(!resultValidation){
                            errors.push([k, `${errorsFieldValidations[k]}`]);
                            continue;
                        }
                    }
                }

                return Object.fromEntries(errors);
            }}
            onSubmit={({name, description, price, image}, {resetForm, setSubmitting}) => {
                setSubmitting(true);
                const dataForm = new FormData();
                //? Set values into form object
                for(let [k,v] of Object.entries({name, description, price, image})){
                    dataForm.append(k,v);
                }

                //? Generate the request to create a new Product by User
                createNewProduct(dataForm)
                    .then(() => {
                        //* Reset Form
                        resetForm();
                        
                        //* Close Modal
                        Swal.close();

                        //* Display toast
                        toast.fire({
                            title: 'Producto creado correctamente',
                            icon: 'success'
                        })
                    })
                    .catch(() => {
                        toast.fire({
                            title: 'El producto no ha sido creado',
                            text:'Intentalo más tarde',
                            icon: 'error'
                        })
                    })
                    .finally(() => {
                        setSubmitting(false);    
                    });
            }}
        >
            {({ values, errors, handleChange, isSubmitting, handleSubmit, setFieldValue}) => {
                return (
                    <form className='space-y-2' onSubmit={handleSubmit}>
                        <p className='font-black text-xl'>Crea un Producto</p>
                        <label className='block'>
                            <input
                                type="text"
                                name="name"
                                placeholder='Nombre producto'
                                onChange={handleChange}
                                value={values.name}
                            />
                            <div className="text-sm">
                            {
                                errors.name && <Message msg={errors.name} type={typeMessages.ERROR}/>
                            }
                            </div>
                        </label>
                        <label className='block'>
                            <textarea
                                name="description"
                                placeholder='Descripción'
                                onChange={handleChange}
                                value={values.description}
                                className='w-full focus:outline-none border-none'
                            ></textarea>
                            <div className="text-sm">
                            {
                                errors.description && <Message msg={errors.description} type={typeMessages.ERROR}/>
                            }
                            </div>
                        </label>
                        <label className='flex p-2 items-center justify-center flex-nowrap bg-stone-200 rounded-sm'>
                            <span className='font-black bg-none'>$</span>
                            <input
                                type="number"
                                name="price"
                                onChange={handleChange}
                                value={values.price}
                                style={{ background: 'none' }}
                                className='bg-none'
                                placeholder='Precio'
                            />
                        </label>
                        <div className="text-sm">
                            {
                                errors.price && <Message msg={errors.price} type={typeMessages.ERROR}/>
                            }
                        </div>
                        <label className='block'>
                            <input
                                type="file"
                                name="image"
                                accept=".png,.jpg,.jpeg"
                                onChange={(evt) => {
                                    const file = evt.target.files[0];
                                    if(file){
                                        setFieldValue('image', file);
                                    }
                                }}
                                className='border-2 border-black border-dotted [&::file-selector-button]:border-none [&:hover::file-selector-button]:bg-blue-500 [&::file-selector-button]:transition [&::file-selector-button]:duration-200 [&::file-selector-button]:ease-out cursor-pointer [&::file-selector-button]:bg-blue-600 [&::file-selector-button]:px-4 [&::file-selector-button]:py-2 [&::file-selector-button]:rounded-md [&::file-selector-button]:text-white [&::file-selector-button]:font-black w-full block p-4 bg-blue-100 rounded-md'
                            />
                            <div className="text-sm">
                                {
                                    errors.image && <Message msg={errors.image} type={typeMessages.ERROR}/>
                            }
                            </div>
                        </label>
                        <label className='block [&>button]:bg-blue-500'>
                            {
                                !isSubmitting ?
                                    <button
                                        type='submit'
                                        className="btn_base btn_base_hover text-white font-black text-xl"
                                    >
                                        Crear
                                    </button>
                                :
                                    <div className="pt-2">
                                        <Loader />
                                    </div>
                            }
                        </label>
                    </form>
                )
            }}
        </Formik>
    )
}

export default FormCreateProduct