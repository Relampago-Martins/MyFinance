'use server';

import { Despesa, DespesaConfig } from "@/types/models/despesa";
import { ApiClient } from "../api-client";

export async function getDespesas(){
    const resp = await ApiClient.getInstance().get<Despesa[]>("/despesas/");
    return resp.data;
}

export async function getDespesa(id: number){
    const resp = await ApiClient.getInstance().get<Despesa>(`/despesas/${id}/`);
    return resp.data;
}

export async function criaDespesa(despesa: Despesa){
    const resp = await ApiClient.getInstance().post<Despesa>("/despesas/", despesa);
    return resp.data;
}

export async function getDespesaConfigs(){
    const resp = await ApiClient.getInstance().get<DespesaConfig>("/despesas/configs/");
    return resp.data;
}