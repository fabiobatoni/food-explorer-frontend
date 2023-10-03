"use client"

import { Button, ButtonMenu, Container, Content, Logo, Logout, Profile, Search } from "./styles";

import { FiList, FiLogOut, FiPlus, FiSearch, FiUser } from 'react-icons/fi';

import Link from "next/link";
import { useAuth } from '../../hooks/auth';

interface HeaderProps {
    search?: (searchValue: string) => void;
}

export function Header({ search }: HeaderProps) {

    const { user } = useAuth()
    const { signOut } = useAuth();

    return (
        <Container>
            <Content>
                <Logo>
                    <div className="logo">
                        <a href="/">
                        <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.0635 0.306641L25.7096 7.60782V22.2102L13.0635 29.5114L0.417527 22.2102V7.60782L13.0635 0.306641Z" fill="#065E7C"/>
                            </svg>
                            <h1>food explorer</h1>
                        </a>
                    </div>
                </Logo>

                <div className="hamburger" id="hamburger">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <div className="nav-menu" id="nav-menu">

                    <Search>
                        <label>
                            <FiSearch size={24}/>
                            <input
                                type="text"
                                placeholder="Busque pelas opções de pratos"
                                onChange={(e) => {
                                    if (search) {
                                      search(e.target.value);
                                    }
                                }}
                            />
                        </label>
                    </Search>
                    {
                        user && user.isAdmin ? (
                            <Link href="/CreateFood">
                                <Button type='button'>
                                    <FiPlus size={24}/>
                                    Pratos <span></span>
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/">
                                <Button type='button'>
                                    <FiList size={24}/>
                                    Pedidos <span></span>
                                </Button>
                            </Link>
                        )
                    }
                    <Profile>

                    <Link href="/Profile">
                        <FiUser />
                        </Link>
                    </Profile>

                    <Logout onClick={() => signOut()}>
                        <FiLogOut size={24} />
                    </Logout>
                </div>

            </Content>
        </Container>
    );
}
