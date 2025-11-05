import { CategoriaService} from "../services/categoriaServices";
import { Request, Response } from "express";
import {Categoria} from "../models/categorias"

const categoriaService = new CategoriaService();

export async function createCategoria(req: Request, res: Response): Promise<Response> {
  try {
    const categoriaData: Partial<any> = req.body;
    const newCategoria = await categoriaService.createCategoria(categoriaData);
    return res.status(201).json(newCategoria);
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }

}

export const getAllCategorias = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, Math.min(50, parseInt(req.query.limit as string) || 3));
    const skip = (page - 1) * limit;

    const [total, categorias] = await Promise.all([
      Categoria.countDocuments(),
      Categoria.find()
        .skip(skip)
        .limit(limit)
        .populate('eventos') // 🔹 Poblamos los eventos asociados
        .lean()
    ]);

    res.status(200).json({
      data: categorias,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error al obtener categorías', error });
  }
};
export async function getCategoriaById(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const categoria = await categoriaService.getCategoriaById(id);
    if (!categoria) return res.status(404).json({ message: 'CATEGORIA NO ENCONTRADA' });
    return res.status(200).json(categoria);
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  } 
}
export async function deleteCategoriaById(req: Request, res: Response): Promise<Response> {
    try {   
    const { id } = req.params;
    const deletedCategoria = await categoriaService.deleteCategoriaById(id);
    if (!deletedCategoria) return res.status(404).json({ message: 'CATEGORIA NO ENCONTRADA' });
    return res.status(200).json(deletedCategoria);
    } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
    }
}

export async function updateCategoria(req: Request, res: Response): Promise<Response> {
    try {
    const { id } = req.params;
    const categoriaData: Partial<any> = req.body;
    const updatedCategoria = await categoriaService.updateCategoria(id, categoriaData);
    if (!updatedCategoria){
     return res.status(404).json({ message: 'CATEGORIA NO ENCONTRADA' });
    }
    return res.status(200).json(updatedCategoria);
    } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
    }
}

export async function addEventoToCategoria(req: Request, res: Response): Promise<Response> {
    try {
    const { id } = req.params;
    const { eventoId } = req.body;
        
    if (!eventoId) return res.status(400).json({ message: 'Falta eventoId' });
        
    const updated = await categoriaService.addEventoToCategoria(id, eventoId);
    if (!updated) return res.status(404).json({ message: 'CATEGORIA NO ENCONTRADA' });
    return res.status(200).json(updated);
    }
    catch (error) {
    return res.status(400).json({ message: (error as Error).message });
    }
}

