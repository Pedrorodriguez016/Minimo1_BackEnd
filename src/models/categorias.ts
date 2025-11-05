import { Schema, model, Types } from 'mongoose';
import { IEvento } from './evento';

export interface ICategoria {
  _id: Types.ObjectId;
  nombre: string;
  eventos?: Types.ObjectId[] | IEvento[];
}
const categoriaSchema = new Schema<ICategoria>({
  nombre: { type: String, required: true, unique: true },
  eventos: [{ type: Schema.Types.ObjectId, ref: 'Evento', default: [] }]
}, { timestamps: false, versionKey: false });
export const Categoria = model<ICategoria>('Categoria', categoriaSchema);
export default Categoria;
