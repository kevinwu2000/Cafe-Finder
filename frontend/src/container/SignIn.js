import React, { useState } from 'react';
import AuthForm from '../component/AuthForm';
import CoffeeBackground from '../component/CoffeeBackground';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import * as CryptoJS from 'crypto-js';
import { useLazyQuery } from '@apollo/client';
import { LOG_IN_QUERY } from '../graphql/index';
import { useHooks } from './hooks/Hooks';

const secretKey = "IHVYRTyknIBUYTNTCYVUBJnnJhgfjnBHRYTusc";

export default function SignIn() {
    const { setUser } = useHooks();
    const [formData, setFormData] = useState({ account: '', password: '' });
    const navigate = useNavigate();
    const [checkLogin] = useLazyQuery(LOG_IN_QUERY, {
        onCompleted: (data) => {
            if (data.LogInQuery.id === "not found") {
                message.error('Account not found');
            } else if (data.LogInQuery.id === "wrong password") {
                message.error('Wrong password');
            } else {
                message.success('Signed in successfully');
                setUser(data.LogInQuery);
                navigate(`/search/${data.LogInQuery.name}/${data.LogInQuery.id}`);
            }
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        const { account, password } = formData;

        if (!account) {
            message.error('Please enter an account');
        } else if (!password) {
            message.error('Please enter a password');
        } else {
            checkLogin({
                variables: {
                    account: CryptoJS.AES.encrypt(account, secretKey).toString(),
                    password: CryptoJS.AES.encrypt(password, secretKey).toString(),
                },
            });
        }
    };

    return (
        <CoffeeBackground>
            <AuthForm
                title="Log In"
                onSubmit={handleSubmit}
                linkText="Don't have an account? Sign Up"
                linkHref="/register"
                onInputChange={handleInputChange}
                fields={[
                    { label: 'Account', name: 'account', type: 'text', value: formData.account },
                    { label: 'Password', name: 'password', type: 'password', value: formData.password },
                ]}
            />
        </CoffeeBackground>
    );
}