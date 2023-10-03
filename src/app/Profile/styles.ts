import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    min-width: 32rem;
    height: 100vh;

    overflow: auto;
    overflow: overlay;
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    max-width: 121.2rem;
    margin: 0 auto;
    padding: 4rem;

    .card {
        -webkit-box-shadow: 5px 10px 10px 5px #193746;
        box-shadow: 5px 10px 10px 5px #193746;
        border-radius: 1rem;
        margin-top: 4rem;
    }

    @media only screen and (min-width: 768px) {
        .card {
            display: flex;
        }
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    padding: 5rem;
    border-radius: 1rem 1rem 1rem 1rem;

    background-color: ${({ theme }) => theme.COLORS.DARK_600};

    .inputs {
        display: flex;
        flex-direction: column;

        width: 100%;

        margin-bottom: 1.5rem;
        gap: 1rem;

        input {
            height: 4.8rem;

            padding: 1.6rem;
            border: 0;

            color: ${({ theme }) => theme.COLORS.LIGHT_200};
            background: transparent;

            &:placeholder {
                color: ${({ theme }) => theme.COLORS.LIGHT_200};
            }
        }

        label {
            position: relative;
            display: flex;
            align-items: center;
            padding-left: 1.6rem;
            align-self: center;

            width: 100%;

            border-radius: 0.5rem;
            border: 1px solid ${({ theme }) => theme.COLORS.LIGHT_100};

            background-color: ${({ theme }) => theme.COLORS.DARK_700};
        }

        svg {
            color: ${({ theme }) => theme.COLORS.LIGHT_200};
        }
    }

    @media only screen and (min-width: 768px) {
        border-radius: 1rem 0 0 1rem;
    }
`;

export const Avatar = styled.div`
    position: relative;
    margin: 0 3rem 3rem;

    > img {
        width: 18.6rem;
        height: 18.6rem;
        border-radius: 50%;
        object-fit: cover;
    }

    > label {
        display: flex;
        align-items: center;
        justify-content: center;

        position: absolute;
        bottom: 0.7rem;
        right: 0.7rem;

        width: 4.8rem;
        height: 4.8rem;

        border-radius: 50%;


        cursor: pointer;
        background: ${({ theme }) => theme.COLORS.TOMATO_100};

        input {
            display: none;
        }

        svg {
            width: 2rem;
            height: 2rem;
            color: ${({ theme }) => theme.COLORS.LIGHT_100};
        }
    }

    > label:hover {
        background-color: ${({ theme }) => theme.COLORS.TOMATO_200};
    }
`;

