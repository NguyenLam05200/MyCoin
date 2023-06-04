import ButtonV2 from '@/components/common/ButtonV2';
import Logo from '@/components/common/Logo';
import { selectAuthState, setAuthState } from '@/redux/authSlice';
import { LogoutOutlined } from '@ant-design/icons';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';
import fetchApi from '@/fetchApi';
import { API } from '@/apis';
import { notification } from 'antd';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box className="flex flex-col gap-y-8" sx={{ py: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const Home = () => {
    const authState = useSelector(selectAuthState);
    const router = useRouter()

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const dispatch = useDispatch();
    const [token, setToken] = React.useState('');
    const [network, setNetwork] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [loadingTransfer, setLoadingTransfer] = React.useState(false);

    const refetchAccount = async () => {
        const res = await fetchApi({
            url: API.REFETCH_USER,
            options: {
                method: 'GET',
            },
            params: {
                mnemonic: authState?.mnemonic
            },
        })

        console.log("response: ", res);

        if (res?.data) {
            console.log("ok");
            dispatch(setAuthState(res.data))
        } else {
            notification.error({
                message: 'Error',
                description: res.message
            });
        }
    }

    const handleTransfer = async () => {

        setLoadingTransfer(true)
        try {
            const res = await fetchApi({
                url: API.TRANSFER,
                options: {
                    method: 'POST',
                },
                params: {
                    token,
                    network,
                    amount,
                    address,
                    mnemonic: authState?.mnemonic
                },
            })

            console.log("response: ", res);

            if (res?.data) {
                console.log("ok");

                await refetchAccount();
            } else {
                notification.error({
                    message: 'Error',
                    description: res.message
                });
            }

        } catch (error) {

        } finally {
            setLoadingTransfer(false)
        }
    }

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-start p-10 gap-y-4`}
        >
            <div className='w-full flex justify-between items-start border-b border-divider pb-6 mb-6'>
                <h1 className=' font-semibold text-sm md:text-lg text-gray-15 tracking-normal'>
                    Welcome {authState?.name || "unknown"}
                </h1>
                <ButtonV2
                    onClick={() => router.push('/account/login')}
                    className='!w-auto px-6 gap-x-3 !py-3 !text-sm !h-auto'>
                    Logout
                    <LogoutOutlined />
                </ButtonV2>
            </div>

            <div className='w-full grid grid-cols-2 gap-4 divide-x-2'>
                <div className='pr-8'>
                    <div className='my-6 flex items-center justify-between mb-8 gap-x-2'>
                        <h1 className='text-base font-semibold whitespace-nowrap'>MyCoin address:</h1>
                        <span className='truncate'>{authState?.accounts?.[0]?.address}</span>
                    </div>
                    <div className='my-6 flex items-center justify-between'>
                        <h1 className='text-base font-semibold'>Assets:</h1>
                    </div>
                    <div className='my-6 flex flex-col items-center justify-between'>
                        <div className='w-full flex items-center pt-4 pb-2  justify-between gap-x-4 border-b border-divider '>
                            <div className='font-semibold'>Denom</div>
                            <div className='font-semibold'>Amount</div>
                        </div>
                        {authState?.balances && authState.balances.map(balance => (
                            <div className='w-full pt-4 pb-2 flex items-center justify-between gap-x-4 border-b border-divider '>
                                <div className='font-semibold'>{balance.denom}</div>
                                {balance.amount}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='pl-8'>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab className='!capitalize text-base font-semibold' label="Transfer" {...a11yProps(0)} />
                            <Tab className='!capitalize text-base font-semibold' label="Deposit" {...a11yProps(1)} />
                            <Tab className='!capitalize text-base font-semibold' label="Faucet" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        {/* Transfer */}
                        {/* Select token */}
                        <FormControl fullWidth>
                            <InputLabel id="Token-select-label">Token</InputLabel>
                            <Select
                                labelId="Token-select-label"
                                id="Token-select"
                                value={token}
                                label="Token"
                                onChange={(event: SelectChangeEvent) => {
                                    setToken(event.target.value as string);
                                }}
                            >
                                <MenuItem value={"Token"}>Token</MenuItem>
                                {/* <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="Network">Network</InputLabel>
                            <Select
                                labelId="Network"
                                id="Network-select"
                                value={network}
                                label="Network"
                                onChange={(event: SelectChangeEvent) => {
                                    setNetwork(event.target.value as string);
                                }}
                            >
                                <MenuItem value={"MyCoin"}>MyCoin testnet (internal chain)</MenuItem>
                                {/* <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                        </FormControl>
                        <TextField type='number' value={amount} onChange={(e) => setAmount(e.target.value)} id="outlined-amount" label="Amount" variant="outlined" />
                        <TextField value={address} onChange={(e) => setAddress(e.target.value)} id="outlined-address" label="Address" variant="outlined" />
                        <div className='w-full flex items-center font-semibold justify-between'>
                            <div>Fee:</div>
                            {(token && network) ? <div>{1} stake</div> : <div>__</div>}
                        </div>
                        <ButtonV2
                            onClick={handleTransfer}
                            disabled={!token || !network || !amount || !address} >
                            Transfer
                        </ButtonV2>
                        {/* Amount */}
                        {/* Recipient's address */}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <FormControl fullWidth>
                            <InputLabel id="Token-select-label">Token</InputLabel>
                            <Select
                                labelId="Token-select-label"
                                id="Token-select"
                                value={token}
                                label="Token"
                                onChange={(event: SelectChangeEvent) => {
                                    setToken(event.target.value as string);
                                }}
                            >
                                <MenuItem value={"Token"}>Token</MenuItem>
                                <MenuItem value={"BNB"}>BNB</MenuItem>
                                <MenuItem value={"BTC"}>BTC</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="Network">Network</InputLabel>
                            <Select
                                labelId="Network"
                                id="Network-select"
                                value={network}
                                label="Network"
                                onChange={(event: SelectChangeEvent) => {
                                    setNetwork(event.target.value as string);
                                }}
                            >
                                <MenuItem value={"MyCoin"}>MyCoin testnet (internal chain)</MenuItem>
                                <MenuItem value={"Bnb smart chain"}>BNB Smart Chain (BEP20)</MenuItem>
                                <MenuItem value={"Ethereum"}>ETH - Ethereum (ERC20)</MenuItem>
                            </Select>
                        </FormControl>
                        <h1>Address</h1>
                        {
                            token === 'Token' && network === 'MyCoin' ?
                                <div className='text-base font-semibold'>{authState?.accounts[0].address}</div>
                                :
                                <Button variant='contained' className='!w-auto !px-8 text-sm'>
                                    Reveal address
                                </Button>
                        }
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Faucet
                    </TabPanel>
                </div>
            </div>

        </main>
    )
}

export default Home