/* 
This function receive an schema and parses the data from req.body with the validations in that schema.
If the parse is correct, continues with the next operation, otherwise it returns an error.
*/
export const validator = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400)
        // ".errors" is an array inside zod that is not transformed to json, 
        // so we go through the array to extract the message of each error &
        // we send the errors as response.
        .json(error.errors.map((error) => error.message));
    }
}