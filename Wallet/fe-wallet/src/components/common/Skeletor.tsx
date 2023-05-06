import React from "react"
import { default as Skelter } from 'react-loading-skeleton';
import colors from '@/styles/colors';

import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
    width?: number;
    height?: number;
}

export default function Skeleton({ width, height, ...props }: Props) {
    return <Skelter
        width={width ?? 45}
        height={height ?? 20}
        baseColor={colors.gray[4]}
        highlightColor="#FCFCFC"
        {...props}
    />
}
