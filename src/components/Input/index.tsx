import { ChangeEvent } from 'react';
import { Container } from './styles';

interface InputProps {
    name?: string;
    id?: string;
    accept?: string;
    icon?: string;
    placeholder?: string;
    value?: string;
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ icon: Icon, onChange, ...rest }:InputProps) {
    return (
        <Container>
            {Icon && <Icon />}
            <input {...rest} onChange={onChange} />
        </Container>
    )
}
