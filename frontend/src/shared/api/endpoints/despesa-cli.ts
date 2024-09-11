'use server';

import { Despesa, DespesaConfig, DespesaSchema } from "@/types/models/despesa";
import { ApiClient } from "../api-client";

export async function getDespesas(){
    const resp = await ApiClient.getInstance().get<Despesa[]>("/despesas/");
    return resp.data.map((despesa) => {
        return {
            ...despesa,
            valor: parseFloat(despesa.valor.toString()),  // garante que o valor é sempre um número  
        }
    });
}

export async function getDespesa(id: number){
    const resp = await ApiClient.getInstance().get<Despesa>(`/despesas/${id}/`);
    return resp.data;
}

export async function criaDespesa(despesa: DespesaSchema){
    const resp = await ApiClient.getInstance().post<Despesa>("/despesas/", despesa);
    return resp;
}

export async function getDespesaConfigs(){
    const resp = await ApiClient.getInstance().options<DespesaConfig>("/despesas/",{
        cache: "force-cache",
    });
    return resp.data;
}