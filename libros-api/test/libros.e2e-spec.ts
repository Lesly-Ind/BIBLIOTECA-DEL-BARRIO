import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
describe('Biblioteca (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => { const m = await Test.createTestingModule({ imports: [AppModule] }).compile(); app = m.createNestApplication(); await app.init(); });
  afterAll(async () => { await app.close(); });
  it('GET lista', () => request(app.getHttpServer()).get('/libros').expect(200));
  it('GET inexistente', () => request(app.getHttpServer()).get('/libros/99').expect(404));
  it('POST crea y devuelve Location', () => request(app.getHttpServer()).post('/libros').send({titulo:'Pedro Páramo',autor:'Rulfo',disponible:true}).expect(201).expect('Location','/libros/4'));
  it('PUT reemplaza', () => request(app.getHttpServer()).put('/libros/1').send({titulo:'Libro nuevo',autor:'Autora',disponible:true}).expect(200));
  it('PATCH modifica', () => request(app.getHttpServer()).patch('/libros/2').send({disponible:false}).expect(200));
  it('DELETE elimina', () => request(app.getHttpServer()).delete('/libros/3').expect(204));
});
