import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button, Form, Input } from 'antd'
import Logo from '@/components/Logo';
import { LockOutlined } from '@ant-design/icons';


export default function NewAccount() {
    const onFinish = (value: object) => {
        console.log(value);
    };

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-center p-24 gap-y-4`}
        >
            <Logo className='mb-10' />
            <div className='min-w-[350px] max-w-[500px]'>
                <div className='rounded-md bg-orange-1 p-4 text-lg text-white'>
                    Backup your mnemonic seed securely.
                    <ul className='ml-8 list-disc text-base'>
                        <li>Anyone with your mnemonic seed can take your assets.</li>
                        <li>Lost mnemonic seed can't be recovered.</li>
                    </ul>
                </div>
                <div className='w-full text-3xl font-semibold text-left my-8 font-[fatasy]'>Mnemonic Seed:</div>
                <div className='w-full text-2xl text-center py-4 font-[monospace] px-8'>
                    because defense voyage brick sad village pull distance famous sad habit siege
                </div>

                <Form name="form_item_path" layout="vertical" onFinish={onFinish} size='large'>
                    <Form.Item name="account_name" label="Account name" >
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


                    <Button type="primary" className='mt-8 bg-blue-6 hover:bg-blue-5 !duration-75 w-full border-none text-base rounded-md h-[50px]' size='large'>
                        Submit
                    </Button>
                </Form>
            </div>

            {/* <div className='mt-10 flex flex-col gap-y-4 items-center min-w-[400px] m-auto'>
                <Button type='primary' size='large'>Next</Button>
            </div> */}
        </main >
    )
}
