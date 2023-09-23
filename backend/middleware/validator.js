/* 
This function receive an schema and parses the data from req.body with the validations in that schema.
If the parse is correct, continues with the next operation, otherwise it returns an error.
*/
export const validator = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        console.log('Error in validator middleware: ', error);
        if (Array.isArray(error.errors)) {
            return res.status(400)
                .json({ message: error.errors.map((error) => error.message) });
        } else {
            // Handle other types of errors
            return res.status(500).json({ message: ['An unexpected error occurred'] });
        }
    }
}