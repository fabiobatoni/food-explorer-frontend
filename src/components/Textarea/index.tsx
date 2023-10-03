import { Container } from "./styles";



export function Textarea({ value , ...rest }:any) {
    return (
        <Container {...rest}>
            {value}
        </Container>
    );
}
