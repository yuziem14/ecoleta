import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => ({
      id: item.id,
      title: item.title,
      image_url: `http://127.0.0.1:3333/uploads/${item.image}`,
    }));

    return response.json(serializedItems);
  }
}

export default ItemsController;
