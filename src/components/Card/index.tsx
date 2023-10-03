import { Container, Content } from './styles';

import { Button } from '../Button';

import { useAuth } from '@/hooks/auth';
import { api } from "@/services/api";
import Link from 'next/link';
import { BsEyeSlash, BsReceipt } from 'react-icons/bs';
import imagePlaceholder from '../../assets/image-not-found-icon.svg';



interface CardProps {
id: number;
title: string;
image?: string;
description: string;
price: string;
}

export function Card({ title, description, image, price, id, ...rest } : CardProps) {

    const { user } = useAuth()

    const imageURL = image ? `${api.defaults.baseURL}/files/${image}` : imagePlaceholder;

    return (
        <Container >
                    <Content>
                        <div className="container">
                            <img src={imageURL} alt="Imagem do prato" />
                            <a href="">
                                <h3 className="product-title">{title}</h3>
                            </a>
                            <p className="description">{description}</p>
                            <h1 className="price">R$ {price}</h1>

                            {
                                user && user.isAdmin ?

                                <Link href={`/EditFood/${id}`}>
                                    <Button
                                        title="editar prato"
                                        icon={BsReceipt}
                                    />
                                </Link>

                                :

                                <Link href={`/Details/${id}`}>
                                    <Button
                                        title="Detalhes"
                                        icon={BsEyeSlash}
                                    />
                                </Link>

                            }
                        </div>
                    </Content>
        </Container>
    );
}
