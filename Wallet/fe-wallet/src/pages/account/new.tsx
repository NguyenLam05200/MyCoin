import { API } from '@/apis';
import Logo from '@/components/common/Logo';
import ConfirmMnemonic from '@/components/screens/account/ConfirmMnemonic';
import NewAccountInfo from '@/components/screens/account/NewAccount';
import { STEP } from '@/constant';
import { useFetchApi } from '@/utils';
import { Button } from 'antd';
import { useState } from 'react';



export default function NewAccount() {
    const [step, setStep] = useState(STEP.infor)
    const { data, loading, error } = useFetchApi(
        { api: API.GENERATE_MNEMONIC }
    );

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-start p-10 gap-y-4`}
        >
            <Logo className='mb-10' />
            {step === STEP.infor && <NewAccountInfo data={data} loading={loading} setStep={setStep} />}
            {step === STEP.confirm && <div>
                <ConfirmMnemonic mnemonic={data} />
                <Button
                    type="primary"
                    className='mt-8 w-full text-base rounded-md h-[50px] text-txtPrimary'
                    size='large'
                    onClick={() => setStep(STEP.infor)}
                >
                    Back
                </Button>
                <Button
                    type="primary"
                    className='mt-8 bg-blue-6 hover:bg-blue-5 !duration-75 w-full border-none text-base rounded-md h-[50px]'
                    size='large'
                    onClick={() => setStep(STEP.infor)}
                >
                    Register
                </Button>
            </div>}
        </main >
    )
}
