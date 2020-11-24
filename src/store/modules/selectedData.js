export default {
    namespaced: true,
    state: {
        colors: [],
        articles: null,
        sizeCategory: null,
        size: null,
        tags: []
    },
    getters: {
        isColorActive: state => id => {
            return state.colors.includes(id);
        },
        isTagActive: state => id => {
            return state.tags.includes(id);
        },
    },
    mutations: {

        clearState(state){
            state.colors = [];
            state.sizeCategory = null;
            state.size = null;
            state.articles = null,
            state.tags = [];
        },
        setArticles(state, data){
            state.articles = data
            console.log(data)
        },
        setColor(state, color_id){
            if(!state.colors.includes(color_id)){
                if(state.colors.length < 6){
                    state.colors.push(color_id)
                }
            }else{
                let index = state.colors.findIndex(i => i === color_id);
                if(index >= 0){
                    state.colors.splice(index, 1);
                }
            }
        },
        setSizeCategory(state, size_category_id){
            state.sizeCategory = size_category_id;
        },
        setSize(state, size_id){
            state.size = size_id;
        },
        setTag(state, tag_id){
            if(!state.tags.includes(tag_id)){
                state.tags.push(tag_id)
            }else{
                let index = state.tags.findIndex(i => i === tag_id);
                if(index >= 0){
                    state.tags.splice(index, 1);
                }
            }
        },
    },
    actions: {



        clearState({commit}){
            commit('clearState');
        },
        setStateConnect({commit}, val){
            commit('setStateConnect', val);
        },
        setArticles({commit}, data){
            commit('setArticles', data)
        },
        setColor({commit}, color_id){
            commit('setColor', color_id)
        },
        setSizeCategory({commit}, size_category_id){
            commit('setSizeCategory', size_category_id);
        },
        setSize({commit}, size_id){
            commit('setSize', size_id);
        },
        setTag({commit}, id){
            commit('setTag', id)
        },
    },
}
