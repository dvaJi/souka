import * as React from 'react';
import tw, { styled } from 'twin.macro';
import useHyphen from 'react-use-hyphen';

interface TextLayerProps {
  textLayers: any;
}

const Text = styled.span(() => [tw`absolute`]);

export const TextLayers = ({ textLayers }: TextLayerProps) => {
  const { Hyphen } = useHyphen();
  return (
    <>
      {textLayers.map(({ text, styles }: any, i: number) => (
        <Hyphen>
          <Text
            key={text + i}
            className="overflow-hidden text-black"
            style={{
              ...styles,
            }}
          >
            {text}
          </Text>
        </Hyphen>
      ))}
    </>
  );
};
