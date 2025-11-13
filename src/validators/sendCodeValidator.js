const isEmail = (email) => 
    String (email).toLowerCase().match(/\S+@\S+\.\S+/);

const sendCodeValidator = ({  email, password }) => {
    const errors = {
        email: '',
    }

    if (!email) {
        errors.email = 'Email is required';
    } else if (!isEmail(email)) {
        errors.email = 'invalid Email';
    }

    return errors;
}
export default sendCodeValidator;