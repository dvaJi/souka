export interface Label {
  id: number;
  text: string;
  type: string;
  filename: string;
  x: number;
  y: number;
  image: {
    x: number;
    y: number;
  };
}
