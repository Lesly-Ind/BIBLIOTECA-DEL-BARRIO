import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Libro } from './entities/libro.entity';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Injectable()
export class LibrosService {
  // Al reiniciar el servidor se recuperan estos tres libros.
  private libros: Libro[] = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'García Márquez', disponible: true },
    { id: 2, titulo: 'El túnel', autor: 'Sabato', disponible: true },
    { id: 3, titulo: 'Rayuela', autor: 'Cortázar', disponible: false },
  ];
  private siguienteId = 4;

  private indiceDe(id: number): number {
    const indice = this.libros.findIndex((libro) => libro.id === id);
    if (indice === -1) throw new NotFoundException(`No existe el libro ${id}`);
    return indice;
  }

  private validar(cuerpo: Partial<CreateLibroDto>, completo: boolean): void {
    if (!cuerpo || typeof cuerpo !== 'object' || Array.isArray(cuerpo)) throw new BadRequestException('Se requiere un objeto JSON');
    const claves = Object.keys(cuerpo);
    if (claves.some((clave) => !['titulo', 'autor', 'disponible'].includes(clave))) throw new BadRequestException('Campos no permitidos');
    if (completo && ['titulo', 'autor', 'disponible'].some((clave) => !Object.prototype.hasOwnProperty.call(cuerpo, clave))) throw new BadRequestException('Faltan campos obligatorios');
    if (cuerpo.titulo !== undefined && (typeof cuerpo.titulo !== 'string' || !cuerpo.titulo.trim())) throw new BadRequestException('titulo debe ser texto no vacío');
    if (cuerpo.autor !== undefined && (typeof cuerpo.autor !== 'string' || !cuerpo.autor.trim())) throw new BadRequestException('autor debe ser texto no vacío');
    if (cuerpo.disponible !== undefined && typeof cuerpo.disponible !== 'boolean') throw new BadRequestException('disponible debe ser booleano');
  }

  listar(autor?: string): Libro[] {
    return autor === undefined ? this.libros : this.libros.filter((libro) => libro.autor.toLowerCase().includes(autor.toLowerCase()));
  }
  obtener(id: number): Libro { return this.libros[this.indiceDe(id)]; }
  crear(cuerpo: CreateLibroDto): Libro {
    this.validar(cuerpo, true);
    const nuevo: Libro = { id: this.siguienteId++, titulo: cuerpo.titulo, autor: cuerpo.autor, disponible: cuerpo.disponible };
    this.libros.push(nuevo);
    return nuevo;
  }
  reemplazar(id: number, cuerpo: CreateLibroDto): Libro {
    const indice = this.indiceDe(id);
    this.validar(cuerpo, true);
    const reemplazo: Libro = { id, titulo: cuerpo.titulo, autor: cuerpo.autor, disponible: cuerpo.disponible };
    this.libros[indice] = reemplazo;
    return reemplazo;
  }
  modificar(id: number, cambios: UpdateLibroDto): Libro {
    const indice = this.indiceDe(id);
    this.validar(cambios, false);
    this.libros[indice] = { ...this.libros[indice], ...cambios };
    return this.libros[indice];
  }
  eliminar(id: number): void { this.libros.splice(this.indiceDe(id), 1); }
}
