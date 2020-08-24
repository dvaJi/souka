import * as React from 'react';

interface TextBlockProps {
  text: string;
}

export const TextBlock = ({ text }: TextBlockProps) => {
  return (
    <div>
      <div id="oriText0" className="source_txt">
        {text}
      </div>
      <div className="wrt_bx">
        <label htmlFor="transEditorText" className="blind">
          번역할 내용 입력
        </label>

        <textarea
          id="textarea0"
          style={{ overflow: 'auto' }}
          className="input_tx"
          rows={1}
          cols={1}
          maxLength={1001}
          title=""
        >
          ¡SÍ!
        </textarea>

        <div className="sub_btn">
          <a href="#" className="lnk_cncl" title="Cancel">
            Cancel
          </a>
          <span className="bar"></span>
          <a href="#" className="lnk_save" title="Save">
            Save
          </a>
        </div>
      </div>
      <div className="wrt_other">
        <span className="dsc sentence_noti" style={{ display: 'none' }}></span>
        <div className="other_translation" id="other2041448" data-sentence-no="2041448">
          <a href="#" className="lnk_other">
            View other translations <em>3</em>
          </a>
          <ul className="other_lst"></ul>
        </div>
      </div>
    </div>
  );
};
