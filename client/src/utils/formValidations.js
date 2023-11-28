const nameFields = {
    email: 'El Correo electrónico',
    password: 'La Contraseña',
    namecompany: 'El nombre de la compañía',
    eslogan: 'El eslogan',
    description: 'La descripción',
    phone: 'El teléfono',
}

const fieldValidations = {
    // eslint-disable-next-line no-useless-escape
    email:(val) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(val),
    password:(val) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?./&])[A-Za-z\d@/.$!%*#?&]{8,}$/g.test(val),
    password2: (pass, {comparepass}) => pass === comparepass,
    phone: (val) => !isNaN(val) && (val + '').length >= 10 && (val + '').length <= 14,
    categoryname: (val) => (!val || val.length < 4 || val.length > 20),
};

const errorsFieldValidations = {
    email: `${nameFields.email} no es válido, Ej: window@seller.co`,
    password: `${nameFields.password} no tiene un formato válido {*,0-9,A-z}`,
    password2: 'Las contraseñas no coinciden',
    phone: `${nameFields.phone} debe contener de 10 - 14 carácteres`
};

export {
    nameFields,
    fieldValidations,
    errorsFieldValidations
}