'use client';
import { ItemGasto } from '@/entities/item-gasto.tsx/ui';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Despesa } from '@/types/models/despesa';
import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { GastosContext } from '../lib/context';

type GastosListaProps = {
    despesas: Despesa[];
};

export function GastosLista({ despesas }: GastosListaProps) {
    const { categoriaSelecionada } = useContext(GastosContext);
    const despesasFiltradas = despesas.filter(
        (despesa) =>
            !categoriaSelecionada ||
            despesa.categoria.sigla === categoriaSelecionada.sigla,
    );

    return (
        <div className=" flex-col gap-4">
            <ScrollArea className="h-44 pr-3">
                <div className="flex w-52 flex-col gap-3">
                    <AnimatePresence>
                        {despesasFiltradas.map((despesa) => (
                            <ItemGasto
                                key={despesa.id}
                                gasto={despesa}
                                prefixLayoutId="dashboard"
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </ScrollArea>
        </div>
    );
}
