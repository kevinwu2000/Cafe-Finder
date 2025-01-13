import React, { useState } from 'react';
import AuthForm from '../component/AuthForm';
import CoffeeBackground from '../component/CoffeeBackground';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import * as CryptoJS from 'crypto-js';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../graphql/index';

const secretKey = "IHVYRTyknIBUYTNTCYVUBJnnJhgfjnBHRYTusc";

export default function Register() {
    const [formData, setFormData] = useState({ account: '', password: '', passwordConfirm: '' });
    const navigate = useNavigate();
    const [createUser] = useMutation(CREATE_USER_MUTATION);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        const { account, password, passwordConfirm } = formData;

        if (!account || account.length < 8) {
            message.error("Account's length should be at least 8 characters");
        } else if (!password || password.length < 8) {
            message.error("Password's length should be at least 8 characters");
        } else if (password !== passwordConfirm) {
            message.error('Passwords do not match');
        } else {
            createUser({
                variables: {
                    name: account,
                    account: account,
                    password: CryptoJS.AES.encrypt(password, secretKey).toString(),
                },
            });
            message.success('Signed up successfully');
            navigate('/login');
        }
    };

    return (
        <CoffeeBackground>
            <AuthForm
                title="Register"
                onSubmit={handleSubmit}
                linkText="Already have an account? Log In"
                linkHref="/login"
                onInputChange={handleInputChange}
                fields={[
                    { label: 'Account', name: 'account', type: 'text', value: formData.account },
                    { label: 'Password', name: 'password', type: 'password', value: formData.password },
                    { label: 'Confirm Password', name: 'passwordConfirm', type: 'password', value: formData.passwordConfirm },
                ]}
            />
        </CoffeeBackground>
    );
}