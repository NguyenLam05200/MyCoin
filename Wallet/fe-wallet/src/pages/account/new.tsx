import { API } from '@/apis';
import Logo from '@/components/common/Logo';
import ConfirmMnemonic from '@/components/screens/account/ConfirmMnemonic';
import NewAccountInfo from '@/components/screens/account/NewAccount';
import { STEP } from '@/constant';
import FetchApi from '@/fetchApi';
import { fetchApi, useFetchApi } from '@/utils';
import { Button, notification } from 'antd';
import { useState } from 'react';

export default function NewAccount() {

    const [step, setStep] = useState(STEP.infor)
    const { data: mnemonic, loading: loadingGenerateMnemonic } = useFetchApi(
        { api: API.GENERATE_MNEMONIC }
    );

    const [dataInfo, setDataInfo] = useState({})

    const [canSubmit, setCanSubmit] = useState(false)

    const handleConfirm = async () => {
        if (canSubmit) {

            const res = await FetchApi({
                url: API.CREATE_ACCOUNT,
                options: {
                    method: 'POST',
                },
                params: {
                    ...dataInfo,
                    mnemonic
                },
            })

            console.log("response: ", res);

            if (res?.data) {
                console.log("ok");
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
            {step === STEP.infor && <NewAccountInfo data={mnemonic} loading={loadingGenerateMnemonic} setStep={setStep} setDataInfo={setDataInfo} />}
            {step === STEP.confirm && <div>
                <ConfirmMnemonic mnemonic={mnemonic ?? ''} setCanSubmit={setCanSubmit} />
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
                    onClick={handleConfirm}
                >
                    Register
                </Button>
            </div>}
        </main >
    )
}
