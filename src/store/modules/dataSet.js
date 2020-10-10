

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

const sortColor = (collections) => {

    collections = Object.assign([], collections);
    const sorted = [collections.shift()];

    while(collections.length) {
        const [a] = sorted, c = { d: Infinity };

        for(let [i, b] of Object.entries(collections)) {
            const average = Math.floor((
                Math.abs(a.r - b.r) +
                Math.abs(a.g - b.g) +
                Math.abs(a.b - b.b)
            ) / 3);

            if(average < c.d) {
                Object.assign(c, { d: average, i: i });
            }
        }

        sorted.unshift(collections.splice(c.i, 1)[0]);
    }

    console.log(sorted.reverse())

    return sorted.reverse();

    // let colors = collections.map(i => i.hex);
    //
    // let colorsSorted = hexSorter.sortColors(colors, 'mostBrightColor');
    //
    // let output = colorsSorted.map(hex => {
    //     let index = collections.findIndex(i => i.hex === hex);
    //     if(index >= 0){
    //         return collections[index]
    //     }else{
    //         console.log('Not found color ' , hex)
    //     }
    // });
    return output;
};

export default {
    namespaced: true,
    state: {
        recentProducts: [],
        specifications: [],
        categories: [],
        products: [],
        colorsPopulate: [],
        colors: [],
        categorySize: [],
        sizes: [],
        tags: []
    },
    getters: {
        specificationById: state => specification_id => {
            let index = state.specifications.findIndex(i => i.id === specification_id);
            return state.specifications[index]
        },
        categories: state => specification_id => {
            return state.categories.filter(i => i.specification_id === specification_id);
        },
        categoryById: state => category_id => {
            let index = state.categories.findIndex(i => i.id === category_id);
            return state.categories[index]
        },
        products: state => category_id => {
            return state.products.filter(i => i.category_id === category_id);
        },
        product: state => id => {
            return state.products.filter(i => i.id === id)[0];
        },
        sizes: state => category_id => {
            if(category_id){
                return state.sizes.filter(i => i.category_id === category_id);
            }else{
                return []
            }
        },
        colorById: state => id => {
            let index = state.colors.findIndex(i => i.id === id);
            return state.colors[index];
        },
        sizeById: state => id => {
            let index = state.sizes.findIndex(i => i.id === id);
            let size = state.sizes[index];
            size.text = `${size.name} (RU ${size.ru})`
            return size;
        },
        tagById: state => id => {
            let index = state.tags.findIndex(i => i.id === id);
            return state.tags[index];
        },
    },
    mutations: {
        setState(state, data){
            state.specifications = data.specifications;
            state.categories = data.categories;
            state.products = data.products;
            state.colorsPopulate = data.colorsPopulate;
            state.colors = sortColor(data.colors.reduce((m, e) => (m.push(Object.assign(e, {
                r: parseInt(e.hex.substring(1, 3), 16) || 0,
                g: parseInt(e.hex.substring(3, 5), 16) || 0,
                b: parseInt(e.hex.substring(5, 7), 16) || 0
            })), m), []));
            state.categorySize = data.categorySize;
            state.sizes = data.sizes;
            state.tags = data.tags;
        }
    },
    actions: {
        async setState({commit}){
            try{
                let { data } = await this.$app.$http.get('/tablet ');

                data.specifications = data.specifications.map(i => {
                    if(icons[i.name]){
                        i.icon = icons[i.name]
                    }else{
                        i.icon = 'flaticon-more'
                    }
                    return i
                });
                commit('setState', data)
                return Promise.resolve()
            }catch (e) {
                this.$app.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Не удалость получить данные!',
                });
                return Promise.reject(e)
            }
        }
    }
}
