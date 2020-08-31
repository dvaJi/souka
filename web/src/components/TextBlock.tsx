import * as React from 'react';
import tw, { styled } from 'twin.macro';

interface TextBlockProps {
  text: string;
}

const TextBlockWrapper = styled.div(() => [tw`relative border-gray-500 border-b-2 pt-6 pb-3`]);
const OriginalText = styled.div(() => [tw`text-black leading-4 mb-3`]);
const WorkBox = styled.div(() => [tw`relative w-4/5 min-h-full mb-3 p-3 bg-gray-300`]);
const WorkBoxLabel = styled.label(() => [tw`overflow-hidden absolute align-middle`]);
const WorkBoxTextarea = styled.textarea(() => [
  tw`overflow-auto block w-full bg-gray-300 text-gray-600 leading-4 break-all text-base min-h-50`,
]);

export const TextBlock = ({ text }: TextBlockProps) => {
  return (
    <TextBlockWrapper>
      <OriginalText>{text}</OriginalText>
      <WorkBox>
        <WorkBoxLabel
          htmlFor="transEditorText"
          style={{
            clip: 'rect(0 0 0 0)',
            width: 1,
            height: 1,
            margin: -1,
          }}
        >
          번역할 내용 입력
        </WorkBoxLabel>

        <WorkBoxTextarea rows={1} cols={1} maxLength={1001} title="">
          ¡SÍ!
        </WorkBoxTextarea>

        <div className="sub_btn absolute right-0 text-sm" style={{ bottom: -25 }}>
          <a href="#" className="lnk_cncl" title="Cancel">
            Cancel
          </a>
          <span className="bar"></span>
          <a href="#" className="lnk_save" title="Save">
            Save
          </a>
        </div>
      </WorkBox>
      <div className="wrt_other">
        <span className="dsc sentence_noti hidden"></span>
        <div className="other_translation">
          <a href="#" className="lnk_other">
            View other translations <em>3</em>
          </a>
          <ul className="other_lst"></ul>
        </div>
      </div>
    </TextBlockWrapper>
  );
};
