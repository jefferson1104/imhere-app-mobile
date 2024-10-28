import { useSQLiteContext } from "expo-sqlite";

export interface EventDatabase {
  id: number;
  name: string;
  date: string;
  status: string;
};

export function useEventsDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<EventDatabase, "id" | "status">) {
    const query = await database.prepareAsync(
      "INSERT INTO events (name, date) VALUES ($name, $date)"
    );

    try {
      const result = await query.executeAsync({
        $name: data.name,
        $date: data.date,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();

      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await query.finalizeAsync();
    }
  };

  async function updateById(data: EventDatabase) {
    const query = await database.prepareAsync(
      "UPDATE events SET name = $name, date = $date, status = $status WHERE id = $id"
    );

    try {
      await query.executeAsync({
        $id: data.id,
        $name: data.name,
        $date: data.date,
        $status: data.status,
      });
    } catch (error) {
      throw error;
    } finally {
      await query.finalizeAsync();
    }
  };

  async function listAll() {
    const query = "SELECT * FROM events ORDER BY date ASC"

    try {
      const result = await database.getAllAsync(query);
      return result;
    } catch (error) {
      throw error;
    }
  };

  async function listById(id: number) {
    const query = "SELECT * FROM events WHERE id = ?"

    try {
      const result = await database.getAllAsync(query, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  async function listByStatus(status: string) {
    const query = "SELECT * FROM events WHERE status LIKE ? ORDER BY date ASC"

    try {
      const result = await database.getAllAsync(query, `%${status}%`);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return { create, updateById, listAll, listById, listByStatus };
}
