"use client"
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../styles/global';
import { Container, Content, Form, Image } from "./styles";

import { Button } from "../../../components/Button";
import { ButtonText } from "../../../components/ButtonText";
import Footer from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { IngredientsTag } from "../../../components/IngredientsTag";
import { Input } from "../../../components/Input";
import { Textarea } from "../../../components/Textarea";

import { api } from '@/services/api';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { FiCamera } from "react-icons/fi";
import { RiArrowLeftSLine } from 'react-icons/ri';
import theme from '../../styles/theme';

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

export default function EditFood({ params }: FoodProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [newIngredient, setNewIngredient] = useState<string>('');

    const [data, setData] = useState<FoodData | null>(null);

    const imageURL = data && `${api.defaults.baseURL}/files/${data.image}`;

    const [image, setImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null)

    const router = useRouter();

    function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files && event.target.files[0];

        if (file) {
            setImageFile(file);

            const imagePreview = URL.createObjectURL(file);
            setImage(imagePreview);
        }
    }

    function handleAddIngredient() {
        if (newIngredient.length < 3) {
            return alert("Erro: Você está tentando inserir um nome de ingrediente inválido!");
        } else {
            setIngredients(prevState => [...prevState, newIngredient]);
            setNewIngredient("");
        }
    }

    function handleRemoveIngredient(deleted: string){
        setIngredients(prevState => prevState.filter(ingredient => ingredient !== deleted));
    }

    async function handleUpdateFood() {
        if (!image) {
            return alert("Erro: Você não carregou a nova imagem do prato!");
        }

        if (!title) {
            return alert("Erro: Você não informou o nome do prato!");
        }

        if (ingredients.length < 1) {
            return alert("Erro: Adicione pelo menos um ingrediente!")
        }

        if (newIngredient) {
            return alert("Erro: Você deixou um ingrediente no campo para adicionar, mas não clicou em adicionar. Clique no sinal de + para adicionar!");
        }

        if (!category) {
            return alert("Erro: Você não selecionou a categoria do prato!");
        }

        if (!price) {
            return alert("Erro: Você não informou o preço do prato!");
        }

        if (!description) {
            return alert("Erro: Você não informou uma descrição para o prato!");
        }

        const formData = new FormData();
        if (imageFile) {
            formData.append("image", imageFile);
        }
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);

        ingredients.map(ingredient => (
            formData.append("ingredients", ingredient)
        ))

        await api
            .put(`/foods/${params.id}`, formData)
            .then(() => {
                alert("Prato Atualizado com sucesso!"),
                router.push("/Home")
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Erro ao atualizar o prato!");
                }
            });
    }

    useEffect(() => {
        async function fetchFood() {
            const response = await api.get(`/foods/${params.id}`);
            setData(response.data);

            const { title, description, category, price, ingredients } = response.data;
            setTitle(title);
            setDescription(description);
            setCategory(category);
            setPrice(price);
            setIngredients(ingredients.map((ingredient: { name: string }) => ingredient.name));
        }

        setImage(imageURL);

        fetchFood();
    }, [])

    // Remove Dish Function
    async function handleRemoveFood() {
        const isConfirm = confirm("Tem certeza que deseja remover este item?");

        if(isConfirm) {
            await api.delete(`/foods/${params.id}`)
            .then(() => {
                alert("Item removido com sucesso!"),
                router.push("/Home")
            })
        } else {
            return
        }
    }

    return(
        <ThemeProvider theme={theme}>
            <GlobalStyles />
                <Container>
                    <Header />
                            <Content>
                                <Form>
                                    <header>
                                        <Link href="/Home">
                                            <ButtonText title="Voltar" icon={RiArrowLeftSLine}/>
                                        </Link>
                                        <h1>Editar prato</h1>
                                    </header>

                                    <div className="details">
                                        <div className="dishImage">
                                            <p>Imagem do Prato</p>

                                            <Image>
                                                {image && (
                                                    <img
                                                    src={image}
                                                    alt="Foto do prato"
                                                    />
                                                )}

                                                <label htmlFor="image">
                                                    <FiCamera />

                                                    <input
                                                        id="image"
                                                        type="file"
                                                        name="image"
                                                        accept="image/*"
                                                        onChange={handleChangeImage}
                                                    />
                                                </label>
                                            </Image>
                                        </div>

                                        <div className="dishDetails">
                                            <div className="dishName">
                                                <div className="dish">
                                                    <p>Nome do prato</p>
                                                    <Input
                                                        placeholder="Ex.: Salada"
                                                        type="text"
                                                        value={title}
                                                        onChange={e => setTitle(e.target.value)}
                                                    />
                                                </div>

                                                <div className="dishCategory">
                                                    <p>Categoria</p>

                                                    <select value={category} onChange={e => setCategory(e.target.value)}>
                                                        <option value="default" disabled>Selecione a categoria</option>
                                                        <option value="dishes">Pratos</option>
                                                        <option value="drinks">Bebidas</option>
                                                        <option value="dessert">Sobremesas</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="dishIngredients">
                                                <div className="ingredientsTag">
                                                    <div>
                                                        <p>Ingredientes</p>
                                                        <div className="ingredients">
                                                             {
                                                                ingredients.map((ingredient, index) => (
                                                                    <IngredientsTag
                                                                        key={String(index)}
                                                                        value={ingredient}
                                                                        onClick={() => handleRemoveIngredient(ingredient) }
                                                                    />
                                                                ))
                                                            }


                                                            <IngredientsTag
                                                                isNew
                                                                placeholder="Adicionar"
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewIngredient(e.target.value)}
                                                                value={newIngredient}
                                                                onClick={handleAddIngredient}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="price">
                                                    <p>Preço</p>
                                                    <Input
                                                        placeholder="R$ 00,00"
                                                        type="number"
                                                        value={price}
                                                        onChange={e => setPrice(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="textarea">
                                        <p>Descrição</p>
                                        <Textarea
                                            placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                                            defaultValue={description}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                                        />
                                    </div>

                                </Form>


                            <div className="button">
                                <Button
                                    className="deleteButton"
                                    title="Excluir prato"
                                    onClick={() => handleRemoveFood()}

                                />
                                <Button
                                    title="Salvar alterações"
                                    onClick={() => handleUpdateFood()}
                                />
                            </div>

                            </Content>
                        <Footer />
                </Container>
        </ThemeProvider>
    );
}
