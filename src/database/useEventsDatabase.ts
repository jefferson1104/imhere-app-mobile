import { useSQLiteContext } from "expo-sqlite";

export interface EventDatabase {
  id: number;
  name: string;
  date: string;
}

export function useEventsDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<EventDatabase, "id">) {
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

  async function listAll() {
    const query = "SELECT * FROM events"

    try {
      const result = await database.getAllAsync(query);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return { create, listAll };
}
