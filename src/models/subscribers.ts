import { getPool } from "../db/db";

export class Subscriber {
  static async findAll() {
    const result = await getPool().query("SELECT * FROM subscriber");
    return result.rows;
  }

  static async findSubscriber(id: string) {
    const values = [id];
    const result = await getPool().query(
      "SELECT * FROM subscriber WHERE id = $1",
      values
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async updateSubscriber(
    id: string,
    data: { name: string; last_name: string; email: string; phone: string }
  ) {
    const { name, last_name, email, phone } = data;
    const values = [name, last_name, email, phone, id];
    const result = await getPool().query(
      `UPDATE subscriber
        SET name = $1, last_name = $2, email = $3, phone = $4
        WHERE id = $5
        RETURNING *`,
      values
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  //2. Erstellt eine Route, die es ermöglicht, E-Mail-Adressen zu speichern. (CREATE)
  static async createSubscriber(data: {
    name: string;
    last_name: string;
    email: string;
    phone: string;
  }) {
    const { name, last_name, email, phone } = data;
    const values = [name, last_name, email, phone];

    const result = await getPool().query(
      `INSERT INTO subscriber (name, last_name, email, phone)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      values
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  //3. Erstellt eine Route, die es ermöglicht, E-Mail-Adressen abzurufen. (READ)
  static async findAllEmail() {
    const result = await getPool().query("SELECT email FROM subscriber");

    return result.rows;
  }

  static async deleteSubscriber(id: string) {
    const values = [id];
    const result = await getPool().query(
      "DELETE FROM subscriber WHERE id = $1 RETURNING *",
      values
    );

    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    }
  }
}
