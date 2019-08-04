export interface Label {
  id: number;
  text: string;
  type: string;
  filename: string;
  startCoordinates: {
    x: number;
    y: number;
  };
  endCoordinates: {
    x: number;
    y: number;
  };
  image: {
    startCoordinates: {
      x: number;
      y: number;
    };
    endCoordinates: {
      x: number;
      y: number;
    };
  };
}
