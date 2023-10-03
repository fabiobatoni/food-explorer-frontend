import styled from 'styled-components';

export const Container = styled.button`
    width: 100%;
    background-color: ${({theme}) => theme.COLORS.TOMATO_100};
    color: ${({theme}) => theme.COLORS.LIGHT_100};

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    gap: 10px;


    height: 56px;
    border: 0;
    padding: 15px;
    margin-top: 16px;
    border-radius: 4px;
    font-weight: 500;

    &:disabled{
        opacity: 1;
    }

`;
