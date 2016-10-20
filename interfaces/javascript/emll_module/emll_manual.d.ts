import {CoordinateList, DataVector, Feature, InputFeature, Model} from "./emll";

export class NodeIterator {
  IsValid(): Boolean;
  Next();
  Get(): Node;
}

export class ModelGraph {
  //	GetNode(Node::NodeId id):Node;
  Size(): number;

  GetNodeIterator(): NodeIterator;
  GetNodeIterator(outputNode: Node): NodeIterator;

  GetNodeOutputDouble(outputPort: OutputPortBase): DoubleVector;

  //	GetNodeIterator(const std::vector<const Node*>& outputNodes):
  // NodeIterator;;
}

export class TransformContext {}

export class ModelTransformer {
  constructor(context: TransformContext);
  CopyModel(model: ModelGraph): ModelGraph;
  RefineModel(model: ModelGraph): ModelGraph;
}

export class Node {
  GetId(): UniqueId;
  GetInputPorts(): InputPortVector;
  GetOutputPorts(): OutputPortVector;
  GetParentNodes(): ConstNodeVector;
  GetDependentNodes(): ConstNodeVector;
  GetRuntimeTypeName(): string;

  AsDoubleInputNode(): DoubleInputNode;
  AsDoubleOutputNode(): DoubleOutputNode;
}

export class DoubleInputNode extends Node {
}

export class DoubleOutputNode extends Node {
}

export enum PortType {
  None = 0,
  Real,
  Integer,
  Categorical,
  Boolean
}

export class Port {
  GetNode(): Node;
  Size(): number;
  GetType(): PortType;
  GetName(): String;
}

export class InputPortBase extends Port {
  GetOutputPortElements: OutputPortElementVector;
  GetParentNodes(): ConstNodeVector;
}

export class OutputPortBase extends Port {}

export class OutputPortElement {
  GetIndex(): number;
  ReferencedPort(): OutputPortBase;
}

// template collections
// export class DoubleVector {
//   size(): number;
//   get(index: number): number;
// }

export class NodeVector {
  size(): number;
  get(index: number): Node;
}

export class ConstNodeVector {
  size(): number;
  get(index: number): Node;
}

export class InputPortVector {
  size(): number;
  get(index: number): InputPortBase;
}

export class OutputPortVector {
  size(): number;
  get(index: number): OutputPortBase;
}

export class OutputPortElementVector {
  size(): number;
  get(index: number): OutputPortElement;
}

//
// nodes
//
export class MeanNode extends Node { constructor(); }

//
// misc
//
export function LoadModelGraph(filename: string): ModelGraph;
export class UniqueId {}
export class Variant {}