'use client';
import { criaReceita } from '@/shared/api/endpoints/receita-cli';
import { receita } from '@/shared/lib/forms';
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
import { ReceitaSchema } from '@/types/models/receita';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { getNomeReceitaAleatoria } from '../../lib/utils';
import { SelectCategoria } from '../inputs/select-categoria';
import { StepHeader } from '../step-header';

type FormReceitaProps = {
    onSucess: () => void;
};

export function FormReceita({ onSucess }: FormReceitaProps) {
    const randomName = useMemo(() => getNomeReceitaAleatoria(), []);
    const form = useForm<ReceitaSchema>({
        resolver: zodResolver(receita),
    });

    const onSubmit = async (data: ReceitaSchema) => {
        const resp = await criaReceita(data);
        if (resp.status === 201) {
            toast.success(`Receita '${data.descricao}' criada com sucesso!`, {
                duration: 4000,
            });
            onSucess();
        } else {
            toast.error('Erro ao criar receita, tente novamente mais tarde');
        }
    };

    return (
        <>
            <StepHeader title="Receita" backBtn />
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
                                    <Input
                                        {...field}
                                        placeholder={`ex: ${randomName}`}
                                    />
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
                                    <SelectCategoria
                                        {...field}
                                        tipoCategoria="R"
                                    />
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
