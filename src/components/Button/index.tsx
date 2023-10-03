import { Container } from './styles';

interface ButtonProps {
    title: string;
    icon?: string;
    onClick?: () => void;
    className?: string;
}

export function Button({ title, icon: Icon, ...rest }: ButtonProps) {
    return (
            <Container type="button" {...rest}>
                {Icon && <Icon />}
                {title}
            </Container>
        );
}
