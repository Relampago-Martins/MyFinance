import { deleteDespesa, getDespesa } from '@/shared/api/endpoints/despesa-cli';
import { numberToCurrency, toLocalDate } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { TradeDownIcon } from '@/shared/ui/huge-icons/gasto';
import { Despesa } from '@/types/models/despesa';
import { CalendarIcon, CheckCheck, CreditCardIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMovimentacaoContext } from '../../lib/use-movimentacao-context';

type DespesaDetailContext = {
    id: number;
};

export function DespesaDetail({ id }: DespesaDetailContext) {
    const router = useRouter();
    const { setMovimentacaoSelecionada } = useMovimentacaoContext();
    const [despesa, setDespesa] = useState<Despesa | null>(null);
    useEffect(() => {
        getDespesa(id).then((despesa) => {
            setDespesa(despesa);
        });
    }, [id]);

    if (!despesa) return null;
    return (
        <div className="flex flex-col gap-4">
            <div className="mb-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-fit rounded-full bg-red-200/50 p-1 dark:bg-red-700">
                        <TradeDownIcon className="h-6 w-6 text-red-700 dark:text-red-200" />
                    </div>
                    <h2 className="text-xl">{despesa.descricao}</h2>
                </div>
                <h2 className=" text-xl">{numberToCurrency(despesa.valor)}</h2>
            </div>
            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    {despesa.pago ? (
                        <>
                            <CheckCheck className="h-6 w-6 text-green-700" />
                            <span className="text-sm text-muted-foreground">
                                Pago
                            </span>
                        </>
                    ) : (
                        <>
                            <XIcon className="h-6 w-6 text-red-700" />
                            <span className="text-sm text-muted-foreground">
                                Não foi pago
                            </span>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="h-6 w-6 rounded-full"
                        style={{ backgroundColor: despesa.categoria.cor }}
                    ></div>
                    <span className="text-sm text-muted-foreground">
                        {despesa.categoria.nome}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <CreditCardIcon className="h-6 w-6" />
                <div className="flex flex-col">
                    <div className="text-xs text-muted-foreground">
                        Forma de pagamento
                    </div>
                    <span className="text-base">
                        {despesa.forma_pagamento.nome}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <CalendarIcon className="h-6 w-6" />
                <div className="flex flex-col">
                    <div className="text-xs text-muted-foreground">
                        Comprado em
                    </div>
                    <span className="text-base">
                        {toLocalDate(new Date(despesa.data))}
                    </span>
                </div>
            </div>

            <div className="mt-2 flex items-center justify-end gap-2">
                <Button
                    variant={'destructive'}
                    onClick={() => {
                        deleteDespesa(id).then(() => {
                            setMovimentacaoSelecionada(undefined);
                            router.refresh();
                        });
                    }}
                >
                    Excluir
                </Button>
                <Button variant={'outline'} onClick={() => {}}>
                    Editar
                </Button>
            </div>
        </div>
    );
}
