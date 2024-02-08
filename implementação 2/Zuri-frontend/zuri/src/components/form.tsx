import React from "react";
import {useState} from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from "react-feather";


import { useForm } from 'react-hook-form';


const createUserFormSchema = z.object({
    nome: z.string().nonempty('Nome é um campo obrigatório').transform(nome => {
        return nome.trim().split(' ').map(word => {
            return word[0].toLocaleUpperCase().concat(word.substring(1))
        }).join(' ');
    }),
    dataNascimento: z.string(),
    email: z.string().nonempty('Email é um campo obrigatório').email('Formato de e-mail inválido').toLowerCase(),
    estadoCivil: z.string().nonempty('Estado Civil é um campo obrigatório'),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

function Form() {
    const [output, setOutput] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema),
    })

    async function createUser(data: any) {
        try {
            const response = await fetch('http://localhost:5195/api/Usuario/Criar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status === 200) {
                const responseData = await "Usuaário cadastrado com sucesso!";
                setOutput(responseData);
            } else {
                setOutput('Erro ao criar usuário.');
            }
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            setOutput('Erro ao criar usuário. Verifique o console para mais detalhes.');
        }
    }

    return (
        <div className="h-screen flex flex-col gap-10 bg-white items-center justify-center">
            <form
                className="bg-white shadow-md rounded-lg w-2/5 h-4/5 flex flex-col"
                onSubmit={handleSubmit(createUser)}
            >
                <div className="flex justify-center mb-8">
                    <img src="https://gozuri.com/wp-content/uploads/2023/03/zuri.png" alt="Zuri Logo" className="w-48 mb-8" />
                </div>

                <div className="mb-4 flex justify-center">
                    <div className="w-1/2">
                        <label htmlFor="txtNome" className="block text-teal-900 font-semibold">Nome:</label>
                        <input
                            type="text"
                            id="txtNome"
                            className="form-input mt-1 w-full border shadow-md rounded h-10 px-3 text-black"
                            placeholder="Digite aqui o Nome"
                            {...register('nome')}
                        />
                        {errors.nome && <span className="text-black">{errors.nome.message}</span>}
                    </div>
                </div>
                <div className="mb-4 flex justify-center">
                    <div className="w-1/2">
                        <label htmlFor="txtDataNascimento" className="block text-teal-900 font-semibold">Data de Nascimento:</label>
                        <input
                            type="date"
                            id="txtDataNascimento"
                            className="form-input mt-1 w-full text-black border shadow-md rounded h-10 px-3"
                            {...register('dataNascimento')}
                        />
                    </div>
                </div>
                <div className="mb-4 flex justify-center">
                    <div className="w-1/2">
                        <label htmlFor="txtEmail" className="block text-teal-900 font-semibold">E-mail:</label>
                        <input
                            type="email"
                            id="txtEmail"
                            className="form-input mt-1 w-full border shadow-md rounded h-10 px-3 text-black"
                            placeholder="Digite aqui o seu e-mail"
                            {...register('email')}
                        />
                        {errors.email && <span className="text-black">{errors.email.message}</span>}
                    </div>
                </div>
                <div className="mb-4 flex justify-center">
                    <div className="w-1/2">
                        <label htmlFor="ddlEstadoCivil" className="block text-teal-900 font-semibold">Estado Civil:</label>
                        <select id="ddlEstadoCivil" className="form-select mt-1 w-full text-black border shadow-md rounded h-10 px-3" {...register('estadoCivil')}>
                            <option value="Solteiro(a)">Solteiro(a)</option>
                            <option value="Casado(a)">Casado(a)</option>
                            <option value="Divorciado(a)">Divorciado(a)</option>
                            <option value="Viúvo(a)">Viúvo(a)</option>
                        </select>
                        {errors.estadoCivil && <span className="text-black">{errors.estadoCivil.message}</span>}
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        type="submit"
                        id="btnSubmit"
                        className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded flex items-center"
                    >
                        Cadastrar <ArrowRight className="ml-2" />
                    </button>
                </div>
            </form>

            <pre className="text-black">
                {output}
            </pre>
        </div>
    );
}

export default Form;
