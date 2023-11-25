import React from 'react'

import classNames from 'classnames'

import { InputProps, InputWithLabelProps } from '@/types/input/types'
import { TypographyP } from '../typography'

export function Input (props: InputProps) {
    const { className, withLabel, ...rest } = props
    return (
        <div className={classNames(
            "flex flex-col w-full",
            className,
        )}>
            {withLabel && <TypographyP className={classNames(
                "text-sm text-gray-500",
                props.labelClassName,
            
            )}>{props.label}</TypographyP>}
            <input className={classNames(
                "border border-transparent bg-gray-200 rounded-md p-2 focus:border-gray-200 focus:bg-transparent transition-all",
                className,
            )}
            {...rest}
            />
        </div>
    
    )
}

// default props

Input.defaultProps = {
    withLabel: false,
}

export function PasswordInput (props: InputProps) {
    return (
        <input className={classNames(
            "border-2 border-gray-400 rounded-lg p-2",
            props.className,
        )}
        type="password"
        onChange={props.onChange}
        value={props.value}
        />
    )
}

export function FloatingInput(props: InputWithLabelProps) {
    const { className, withLabel, label, labelClassName, ...rest } = props
    return (
        <div className="w-full relative z-0">
            <input 
            type="text" 
            id="floating_standard" 
            className={classNames("block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300/50 appearance-none focus:outline-none focus:ring-0 peer focus:border-black transition-colors", className)} placeholder=" " {...rest} />
            <label htmlFor="floating_standard" className={classNames("absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-[85%] top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[85%] peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto select-none", labelClassName)}>
                {label}
            </label>
        </div>
    )
}

FloatingInput.defaultProps = {
    withLabel: true,
}