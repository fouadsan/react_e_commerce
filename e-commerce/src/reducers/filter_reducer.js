import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS, 
} from '../actions'

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((prod) => prod.price);
      maxPrice = Math.max(...maxPrice)

      return ({...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {...state.filters, max_price: maxPrice, price: maxPrice}
      })

    case SET_GRIDVIEW:
      return ({...state, grid_view: true})
    
    case SET_LISTVIEW:
      return ({...state, grid_view: false})

    case UPDATE_SORT:
      return ({...state, sort: action.payload})

      case SORT_PRODUCTS:
        const {sort, filtered_products} = state
        let tempProducts = [...filtered_products]
        if (sort === "price-lowest") {
          tempProducts = tempProducts.sort((a, b) => a.price - b.price)
        }
        if (sort === "price-heighest") {
          tempProducts = tempProducts.sort((a, b) => b.price - a.price)
        }
        if (sort === "name-a") {
          tempProducts = tempProducts.sort((a, b) => {
            return (a.name.localeCompare(b.name))
          })
        }
        if (sort === "name-z") {
          tempProducts = tempProducts.sort((a, b) => {
            return (b.name.localeCompare(a.name))
          })
        }
        return ({...state, filtered_products: tempProducts})
      
      case UPDATE_FILTERS:
        const {name, value} = action.payload
        return (
          {...state, filters:{...state.filters, [name]: value}}
          )
      
      case FILTER_PRODUCTS:
        const {all_products} = state
        const {text, category, company, color, price, shipping} = state.filters
        let tempProds = [...all_products]
        // filtering
        // text
        if (text) {
          tempProds = tempProds.filter((product) => {
            return product.name.toLowerCase().startsWith(text)
          })
        }
        // category
        if (category !== "all") {
          tempProds = tempProds.filter((product) => product.category === category )
        }
        // company
        if (company !== "all") {
          tempProds = tempProds.filter(product => product.company === company)
        }
        // color
        if (color !== "all") {
          tempProds = tempProds.filter((product) => {
            return product.colors.find((col)=> col === color)
          })
        }
        // price
        tempProds = tempProds.filter((product) => product.price <= price)

        // shipping
        if (shipping) {
          tempProds = tempProds.filter((product) => product.shipping === true)
        }

        return ({...state, filtered_products: tempProds})

      case CLEAR_FILTERS:
        return(
          {...state, filters: {
              ...state.filters,
              text: "",
              category: "all",
              company: "all",
              color: "all",
              price: state.filters.max_price,
              shipping: false,
          }}
        )

    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default filter_reducer
