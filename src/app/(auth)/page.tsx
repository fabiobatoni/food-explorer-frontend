"use client"

import { Container, Form, Logo } from "./styles";

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/global';

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import theme from "../styles/theme";

import Link from 'next/link';
import { useState } from "react";
import { useAuth } from "../../hooks/auth";

export default function Auth() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { signIn } = useAuth()

    function handleSignIn() {
        signIn({ email, password });
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
                <Container>

                    <Logo>
                        <div className="logo">
                            <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.0635 0.306641L25.7096 7.60782V22.2102L13.0635 29.5114L0.417527 22.2102V7.60782L13.0635 0.306641Z" fill="#065E7C"/>
                            </svg>
                            <h1>food explorer</h1>
                        </div>
                    </Logo>

                    <Form>
                        <h2>Faça login</h2>

                        <div className="inputs">
                            <p>Email</p>
                            <Input
                                placeholder="Exemplo: exemplo@exemplo.com.br"
                                type="text"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="inputs">
                            <p>Senha</p>
                            <Input
                                placeholder="No mínimo 6 caracteres"
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <Button icon="icon" title="Entrar"
                        onClick={() => handleSignIn()}
                        />

                        <Link href="/signup">
                            Criar conta
                        </Link>

                    </Form>
                </Container>
        </ThemeProvider>
    );
}
