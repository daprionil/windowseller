const nameFields = {
    email: 'El Correo electrónico',
    password: 'La Contraseña'
}

const fieldValidations = {
    // eslint-disable-next-line no-useless-escape
    email:(val) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(val),
    password:(val) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?./&])[A-Za-z\d@/.$!%*#?&]{8,}$/g.test(val),
    password2: (pass, {comparepass}) => pass === comparepass,
};

const errorsFieldValidations = {
    email: `${nameFields.email} no es válido, Ej: window@seller.co`,
    password: `${nameFields.password} no tiene un formato válido {*,0-9,A-z}`,
    password2: 'Las contraseñas no coinciden'
};

export {
    nameFields,
    fieldValidations,
    errorsFieldValidations
}