import styled from "styled-components";

interface ContainerProps {
    isNew?: boolean;
  }

export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;

    padding: 0 1.6rem;
    border-radius: 0.8rem;
    border: ${({ theme, isNew }:any) => isNew ? `1px dashed ${theme.COLORS.GRAY_300}` : "none"};

    color: ${({ theme }) => theme.COLORS.LIGHT_300};
    background-color: ${({ theme, isNew }:any) => isNew ? "transparent" : theme.COLORS.TOMATO_200};

    svg {
        vertical-align: middle;
    }

    > button {
        border: none;
        background: none;
    }

    .button-delete {
        color: ${({ theme }) => theme.COLORS.LIGHT_300};
    }

    .button-add {
        color: ${({ theme }) => theme.COLORS.MINT_100};
    }

    > input {
        max-width: 13rem;
        height: 2.8rem;

        border: none;

        color: ${({ theme }) => theme.COLORS.LIGHT_300};
        background: transparent;

        &::placeholder {
            color: ${({ theme }) => theme.COLORS.LIGHT_400};
        }
    }
`;
