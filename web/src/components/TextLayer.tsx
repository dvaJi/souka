import * as React from 'react';
import tw, { styled } from 'twin.macro';

interface TextLayerProps {
  textLayers: any;
}

const Text = styled.span(() => [tw`absolute`]);

export const TextLayers = ({ textLayers }: TextLayerProps) => {
  console.log(textLayers);
  return (
    <>
      {textLayers.map(({ text, styles }: any, i: number) => (
        <Text
          key={text + i}
          className="overflow-hidden text-black"
          style={{
            ...styles,
          }}
        >
          {text}
        </Text>
      ))}
    </>
  );
};
