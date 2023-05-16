import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@model/db';
import CodeMirror from '@uiw/react-codemirror';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';

const router = 'test1';
export default function Test1() {
  const dataBaseItem = useLiveQuery(() => db.markups.where('id').equals(router).toArray());
  const [htmlState, setHtmlState] = useState('');
  const [cssState, setCssState] = useState('');
  useEffect(() => {
    setHtmlState(dataBaseItem?.at(0)?.htmlState);
    setCssState(dataBaseItem?.at(0)?.cssState);
  }, [dataBaseItem]);

  const updateHtmlState = async (view) => {
    try {
      await db.markups.put({ id: router, htmlState: view, cssState }, router);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCssState = async (view) => {
    try {
      await db.markups.put({ id: router, htmlState, cssState: view }, router);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CodeMirror value={htmlState} theme={okaidia} width="380px" height="380px" extensions={[html({ autoCloseTags: true })]} onChange={updateHtmlState} />
      <CodeMirror value={cssState} theme={okaidia} width="380px" height="380px" extensions={[css()]} onChange={updateCssState} />
    </div>
  );
}
