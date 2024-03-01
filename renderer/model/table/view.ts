// Authors: Florian Jahn, Andre Löwen

export type ColumnDefinition<K extends string> = {
  field: K;
  headerName: string;
  width?: number;
};

export type ColumnDefinitions<K extends string> = Array<ColumnDefinition<K>>;

/**
 *
 */
export type RowDefinition<T extends ColumnDefinition<string>[]> = T extends
  | ColumnDefinitions<infer K>
  | ColumnDefinition<infer K>
  ? Record<K, any>[]
  : never;

/**
 * @author Andre Löwen, Florian Jahn
 * @param field the id of the column
 * @param headerName The name which is displayed in UI
 * @param width The width of the column
 */
export function createColumnDefinition<K extends string>(
  field: K,
  headerName: string,
  width: number
): ColumnDefinition<K> {
  return {
    field,
    headerName,
    width
  };
}
