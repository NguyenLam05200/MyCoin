import React, { useEffect } from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button, Form, Input } from 'antd'
import Logo from '@/components/common/Logo';
import { LockOutlined } from '@ant-design/icons';
import { useFetchApi } from '@/utils';
import { API } from '@/apis';
import { useMemo, useState } from 'react';

interface BrickType {
    id: number,
    word: string
}
interface Props {
    mnemonic: string | "";
    setCanSubmit: Function;
}

const ConfirmMnemonic = ({ mnemonic, setCanSubmit }: Props) => {
    const [listBrick, setListBrick] = useState<BrickType[]>(mnemonic.split(' ').map((word, i) => ({ id: i, word })))
    const [listChooose, setListChooose] = useState<BrickType[]>([])

    useEffect(() => {
        const parseMnemonic = listChooose.reduce((result, prev) => `${result} ${prev.word}`, "").trim()

        if (parseMnemonic === mnemonic) {
            setCanSubmit(true)
        } else {
            setCanSubmit(false)
        }
    }, [listChooose])

    return (
        <div className='min-w-[350px] max-w-[500px]'>
            <div className='flex gap-4 w-full flex-wrap pb-4 shadow-bottom'>
                {listChooose.map(item =>
                    <Button
                        key={item.id} type='ghost'
                        className='!duration-75 text-base rounded-md h-[45px] w-auto'
                        size='large'
                        onClick={() => {
                            setListBrick(prev => [...prev, item]);
                            setListChooose(prev => prev.filter(obj => obj.id !== item.id))
                        }}
                    >
                        {item.word}
                    </Button>
                )}
            </div>
            <div className='flex gap-4 w-full flex-wrap mt-10'>
                {listBrick.map(item =>
                    <Button
                        key={item.id} type='ghost'
                        className='!duration-75 text-base rounded-md h-[45px] w-auto'
                        size='large'
                        onClick={() => {
                            setListChooose(prev => [...prev, item]);
                            setListBrick(prev => prev.filter(obj => obj.id !== item.id))
                        }}
                    >
                        {item.word}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ConfirmMnemonic