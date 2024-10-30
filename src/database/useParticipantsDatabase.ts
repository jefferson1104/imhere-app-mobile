import { useSQLiteContext } from "expo-sqlite";

export interface ParticipantsDatabase {
  id: number;
  name: string;
  eventId: number;
};

export function useParticipantsDatabase() {
  const database = useSQLiteContext();

  async function createParticipant(data: Omit<ParticipantsDatabase, "id">) {
    const query = await database.prepareAsync(
      "INSERT INTO Participants (name, event_id) VALUES ($name, $eventId)"
    );

    try {
      const result = await query.executeAsync({
        $name: data.name,
        $eventId: data.eventId,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();

      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await query.finalizeAsync();
    }
  };

  async function listParticipants(eventId: number) {
    const query = "SELECT * FROM Participants WHERE event_id = ?"

    try {
      const result = await database.getAllAsync(query, [eventId]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  async function deleteParticipant(id: number) {
    const query = await database.prepareAsync(
      "DELETE FROM Participants WHERE id = $id"
    );

    try {
      await query.executeAsync({
        $id: id,
      });
    } catch (error) {
      throw error;
    }
  };

  return { createParticipant, listParticipants, deleteParticipant};
}
