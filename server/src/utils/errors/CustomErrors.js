//? If the value dont have the correct format
class SintaxError extends Error{
    #status;
    constructor(msg){
        super(msg)
        this.name = 'SintaxError'
        this.#status = 404;
    }
    
    get status(){
        return this.#status;
    }
}
//? If the value dont have some content
class EmptyError extends Error{
    #status;
    constructor(msg){
        super(msg);
        this.name = 'EmptyError'
        this.#status = 404;
    };
    get status(){
        return this.#status;
    }
};
//? If the user in request is not register
class ErrorAuthentication extends Error{
    #status;
    constructor(msg){
        super(msg);
        this.name = 'ErrorAuthentication'
        this.#status = 401;
    }
    get status(){
        return this.#status;
    }
};
//? If the user is not authorizate for some request
class UnAuthorization extends Error{
    #status;
    constructor(msg){
        super(msg);
        this.name = 'UnAuthorization'
        this.#status = 403;
    }
    get status(){
        return this.#status;
    }
};
//? If the server have problems and it can't solve request
class ServerError extends Error{
    #status;
    constructor(msg){
        super(msg);
        this.name = 'Server Error'
        this.#status = 500
    }

    get status(){
        return this.#status;
    }
}

class CustomError{
    ErrorAuthentication(msg){
        return new ErrorAuthentication(msg)
    }
    EmptyError(msg){
        return new EmptyError(msg);
    }
    UnAuthorization(msg){
        return new UnAuthorization(msg);
    }
    ServerError(msg){
        return new ServerError(msg);
    }
    SintaxError(msg){
        return new SintaxError(msg);
    }
}

module.exports = new CustomError();