import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { register, login } from 'redux/auth/authOperations';
import style from './RegisterForm.module.css';

const validateName = value => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (/^[A-Za-z]+$/.test(value)) {
    error = 'Invalid name';
  }
  return error;
};

const validateEmail = value => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const validatePassword = value => {
  let error;
  if (!value) {
    error = 'Required';
  }
  if (value.length < 7) {
    error = 'Password to short';
  }
  return error;
};

export const AuthForm = ({ title }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValue({
      ...value,
      showPassword: !value.showPassword,
    });
  };

  const handleSubmit = (name, email, password) => {
    title === 'Register'
      ? dispatch(register({ name, email, password }))
      : dispatch(login({ email, password }));
  };

  return (
    <div className={style.img}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          style={{
            fontSize: '35px',
            fontWeight: 'bold',
            lineHeight: '2.8',
            marginBottom: '40px',
          }}
          variant="h2"
        >
          {title}
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
            name: '',
            showPassword: false,
          }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values.name, values.email, values.password);
            resetForm();
          }}
        >
          {({ errors, touched, values }) => {
            const password = values.password.length >= 7;

            return (
              <Form>
                {title === 'Register' ? (
                  <Box className={style.inputThumb}>
                    <Typography variant="caption" className={style.inputText}>
                      Name
                    </Typography>
                    <Field
                      className={style.input}
                      name="name"
                      type="text"
                      validate={validateName}
                    />
                    {errors.name && touched.name && (
                      <Typography
                        variant="subtitle1"
                        className={style.helpfulText}
                      >
                        {errors.name}
                      </Typography>
                    )}
                  </Box>
                ) : null}
                <Box className={style.inputThumb}>
                  <Typography variant="caption" className={style.inputText}>
                    Email
                  </Typography>
                  <Field
                    className={style.input}
                    name="email"
                    type="email"
                    validate={validateEmail}
                  />
                  {errors.email && touched.email && (
                    <Typography
                      variant="subtitle1"
                      className={style.helpfulText}
                    >
                      {errors.email}
                    </Typography>
                  )}
                </Box>
                <Box className={style.inputThumb}>
                  <Typography variant="caption" className={style.inputText}>
                    Password
                  </Typography>
                  <Field
                    className={style.input}
                    type={value.showPassword ? 'text' : 'password'}
                    name="password"
                    validate={validatePassword}
                  />
                  <IconButton
                    style={{
                      width: '24px',
                      height: '24px',
                      position: 'absolute',
                      top: '17px',
                      right: '7px',
                    }}
                    size="small"
                    type="button"
                    onClick={handleClickShowPassword}
                  >
                    {value.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  {errors.password && touched.password && (
                    <Typography
                      variant="subtitle1"
                      className={style.helpfulText}
                    >
                      {errors.password}
                    </Typography>
                  )}
                </Box>

                <Button
                  fullWidth={true}
                  color="primary"
                  type="submit"
                  disabled={!!errors.email || !password}
                >
                  {title === 'Register' ? 'Register' : 'Login'}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </div>
  );
};

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
};
