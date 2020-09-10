import * as React from 'react';
import tw, { styled } from 'twin.macro';
import { TextLayers } from './TextLayer';

interface ImageViewProps {
  image: any;
}

const generateStroke = (effects: any) => {
  if (effects && effects.stroke) {
    const rgba = `rgba(${effects.stroke.color.r},${effects?.stroke.color.g},${effects?.stroke.color.b},${effects?.stroke.opacity})`;
    const w = effects.stroke.size.value;
    let values = '';

    for (var angle = 0; angle < 2 * Math.PI; angle += 1 / w) {
      if (values !== '') {
        values += ',';
      }

      values += `${Math.cos(angle) * w}px ${Math.sin(angle) * w}px 0 ${rgba}`;
    }

    return values;
  }

  return 'initial';
};

const ImageWrapper = styled.div(() => [tw`relative`]);

export const ImageView = ({ image }: ImageViewProps) => {
  const [textLayers, setTextLayers] = React.useState([]);
  const imgRef = React.useRef<HTMLImageElement>(null);

  console.log(image);

  const handleImageLoad = (event: any) => {
    console.log(image.textLayers);
    // Do whatever you want here
    const h = event.target.clientHeight / image.height;
    const w = event.target.clientWidth / image.width;
    console.log(h, w);
    setTextLayers(
      image.textLayers.map((tl: any) => ({
        text: tl.text.text,
        styles: {
          top: tl.top * h,
          left: tl.left * w,
          opacity: tl.opacity,
          maxWidth: tl.text.boxBounds[2] * w,
          maxHeight: tl.text.boxBounds[3] * h,
          fontSize: tl.text.style.fontSize,
          fontFamily: tl.text.style.font.name,
          textAlign: tl.text.paragraphStyle.justification,
          transform: `scale(1, ${tl.text.style.verticalScale})`,
          textTransform: tl.text.style.fontCaps ? 'uppercase' : 'normal',
          lineHeight: tl.text.style.leading ? `${tl.text.style.leading}px` : 'normal',
          textShadow: generateStroke(tl.effects),
        },
      }))
    );
  };

  return (
    <ImageWrapper>
      <TextLayers textLayers={textLayers} />
      <img ref={imgRef} src={image.path} alt={image.filename} onLoad={handleImageLoad} />
    </ImageWrapper>
  );
};
