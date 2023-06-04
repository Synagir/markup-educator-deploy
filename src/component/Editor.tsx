import React, { Dispatch, SetStateAction } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import wrapDebounce from '@lib/utils';

const LANG_MAP = {
  html: [html({ autoCloseTags: true })],
  css: [css()],
};

export default function Editor({ lang, initialString, setState }: { lang: string; initialString: string; setState: Dispatch<SetStateAction<string>> }) {
  return <CodeMirror value={initialString} theme={okaidia} width="100%" height="380px" extensions={LANG_MAP[lang]} onChange={wrapDebounce(setState, 1000)} />;
}

