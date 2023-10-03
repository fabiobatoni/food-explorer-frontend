"use client"
import { Card } from "@/components/Card";
import Footer from '@/components/Footer';
import { Header } from "@/components/Header";

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/global';
import theme from "../styles/theme";
import { Banner, Container, Content } from "./styles";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

interface Food {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    category: string;
  }

export default function Home() {

    const [foods, setFoods] = useState<Food[]>([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        async function fetchFoods() {
          const response = await api.get(`/foods?title=${search}`);
          console.log('response', response.data);
          setFoods(response.data);
    }
    fetchFoods();
    }, [search])

    return(<>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
                <Container>
                    <Header search={setSearch} />
                        <Content>
                            <Banner>
                                <img src="https://github.com/andreviapiana/Food-Explorer/blob/main/food-explorer-frontend/src/assets/Mask%20group.png?raw=true" alt="Imagem de ingredientes" />

                                <div className="banner">
                                    <div className="title">
                                        <h1>Sabores inigualáveis</h1>
                                        <span>Sinta o cuidado do preparo com ingredientes selecionados</span>
                                    </div>
                                </div>
                            </Banner>

                            <div className="cards">
                                <p>Pratos principais</p>

                                {
                                    foods.filter(food => food.category === "pratos").length > 0 &&
                                       <Swiper
                                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                                        spaceBetween={5}
                                        slidesPerView={3}
                                        navigation
                                        breakpoints={{
                                            414: {
                                              width: 400,
                                              slidesPerView: 1,
                                            },
                                        }}
                                        pagination={{ clickable: true }}
                                        scrollbar={{ draggable: true }}
                                        onSwiper={(swiper) => console.log(swiper)}
                                        onSlideChange={() => console.log('slide change')}
                                        >
                                            {
                                                foods.filter(food => food.category === "pratos" && food).map((food) => (
                                                    <SwiperSlide
                                                        key={String(food.id)}
                                                    >
                                                        <Card
                                                            title={food.title}
                                                            description={food.description}
                                                            price={food.price}
                                                            image={food.image}
                                                            id={food.id}
                                                        />
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>
                                }

                                <p>Sobremesas</p>

                                {
                                    foods.filter(food => food.category === "sobremesas").length > 0 &&
                                       <Swiper
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    spaceBetween={5}
                                    slidesPerView={3}
                                    navigation
                                    breakpoints={{
                                        414: {
                                            width: 400,
                                            slidesPerView: 1,
                                        },
                                    }}
                                    pagination={{ clickable: true }}
                                    scrollbar={{ draggable: true }}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    onSlideChange={() => console.log('slide change')}
                                    >
                                            {
                                                foods.filter(food => food.category === "sobremesas" && food).map((food) => (
                                                    <SwiperSlide
                                                        key={String(food.id)}
                                                    >
                                                        <Card
                                                            title={food.title}
                                                            description={food.description}
                                                            price={food.price}
                                                            image={food.image}
                                                            id={food.id}
                                                        />
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>
                                }

                                <p>Bebidas</p>

                                {
                                    foods.filter(food => food.category === "bebidas").length > 0 &&
                                       <Swiper
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    spaceBetween={5}
                                    slidesPerView={3}
                                    navigation
                                    breakpoints={{
                                        414: {
                                            width: 400,
                                            slidesPerView: 1,
                                        },
                                    }}
                                    pagination={{ clickable: true }}
                                    scrollbar={{ draggable: true }}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    onSlideChange={() => console.log('slide change')}
                                    >
                                            {
                                                foods.filter(food => food.category === "bebidas" && food).map((food) => (
                                                    <SwiperSlide
                                                        key={String(food.id)}
                                                    >
                                                        <Card
                                                            title={food.title}
                                                            description={food.description}
                                                            price={food.price}
                                                            image={food.image}
                                                            id={food.id}
                                                        />
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>
                                }
                            </div>
                        </Content>
                    <Footer />
                </Container>
        </ThemeProvider>
        </>
    )
}
