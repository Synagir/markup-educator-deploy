import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@model/db';
import Editor from '@component/Editor';

const router = 'test1';

export default function Test1() {
  const dataBaseItem = useLiveQuery(() => db.markups.where('id').equals(router).toArray())?.shift();
  const [htmlState, setHtmlState] = useState('');
  const [cssState, setCssState] = useState('');

  const addState = async () => {
    try {
      await db.markups.add({ id: router, htmlState, cssState }, router);
    } catch (error) {
      console.error(error);
    }
  };

  const updateState = async (view, viewUpdate) => {
    try {
      const existedData = (await db.markups.where('id').equals(router).toArray()).length;
      if (!existedData) addState();

      const stateType = viewUpdate.view.contentAttrs['data-language'];

      if (stateType === 'html') {
        await db.markups.update(router, { htmlState: view });
      } else if (stateType === 'css') {
        await db.markups.update(router, { cssState: view });
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (dataBaseItem) {
      setHtmlState(dataBaseItem?.htmlState);
      setCssState(dataBaseItem?.cssState);
    }
  }, [dataBaseItem]);

  return (
    <div>
      <Editor lang="html" initialString={htmlState} setState={updateState} />
      <Editor lang="html" initialString={htmlState} setState={updateState} />
    </div>
  );
}
