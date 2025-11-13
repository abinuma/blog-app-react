const isEmail = (email) => 
    String (email).toLowerCase().match(/\S+@\S+\.\S+/);

const profileValidator = ({ name, email,  }) => {
    const errors = {
        name: '',
        email: '',
    }

    if (!name) {
        errors.name = 'Name is required';
    }

    if (!email) {
        errors.email = 'Email is required';
    } else if (!isEmail(email)) {
        errors.email = 'invalid Email';
    }

  

    return errors;
}
export default profileValidator;