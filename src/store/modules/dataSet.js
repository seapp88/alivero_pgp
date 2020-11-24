import MiniSearch from 'minisearch'

let icons = {
    'Автоаксессуары':           'flaticon-car',
    'Аксессуары':               'flaticon-handbag',
    'Аксессуары для обуви':     'flaticon-insoles',
    'Белье':                    'flaticon-underwear',
    'Бытовая химия':            'flaticon-detergent',
    'Здоровье':                 'flaticon-cardiogram',
    'Игрушки':                  'flaticon-teddy-bear',
    'Канцелярия':               'flaticon-stationery',
    'Книги':                    'flaticon-book',
    'Красота':                  'flaticon-makeup',
    'Музыкальные инструменты':  'flaticon-guitar',
    'Обувь':                    'flaticon-boots',
    'Одежда':                   'flaticon-hanger',
    'Одежда для животных':      'flaticon-pet',
    'Оргтехника':               'flaticon-printer',
    'Питание':                  'flaticon-butter-jar',
    'Рукоделие':                'flaticon-wool',
    'Садовый инвентарь':        'flaticon-watering-can',
    'Сантехника':               'flaticon-water-tap',
    'Спортивная одежда':        'flaticon-tshirt',
    'Спортивное питание':       'flaticon-energy-drink',
    'Спортивный инвентарь':     'flaticon-dumbell',
    'Строительные инструменты': 'flaticon-driller',
    'Сувениры и подарки':       'flaticon-gift',
    'Техника для дома':         'flaticon-vacuum-cleaner',
    'Техника для кухни':        'flaticon-oven',
    'Товары для взрослых':      'flaticon-age-limit',
    'Товары для дома':          'flaticon-lamp',
    'Товары для животных':      'flaticon-pawprint',
    'Товары для кухни':         'flaticon-pan',
    'Товары для малышей':       'flaticon-baby-boy',
    'Туристический инвентарь':  'flaticon-backpack',
    'Украшения':                'flaticon-ring',
    'Хозяйственные товары':     'flaticon-mop',
    'Чехлы и багаж':            'flaticon-luggage',
    'Электроника':              'flaticon-pc',
    'Электротранспорт':         'flaticon-kick-scooter',
};

let miniSearch = new MiniSearch({
    fields: ['title', 'brand'], // fields to index for full-text search
    storeFields: ['id', 'title', 'brand', 'photo', 'company_id']
});

export default {
    namespaced: true,
    state: {
        categories: [],
        products: [],
        companies: [],



        recentProducts: [],
        templates: [],
        categorySize: [],
        sizes: [],
        stock_rack_cell_id: null,
        printer: null
    },
    getters: {
        searchProduct: state => (query, company_id) => {
            return miniSearch.search(query, { prefix: true }).filter(i => i.company_id === company_id)
        },
        categories: state => company_id => {
            let products =  state.products.filter(i => i.company_id === +company_id);
            let categories = [];
            products.forEach(i => {
                if(!categories.includes(i.category)){
                    categories.push(i.category)
                }
            });
            return categories.sort();
        },
        products: state => (company_id, category) => {
            return state.products.filter(i => i.company_id === +company_id && i.category === category);
        },
        product: state => id => {
            return state.products.filter(i => i.id === id)[0];
        },



        recentProducts: state => {
            let list = [];
            state.recentProducts.forEach(id => {
                let item = state.products.filter(i => i.id === +id)[0];
                if(item){
                    list.unshift(item)
                }
            });
            return list;
        },
        templateById: state => template_id => {
            let index = state.templates.findIndex(i => i.id === +template_id);
            return state.templates[index]
        },
        categoryById: state => category_id => {
            let index = state.categories.findIndex(i => i.id === +category_id);
            return state.categories[index]
        },
        // products: state => category_id => {
        //     return state.products.filter(i => i.category_id === +category_id);
        // },

        sizes: state => category_id => {
            if(category_id){
                return state.sizes.filter(i => i.category_id === +category_id);
            }else{
                return []
            }
        },
        sizeById: state => id => {
            let index = state.sizes.findIndex(i => i.id === +id);
            let size = state.sizes[index];
            size.text = `${size.name} (RU ${size.ru})`
            return size;
        }
    },
    mutations: {
        setState(state, data){
            state.categories = data.categories;
            state.products = data.products;
            state.companies = data.companies;

            // state.templates = data.templates;

            // state.categorySize = data.categorySize;
            // state.sizes = data.sizes;
        },
        setCell(state, data){
            state.stock_rack_cell_id = data;
        },
        setPrinter(state, data){
            state.printer = data;
        },
        addRecentProduct(state, data){
            if(state.recentProducts.includes(data)){
                state.recentProducts.push(state.recentProducts.splice(state.recentProducts.indexOf(data), 1))
            }else{
                if(state.recentProducts.length >= 12){
                    state.recentProducts.splice(11, 1)
                }
                state.recentProducts.push(data)
            }

        }

    },
    actions: {
        async setState({commit}){
            try{
                let { data } = await this.$app.$http.get('/sync');
                commit('setState', data);

                console.log(data)

                miniSearch.addAll(data.products);

                return Promise.resolve()
            }catch (e) {
                console.log(e)
                this.$app.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Не удалость получить данные!',
                });
                return Promise.reject(e)
            }
        },
        setCell({commit}, data){
            commit('setCell', data);
        },
        setPrinter({commit}, data){
            commit('setPrinter', data);
        },
        addRecentProduct({commit}, data){
            commit('addRecentProduct', data);
        }
    }
}
