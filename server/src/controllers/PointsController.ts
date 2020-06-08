import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', 'LIKE', String(city))
      .where('uf', 'LIKE', String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = points.map(point => ({
      ...point,
      phone_number: String(Math.trunc(point.phone_number)),
      image_url: `http://${process.env.HOST}:${process.env.PORT}/uploads/${point.image}`,
    }));

    return response.json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ message: 'Point not found' });
    }

    const serializedPoint = {
      ...point,
      phone_number: String(Math.trunc(point.phone_number)),
      image_url: `http://${process.env.HOST}:${process.env.PORT}/uploads/${point.image}`,
    };

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return response.json({ point: serializedPoint, items });
  }

  async store(request: Request, response: Response) {
    const {
      name,
      email,
      phone_number,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const trx = await knex.transaction();

    const file = request.file;

    const point = {
      image: file ? file.filename : `no-image.png`,
      name,
      email,
      phone_number,
      latitude,
      longitude,
      city,
      uf,
    };

    const [point_id] = await trx('points').insert(point);

    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => ({
        item_id,
        point_id,
      }));

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return response.json({ id: point_id, ...point });
  }
}

export default PointsController;
