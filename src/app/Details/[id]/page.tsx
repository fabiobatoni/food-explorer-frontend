"use client"
import { Container, Content, Ingredient, PurchaseCard } from "./styles";

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../styles/global';



import { useEffect, useState } from "react";

import theme from "@/app/styles/theme";
import { ButtonText } from "@/components/ButtonText";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { IngredientsTag } from "@/components/IngredientsTag";
import { useAuth } from "@/hooks/auth";
import { api } from "@/services/api";
import Link from "next/link.js";
import { BsReceipt } from 'react-icons/bs';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { RiArrowLeftSLine } from 'react-icons/ri';

interface FoodProps {
    params: {
        id: string;
    }
}

interface Ingredient {
    name: string;
    // Outras propriedades, se houver
  }

interface FoodData {
    image: string;
    title: string;
    description: string;
    price: number;
    ingredients: Ingredient[];
  }


export default function Details({ params }: FoodProps) {

    const { user } = useAuth()

    const [data, setData] = useState<FoodData | null>(null);
    const imageURL = data && `${api.defaults.baseURL}/files/${data.image}`;

    useEffect(() => {
        async function fetchFoodsDetail() {
            const response = await api.get(`/foods/${params.id}`);
            setData(response.data);
        }

        console.log(data);

        fetchFoodsDetail();
    }, []);

    return(
        <ThemeProvider theme={theme}>
            <GlobalStyles />
                <Container>
                    <Header />
                    {
                        data &&

                        <Content>
                            <Link href="/Home">
                                <ButtonText
                                    title="Voltar"
                                    icon={RiArrowLeftSLine}
                                />
                            </Link>

                            <div className="content">

                                <div className="dish">
                                    <img src={imageURL || undefined} alt="Logo" />
                                    <div className="description">

                                        <h1>{data.title}</h1>

                                        <h3>{data.description}</h3>

                                        <Ingredient>
                                            {
                                                data.ingredients.map(ingredient => (
                                                    <>
                                                    <div className="tag">
                                                     {ingredient.name}
                                                    </div>
                                                    </>
                                                ))
                                            }
                                        </Ingredient>

                                        <div className="price">
                                            <h4>R$ {data.price}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Content>
                    }
                    <Footer />
                </Container>
        </ThemeProvider>
    );
}
