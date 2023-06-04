import { API } from '@/apis';
import Logo from '@/components/common/Logo';
import Skeleton from '@/components/common/Skeletor';
import ConfirmMnemonic from '@/components/screens/account/ConfirmMnemonic';
import NewAccountInfo from '@/components/screens/account/NewAccount';
import { STEP } from '@/constant';
import FetchApi from '@/fetchApi';
import { selectAuthState, setAuthState } from '@/redux/authSlice';
import { fetchApi, useFetchApi } from '@/utils';
import { Button, Form, Input, notification } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function NewAccount() {
    const router = useRouter()
    const dispatch = useDispatch();

    const handleConfirm = async (value) => {
        if (value) {

            const res = await FetchApi({
                url: API.LOGIN,
                options: {
                    method: 'POST',
                },
                params: value,
            })

            console.log("response: ", res);

            if (res?.data) {
                console.log("ok");
                dispatch(setAuthState(res.data))
                router.push('/home')
            } else {
                notification.error({
                    message: 'Error',
                    description: res.message
                });
            }
        } else {
            notification.error({
                message: 'Error',
                description: "Mnemonic seed does not match!"
            });
        }
    }

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-start p-10 gap-y-4`}
        >
            <Logo className='mb-10' />
            <div className='min-w-[350px] max-w-[500px]'>
                <div className='w-full text-3xl font-semibold text-left my-8 font-[fatasy]'>Login:</div>

                <Form
                    initialValues={{ remember: false }}
                    autoComplete="on"
                    name="form_item_path"
                    layout="vertical"
                    onFinish={handleConfirm} size='large'
                >
                    <Form.Item name="account_name" label="Account name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your account name!',
                            },
                        ]}
                    >
                        <Input className='py-2' />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password autoComplete="on" />
                    </Form.Item>

                    <Button
                        htmlType="submit" type="primary"
                        className='mt-8 bg-blue-6 hover:bg-blue-5 !duration-75 w-full border-none text-base rounded-md h-[50px]' size='large'>
                        Submit
                    </Button>
                </Form>
            </div>
        </main >
    )
}
