import state from './state';

export default {
    getDataRequest(state){
        const requestGet = localStorage.getItem('requestList');
        state.request ? JSON.parse(requestGet) : [];
    },
    buttonTeste(state, stateLink){
        return stateLink
    }
};