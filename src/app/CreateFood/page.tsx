"use client"
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { IngredientsTag } from "@/components/IngredientsTag";
import { Textarea } from "@/components/Textarea";
import { ThemeProvider } from 'styled-components';
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Input } from "../../components/Input";
import GlobalStyles from '../styles/global';
import { Container, Content, Form } from "./styles";


import { api } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { RiArrowLeftSLine } from 'react-icons/ri';
import theme from "../styles/theme";

export default function CreateFood( ) {

    const [ingredients, setIngredients] = useState<string[]>([]);
    const [newIngredient, setNewIngredient] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    const router = useRouter();

    function handleAddIngredient() {
        if (newIngredient.length < 3) {
            return alert("Erro: Você está tentando inserir um nome de ingrediente inválido!");
        } else {
            setIngredients((prevState) => [...prevState, newIngredient]);
            setNewIngredient("");
        }
    }

    function handleRemoveIngredient(deleted:string){
        setIngredients((prevState) => prevState.filter(ingredient => ingredient !== deleted));
    }


    async function handleNewFood() {
        if (!image) {
            return alert("Erro: Você não inseriu uma imagem para o prato!");
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
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);

        ingredients.map(ingredient => (
            formData.append("ingredients", ingredient)
        ))

        await api
            .post("/foods", formData)
            .then(() => {
                alert("Prato adicionado com sucesso!");
                router.push("/Home")
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Erro ao criar o prato!");
                }
            });
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
                                    <h1>Criar prato</h1>
                                </header>

                                <div className="details">
                                    <div className="dishImage">
                                        <p>Imagem do Prato</p>
                                        <label htmlFor="image">
                                            <FiUpload size={24}/>
                                            Selecione imagem
                                        </label>
                                        <Input
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            onChange={(e: {target: { [x: string]: any; value: string}}) => setImage(e.target.files[0])}
                                        />
                                    </div>

                                    <div className="dish">
                                        <p>Nome do prato</p>
                                        <Input
                                            placeholder="Ex.: Salada de Alface"
                                            type="text"
                                            onChange={e => setTitle(e.target.value)}
                                        />
                                    </div>
                                </div>

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

                                    <div className="dishCategory">
                                        <p>Categoria</p>

                                        <select defaultValue={'default'} onChange={e => setCategory(e.target.value)}>
                                            <option value="default" disabled>Selecione a categoria</option>
                                            <option value="pratos">Pratos</option>
                                            <option value="bebidas">Bebidas</option>
                                            <option value="sobremesas">Sobremesas</option>
                                        </select>
                                    </div>

                                    <div className="price">
                                        <p>Preço</p>
                                        <Input
                                            placeholder="R$ 00,00"
                                            type="number"
                                            onChange={e => setPrice(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="textarea">
                                    <p>Descrição</p>
                                    <Textarea
                                        placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                                    />
                                </div>

                            </Form>

                            <div className="button">
                                <Button
                                    title="Salvar alterações"
                                    icon=""
                                    onClick={() => handleNewFood()}
                                />
                            </div>
                            </Content>
                    <Footer />
                </Container>
        </ThemeProvider>
    );
}
