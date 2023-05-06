import Image from 'next/image'
import React from 'react'

interface ComponentProps {
    size?: number;
    className?: string;
}

const Logo = ({ size, className }: ComponentProps) => {
    return (
        <div className={`relative ${className}`}>
            <Image
                src="/assets/images/branch.png"
                alt="Logo"
                width={size ?? 300}
                height={size ?? 300}
                priority
            />
        </div>
    )
}

export default Logo