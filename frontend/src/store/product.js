import {create} from "zustand";

export const userProductStore = create((set) => ({
    products: [],
    setProducts: (product) => set({ products }),
    createProdcut: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {sucess:false, message: "Please fill in all fields"};
        } 

        
    }
}));