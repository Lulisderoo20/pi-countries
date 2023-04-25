// se podria hacer un import desde las action types, es una buena practica pero no decidi usarla 

const initialState = {
    countries: [],
    allCountries: [],
    allActivities: [],
    activities: [],
    detail: {}
};

//funciones de reducer 

function rootReducer (state = initialState, action){
    switch(action.type) {
        case "GET_COUNTRIES":
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case "FILTER_COUNTRIES":
            const allCountries = state.allCountries
            const continentFiltered = action.payload === "All" ? allCountries : allCountries.filter(e => e.continent === action.payload)
            return{
                ...state,
                countries: continentFiltered
            }
        case "ORDER_COUNTRIES_ALF":
            let sortedArr = action.payload === "asc" ?
            state.countries.sort(function (a, b) {
                if(a.name > b.name) {
                    return 1
                }
                if(b.name > a.name) {
                    return -1
                }
                return 0
            }) :
            state.countries.sort(function (a, b) {
                if(a.name > b.name) {
                    return -1
                }
                if(b.name > a.name) {
                    return 1
                }
                return 0
            })    
            return {
                ...state,
                countries: sortedArr
            }
        case "ORDER_COUNTRIES_POP":
                let sortedArrPop = action.payload === "mayp" ?
                state.countries.sort(function (a, b) {
                    if(a.population > b.population) {
                        return 1
                    }
                    if(b.population > a.population) {
                        return -1
                    }
                    return 0
                }) :
                state.countries.sort(function (a, b) {
                    if(a.population > b.population) {
                        return -1
                    }
                    if(b.population > a.population) {
                        return 1
                    }
                    return 0
                })    
                return {
                    ...state,
                    countries: sortedArrPop
            }
        case "GET_COUNTRY_DETAIL":
            return{
                ...state,
                detail: action.payload
            }
        case "ADD_TOURIST_ACTIVITIES":
            return {
                ...state,
            }           
        case "GET_TOURIST_ACTIVITIES":
            return{
                ...state,
                allActivities: action.payload
            }
        case "GET_COUNTRIES_QUERY":
            return{
                ...state,
                countries: action.payload
            }
        case "FILTER_BY_ACTIVITIES":
            const allCountries2 = state.allCountries;

            const solo = allCountries2.filter((pais) => {
             return pais.Activities.length > 0;
             });

            let array = [];

            for (let i = 0; i < solo.length; i++) { //for para recorrer uno a uno cada elemento
            for (let j = 0; j < solo[i].Activities.length; j++) { // dentro de cada elemento recorer las activities que recibe como [] 
             if (solo[i].Activities[j].name === action.payload) { //si las encuentra pushea lo que encontro
                   array.push(solo[i]);
                 }
                }
                }
            const filtro = action.payload === "Todos" ? allCountries2 : array;

            return {
                 ...state,
                 countries: filtro,
        }
        case "GET_COUNTRIES_BY_NAME":
           
            let nombre = action.payload === "" ? state.allCountries : state.countries.filter((e) => e.name.toLowerCase().includes(action.payload.toLowerCase()))
      
            return{
                ...state,
                countries: nombre
                
            }    
        default:
            return state;
    
    }

}

export default rootReducer;