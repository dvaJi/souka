import * as React from 'react';
import tw, { css, styled, theme } from 'twin.macro';

import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatColorText,
  MdBorderColor,
  MdUnfoldLess,
  MdUnfoldMore,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
} from 'react-icons/md';

const AVAILABLE_FONTS = [
  'Web Font',
  'Noto Sans',
  'Noto Serif',
  'Anime Ace 2.0 BB',
  'Nanum Pen',
  'Comic Sans MS',
];

const FONT_SIZES = Array.from(Array(200), (_, i) => i + 1);

const ToolMenuButton = styled.button(({ isSmall }: any) => [
  // The common button styles added with the tw import
  tw`inline-block px-1 cursor-pointer border border-gray-300`,

  tw`hover:text-gray-700`,

  // Conditional props can be added
  isSmall ? tw`text-sm` : tw`text-lg`,
]);

export const EditorToolbox = () => {
  return (
    <div className="w-full text-gray-900 bg-white">
      <div id="font-type" className="inline-block">
        <div id="font-name" className="inline-block">
          <select className="inline-block border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
            <option>Choose a font</option>
            {AVAILABLE_FONTS.map((font) => (
              <option>{font}</option>
            ))}
          </select>
        </div>
        <div id="font-size" className="inline-block">
          <select className="inline-block border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
            <option>Choose a size</option>
            {FONT_SIZES.map((size) => (
              <option>{size}</option>
            ))}
          </select>
        </div>
      </div>
      <div id="font-style" className="inline-block">
        <ToolMenuButton id="font-bold">
          <MdFormatBold className="inline-block" />
        </ToolMenuButton>
        <ToolMenuButton id="font-italic">
          <MdFormatItalic className="inline-block" />
        </ToolMenuButton>
        <ToolMenuButton id="font-color">
          <MdFormatColorText className="inline-block" />
        </ToolMenuButton>
        <ToolMenuButton id="font-stroke-color">
          <MdBorderColor className="inline-block" />
        </ToolMenuButton>
        <ToolMenuButton id="font-increase-stroke">
          <MdUnfoldMore className="inline-block" />
        </ToolMenuButton>
        <ToolMenuButton id="font-decrease-stroke">
          <MdUnfoldLess className="inline-block" />
        </ToolMenuButton>
      </div>
      <div id="font-align" className="inline-block">
        <ToolMenuButton id="font-align-left">
          <MdFormatAlignLeft className="inline-block" />
        </ToolMenuButton>
        <ToolMenuButton id="font-align-center">
          <MdFormatAlignCenter className="inline-block" />
        </ToolMenuButton>
        <ToolMenuButton id="font-align-right">
          <MdFormatAlignRight className="inline-block" />
        </ToolMenuButton>
      </div>
    </div>
  );
};
