import { JsonValue } from '../types';
import JsonTreeNode from './JsonTreeNode';

interface JsonExplorerProps {
  data: JsonValue;
  selectedPath: string | null;
  selectedValue: JsonValue | null;
  selectedType: string | null;
  handleNodeClick: (path: string, value: JsonValue, type: string) => void;
}

const JsonExplorer: React.FC<JsonExplorerProps> = ({
  data,
  selectedPath,
  selectedValue,
  selectedType,
  handleNodeClick
}) => {
  // Helper to safely display values as strings
  const displayValue = (value: JsonValue | null): string => {
    if (value === null) return 'null';
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  return (
    <div className="json-explorer">
      <div className="tree-container">
        <JsonTreeNode
          data={data}
          name="root"
          path="$"
          onNodeClick={handleNodeClick}
        />
      </div>

      <div className="selected-info">
        {selectedPath && (
          <>
            <div className="path-display">
              <p>
                Path: <code>{selectedPath}</code>
              </p>
            </div>
            <div className="type-display">
              <p>
                Type: <span>{selectedType}</span>
              </p>
            </div>
            {selectedValue !== undefined &&
              selectedType !== 'object' &&
              selectedType !== 'array' && (
                <div className="value-display">
                  <pre>{displayValue(selectedValue)}</pre>
                </div>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default JsonExplorer;
