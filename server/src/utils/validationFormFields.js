const valuesErrorsFormFields = {
    namecompany: 'El Nombre de empresa no es válido, Min Caractéres: 2',
    eslogan: 'El eslogan no es válido, Rango de carácteres [5, 150]',
    description: 'La descripción no puede contener más de 300 carácteres',
    phone: 'El Teléfono no es válido',
    email: 'El Correo Electrónico Ej: example@example.com',
    password: 'La Contraseña no es válida, Ej: passWW23##',
};

const validations = {
    email: email => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email),
    password: password => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?./&])[A-Za-z\d@/.$!%*#?&]{8,}$/g.test(password),
    url: url => /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(url),
};

module.exports = {
    validations,
    valuesErrorsFormFields
};