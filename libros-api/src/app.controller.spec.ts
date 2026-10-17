import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
describe('AppController', () => {
  it('debe presentar la API', async () => {
    const modulo = await Test.createTestingModule({ controllers: [AppController], providers: [AppService] }).compile();
    expect(modulo.get(AppController).getHello()).toContain('Biblioteca');
  });
});
