import { JsonValue } from '../types';
import JsonTreeNode from './JsonTreeNode';
import { displayValue } from '../helpers';

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
