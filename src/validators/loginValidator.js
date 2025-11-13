const isEmail = (email) => 
    String (email).toLowerCase().match(/\S+@\S+\.\S+/);

const loginValidator = ({  email, password }) => {
    const errors = {
        email: '',
        password: '',
    }

    if (!email) {
        errors.email = 'Email is required';
    } else if (!isEmail(email)) {
        errors.email = 'invalid Email';
    }

    if (!password) {
        errors.password = 'Password is required';
    }

    return errors;
}
export default loginValidator;