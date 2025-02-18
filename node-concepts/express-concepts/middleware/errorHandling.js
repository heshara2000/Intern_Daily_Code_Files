class APIError extends error {
    constructor(message, statusCode) {

    }
}

const asyncHandler = (fn) => (req,res,next)=> {
    Promise.resolve(fn(req,res,next)).catch(next)

}

