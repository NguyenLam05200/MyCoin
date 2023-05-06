import React from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button, Form, Input } from 'antd'
import Logo from '@/components/common/Logo';
import { LockOutlined } from '@ant-design/icons';
import { useFetchApi } from '@/utils';
import { API } from '@/apis';
import { log } from 'console';
import Skeleton from '@/components/common/Skeletor';
import { STEP } from '@/constant';

interface Props {
    data: string | null;
    loading: boolean;
    setStep: Function;
}

const NewAccountInfo = ({ data, loading, setStep }: Props) => {
    const onFinish = (value: object) => {
        console.log(value);
        setStep(STEP.confirm)
    };

    return (
        <div className='min-w-[350px] max-w-[500px]'>
            <div className='rounded-md bg-orange-1 p-4 text-lg text-white'>
                Backup your mnemonic seed securely.
                <ul className='ml-8 list-disc text-base'>
                    <li>Anyone with your mnemonic seed can take your assets.</li>
                    <li>Lost mnemonic seed can&apos;t be recovered.</li>
                </ul>
            </div>
            <div className='w-full text-3xl font-semibold text-left my-8 font-[fatasy]'>Mnemonic Seed:</div>
            <div className='w-full text-2xl text-center py-4 font-[monospace] px-8'>
                {loading ? <Skeleton width={100} /> : data}
            </div>

            <Form
                initialValues={{ remember: false }}
                autoComplete="off"
                name="form_item_path"
                layout="vertical"
                onFinish={onFinish} size='large'
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
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Button
                    htmlType="submit" type="primary"
                    className='mt-8 bg-blue-6 hover:bg-blue-5 !duration-75 w-full border-none text-base rounded-md h-[50px]' size='large'>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default NewAccountInfo