import { Categoria, ICategoria } from '../models/categorias';

export class CategoriaService {
  async createCategoria(data: Partial<ICategoria>): Promise<ICategoria> {
    const cat = new Categoria(data);
    return await cat.save();
  } 
    async getAllCategorias(): Promise<ICategoria[]> {   
    return await Categoria.find();
    }
    async getCategoriaById(id: string): Promise<ICategoria | null> {
    return await Categoria.findById(id);
    }   

    async deleteCategoriaById(id: string): Promise<ICategoria | null> {
    return await Categoria.findByIdAndDelete(id);
    }
    async updateCategoria(id: string, data: Partial<ICategoria>): Promise<ICategoria | null> {
    return await Categoria.findByIdAndUpdate(id, data, { new: true });
    }

    async addEventoToCategoria(categoriaId: string, eventoId: string): Promise<ICategoria | null> {
    return await Categoria.findByIdAndUpdate(
      categoriaId,
      { $addToSet: { eventos: eventoId } },
      { new: true }
    );
    }

}
