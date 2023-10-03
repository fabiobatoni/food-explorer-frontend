import { Container } from "./styles";

interface ButtonTextProps {
    icon?: string;
    title: string;
}

export function ButtonText({ icon: Icon, title, ...rest }: ButtonTextProps) {
    return (
        <Container
        type="button"
        {...rest}
        >
            {Icon && <Icon />}
            {title}
        </Container>
    );
}
