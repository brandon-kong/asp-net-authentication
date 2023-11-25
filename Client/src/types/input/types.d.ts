export type InputType = 'text' | 'number' | 'password' | 'email' | 'date' | 'time' | 'datetime-local' | 'file' | 'hidden' | 'image' | 'month' | 'range' | 'search' | 'tel' | 'url' | 'week';

export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonProps = {
    type?: ButtonType;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
}

type GenericInputProps = {
    type?: InputType;
    name?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;
    min?: number;
    max?: number;
    step?: number;
    pattern?: string;
    title?: string;
    list?: string;
    readOnly?: boolean;
    multiple?: boolean;
    accept?: string;
    size?: number;
    maxLength?: number;
    minLength?: number;
    form?: string;
    withLabel?: boolean;
}

export type InputWithoutLabelProps = GenericInputProps & {
    label?: never;
    labelClassName?: never;
    withLabel: false;
}

export type InputWithLabelProps = GenericInputProps & {
    label: string;
    labelClassName?: string;
    withLabel: true;
}

export type InputProps = InputWithoutLabelProps | InputWithLabelProps;