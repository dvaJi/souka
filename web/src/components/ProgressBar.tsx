import * as React from 'react';
import tw, { styled } from 'twin.macro';

const Bar = styled.div(() => [tw`inline-block`]);
const BarValue = styled.div(() => [tw`w-full relative top-0 left-0`]);
const ProgressText = styled.em(() => [tw`inline-block relative text-black text-right`]);

export const ProgressBar = () => {
  return (
    <div className="progress_area ">
      <Bar
        className=""
        style={{
          width: 387,
          height: 5,
          borderRadius: 15,
          background: '#b7bdbf',
          zoom: 1,
        }}
      >
        <BarValue
          style={{
            height: 5,
            borderRadius: 15,
            background: '#00d564',
            width: '90%',
          }}
        ></BarValue>
      </Bar>
      <ProgressText
        style={{
          top: 3,
          width: 49,
        }}
      >
        90%
      </ProgressText>

      <div className="contributors_area text-black" style={{ marginBottom: 7 }}>
        <strong
          className="tit align-top"
          style={{ marginRight: 5, fontWeight: 'normal', fontSize: 16, lineHeight: '16px' }}
        >
          Contributors
        </strong>
        <a
          href="/translate/contributor?webtoonNo=151&amp;episodeNo=285&amp;language=SPA&amp;teamVersion=0"
          className="txt inline-block align-top"
          style={{
            color: '#747474',
            lineHeight: '18px',
          }}
        >
          <span className="name block">
            dva ( <em className="num">46</em>)&nbsp;&nbsp;and{' '}
            <span className="more">
              <em className="num">8</em> more
              <span className="ico_more"></span>
            </span>
          </span>
        </a>
      </div>
    </div>
  );
};
