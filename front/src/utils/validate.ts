type UserInfomation = {
    email: string;
    password: string;
  };

  function validateUser(values: UserInfomation) {
    const errors = {
      email: '',
      password: '',
    };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'This email address is invalid';
    }
    if (!(values.password.length >= 8 && values.password.length <= 20)) {
      errors.password = 'Password must be between 8 and 20 characters';
    }

    return errors;
  }

  function validateLogin(values: UserInfomation) {
    return validateUser(values);
  }

  function validateSignup(values: UserInfomation & {passwordConfirm: string}) {
    const errors = validateUser(values);
    const signupErrors = {...errors, passwordConfirm: ''};

    if (values.password !== values.passwordConfirm) {
      signupErrors.passwordConfirm = 'Passwords do not match';
    }

    return signupErrors;
  }

  export {validateLogin, validateSignup};
