"use client"
import { Avatar, Container, Content, Form } from './styles';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/global';


import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/auth';
import { api } from '@/services/api';
import { useState } from 'react';
import { FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import theme from '../styles/theme';

export default function Profile() {

    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [passwordOld, setPasswordOld] = useState<string | undefined>('');
    const [passwordNew, setPasswordNew] = useState<string | undefined>('');

    // Update User Function
    const avatarUrl = user?.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    async function handleUpdate() {
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld,
        }

        const userUpdated = { ...(user || {}), ...updated };

        await updateProfile({ user: userUpdated, avatarFile });
    }

    function handleChangeAvatar(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files && event.target.files[0];

        if (file) {
            setAvatarFile(file);

            const imagePreview = URL.createObjectURL(file);
            setAvatar(imagePreview);
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
                <Container>
                    <Header />
                        <Content>
                            <div className='card'>
                                <Form>
                                    <Avatar>
                                        <img
                                            src={avatar}
                                            alt="Foto do usuário"
                                        />

                                        <label htmlFor="avatar">
                                            <FiCamera />

                                            <input
                                                id="avatar"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleChangeAvatar}
                                            />
                                        </label>
                                    </Avatar>

                                    <div className='inputs'>
                                        <label>
                                            <FiUser size={20}/>
                                            <input
                                                type="text"
                                                placeholder="Nome"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </label>

                                        <label>
                                            <FiMail size={20}/>
                                            <input
                                                type="text"
                                                placeholder="E-mail"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </label>

                                        <label>
                                            <FiLock size={20}/>
                                            <input
                                                type="password"
                                                placeholder="Senha atual"
                                                onChange={e => setPasswordOld(e.target.value)}
                                            />
                                        </label>

                                        <label>
                                            <FiLock size={20}/>
                                            <input
                                                type="password"
                                                placeholder="Nova senha"
                                                onChange={e => setPasswordNew(e.target.value)}
                                            />
                                        </label>
                                    </div>

                                    <Button
                                        title="salvar"
                                        icon=""
                                        onClick={() => handleUpdate()}
                                    />
                                </Form>
                            </div>
                        </Content>
                        <Footer />
                </Container>
        </ThemeProvider>
    );
}
