import React from 'react'

import classNames from 'classnames'

import { ButtonProps } from '@/types/input/types'

export function Button (props: ButtonProps) {
    return (
        <button className={classNames(
            "rounded-md p-2 bg-black text-white hover:bg-black/90 transition-all select-none",
            props.className,
        )}
        type={props.type}
        onClick={props.onClick}
        >{props.children}</button>
    )
}