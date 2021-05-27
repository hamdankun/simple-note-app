/** @format */

import http from '@libraries/http';

import apiConfig from '@config/api'

const httpClient = http(apiConfig.service.main);

export type NoteData = {
    createdAt: string,
    updatedAt: string,
    _id: string,
    __v: number,
    detail: string,
    title: string,
    tags?: Array<string>
}

export type NoteResponse = {
    success: boolean,
    data: Array<NoteData>
}

export type NoteCreateAndUpdateBody = {
    title: string,
    detail: string
}

export type NoteCreateUpdateDeleteResponse = {
    success: boolean,
    data: {[key:string]:any},
    message: string
}

export const noteGetListService = (): Promise<NoteResponse> =>
    httpClient.getHttpRequest<NoteResponse>('api/v1/notes/all');

export const noteCreateDataService = (body: NoteCreateAndUpdateBody): Promise<NoteCreateUpdateDeleteResponse> =>
    httpClient.postHttpRequest<NoteCreateUpdateDeleteResponse>('api/v1/notes/all', body);

export const noteUpdateDataService = (id: string, body: NoteCreateAndUpdateBody): Promise<NoteCreateUpdateDeleteResponse> =>
    httpClient.putHttpRequest<NoteCreateUpdateDeleteResponse>(`api/v1/notes/all/${id}`, body);

export const noteDeleteDataService = (id: string): Promise<NoteCreateUpdateDeleteResponse> =>
    httpClient.deleteHttpRequest<NoteCreateUpdateDeleteResponse>(`api/v1/notes/all/${id}`);