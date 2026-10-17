import { CreateLibroDto } from './create-libro.dto';
// Para PATCH, todos los campos son opcionales.
export class UpdateLibroDto implements Partial<CreateLibroDto> {
  titulo?: string;
  autor?: string;
  disponible?: boolean;
}
