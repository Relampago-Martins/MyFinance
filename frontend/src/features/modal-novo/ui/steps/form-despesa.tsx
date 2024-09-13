'use client';
import { criaDespesa } from '@/shared/api/endpoints/despesa-cli';
import { despesa } from '@/shared/lib/forms';
import { Button } from '@/shared/ui/button';
import { CurrencyInput } from '@/shared/ui/currency';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { DespesaSchema } from '@/types/models/despesa';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SelectCategoria } from '../inputs/select-categoria';
import { SelectFormaPagamento } from '../inputs/select-forma-pagamento';
import { StepHeader } from '../step-header';

export function FormDespesa() {
    const form = useForm<DespesaSchema>({
        resolver: zodResolver(despesa),
        defaultValues: {
            descricao: '',
        },
    });

    const onSubmit = async (data: DespesaSchema) => {
        const resp = await criaDespesa(data);
        if (resp.status === 201) {
            alert('Despesa criada com sucesso');
        } else {
            alert('Erro ao criar despesa');
        }
    };

    return (
        <>
            <StepHeader title="Despesa" backBtn />
            <Form {...form}>
                <form
                    className="flex flex-col gap-5"
                    onSubmit={form.handleSubmit(onSubmit, console.error)}
                >
                    <FormField
                        name="valor"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Valor</FormLabel>
                                <FormControl>
                                    <CurrencyInput
                                        {...field}
                                        placeholder="R$ 0,00"
                                    />
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="descricao"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="categoria"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categoria</FormLabel>
                                <FormControl>
                                    <SelectCategoria {...field} />
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="forma_pagamento"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Forma de Pagamento</FormLabel>
                                <FormControl>
                                    <SelectFormaPagamento {...field} />
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Cadastrar</Button>
                </form>
            </Form>
        </>
    );
}
