import { take, put, call, fork } from 'redux-saga/effects';
import * as actions from '../actions';
import * as makeData from '../config/queries/makeData';
import * as yearData from '../config/queries/yearData';
import * as modelData from '../config/queries/modelData';
import * as componentData from '../config/queries/componentData';
import { createClient } from '../config';

let queryData = [];

function fetchDataApi(thread) {
    return new Promise(function(resolve, reject) {
        thread.on('thread:message', function(data) {
                queryData = data;
        })
        thread.on('thread:notDirtyData', function() {
            resolve(queryData);
        });
        thread.on('thread:exeption', function(error) {
            reject(error);
        })
    })
}

function getQuery(client, source, queryConfig) {
    return client.createQuery(
        source,
        queryConfig
    )
}

function getThread(client, query) {
    return client.run(query);
}

function* fetchMakeData (client, source, queryConfig) {
    if (!MakeDataQuery) {
        const query = yield call(getQuery, client, source, queryConfig);
        MakeDataQuery = query;
    }
    yield put(actions.requestMakeData(makeData.source));
    if (!MakeDataThread) {
        const thread = yield call(getThread, client, MakeDataQuery);
        MakeDataThread = thread;
    }
    const data = yield call(fetchDataApi, MakeDataThread);
    yield put(actions.receiveMakeData(data));
}

function* fetchYearData (client, source, queryConfig) {
    if (!YearDataQuery) {
        const query = yield call(getQuery, client, source, queryConfig);
        YearDataQuery = query;
    }
    yield put(actions.requestYearData(yearData.source));
    if (!YearDataThread) {
        const thread = yield call(getThread, client, YearDataQuery);
        YearDataThread = thread;
    }
    const data = yield call(fetchDataApi, YearDataThread);
    yield put(actions.receiveYearData(data));
}

function* fetchModelData (client, source, queryConfig) {
    if (!ModelDataQuery) {
        const query = yield call(getQuery, client, source, queryConfig);
        ModelDataQuery = query;
    }
    yield put(actions.requestModelData(modelData.source));
    if (!ModelDataThread) {
        const thread = yield call(getThread, client, ModelDataQuery);
        ModelDataThread = thread;
    }
    const data = yield call(fetchDataApi, ModelDataThread);
    yield put(actions.receiveModelData(data));
}

function* changeModelDataQuery(getState) {
    while(true) {
        const source = getState().chartData.modelData.source;
        yield take(actions.CHANGE_MODEL_DATA_QUERY);
        yield fork(fetchModelData, ModelDataThread);
    }
}

function* fetchComponentData (client, source, queryConfig) {
    if (!ComponentDataQuery) {
        const query = yield call(getQuery, client, source, queryConfig);
        ComponentDataQuery = query;
    }

    yield put(actions.requestComponentData(componentData.source));
    if (!ComponentDataThread) {
        const thread = yield call(getThread, client, ComponentDataQuery);
        ComponentDataThread = thread;
    }
    const data = yield call(fetchDataApi, ComponentDataThread);
    yield put(actions.receiveComponentData(data));
}

function* changeComponentDataQuery(getState) {
    while(true) {
        const source = getState().chartData.componentData.source;
        yield take(actions.CHANGE_COMPONENT_DATA_QUERY);
        yield fork(fetchComponentData, ComponentDataThread);
    }
}

function* startup(client) {
    yield fork(fetchMakeData, client, makeData.source, makeData.queryConfig);
    yield fork(fetchYearData, client, yearData.source, yearData.queryConfig);
    yield fork(fetchModelData, client, modelData.source, modelData.queryConfig);
    yield fork(fetchComponentData, client, componentData.source, componentData.queryConfig);
}

export default function* root(getState) {
    const client = yield call(createClient);
    ZoomdataClient = client;
    yield fork(startup, ZoomdataClient);
    yield fork(changeModelDataQuery, getState);
    yield fork(changeComponentDataQuery, getState);
}
export let ZoomdataClient = undefined;
export let MakeDataQuery = undefined;
export let MakeDataThread = undefined;
export let YearDataQuery = undefined;
export let YearDataThread = undefined;
export let ModelDataQuery = undefined;
export let ModelDataThread = undefined;
export let ComponentDataQuery = undefined;
export let ComponentDataThread = undefined;