import { useState } from 'react';
import { JsonValue } from '../types';

interface JsonTreeNodeProps {
  data: JsonValue;
  name: string;
  path: string;
  onNodeClick: (path: string, value: JsonValue, type: string) => void;
}

const JsonTreeNode: React.FC<JsonTreeNodeProps> = ({
  data,
  name,
  path,
  onNodeClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine the type of the data
  const getType = (value: JsonValue): string => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  };

  const type = getType(data);
  const isExpandable = type === 'object' || type === 'array';

  // Toggle expand/collapse for objects and arrays
  const toggleExpand = () => {
    if (isExpandable) {
      setIsExpanded(!isExpanded);
    }
  };

  // Handle node click to show path
  const handleNodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNodeClick(path, data, type);
  };

  // TODO: Implement rendering for different data types
  // TODO: Add logic to render child nodes when expanded

  return (
    <div className="json-node">
      {/* Implement your node rendering logic here */}
      <div className="node-header" onClick={toggleExpand}>
        {name}: {!isExpandable && String(data)}
      </div>

      {/* Render children when expanded */}
      {/* TODO: add isExpanded back */}
      {isExpandable && (
        <div className="node-children">
          {
            type === 'array' ?
              (data as JsonValue[]).map((jsonValue, index) => (
                <JsonTreeNode
                  key={index}
                  name={`[${index}]`}
                  data={jsonValue}
                  path={`${path}[${index}]`}
                  onNodeClick={onNodeClick}
                />)) :
              Object.entries(data as Record<string, JsonValue>).map(([key, jsonValue]) => (
                <JsonTreeNode
                  key={key}
                  name={key}
                  data={jsonValue}
                  path={`${path}.${key}`}
                  onNodeClick={onNodeClick}
                />
              ))
          }
        </div>
      )}
    </div>
  );
};

export default JsonTreeNode;
