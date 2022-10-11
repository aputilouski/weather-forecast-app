import React from 'react';
import { useDebounce } from '@utils/hooks';
import { Scrollbars } from 'react-custom-scrollbars';
import Dropdown from './Dropdown';
import useSWRImmutable from 'swr/immutable';
// import { Dropdown} from 'flowbite-react';

type SearchProps = {
  loadItems: (text: string) => Promise<any[]>;
  renderItem: (item: any) => JSX.Element;
};

const Search: React.FC<SearchProps> = ({ loadItems, renderItem }) => {
  const [text, setText] = React.useState<string>('');

  const [isOpenDropdown, setOpenDropdown] = React.useState(false);

  const debouncedText = useDebounce(text, 800);

  const { data: items, error } = useSWRImmutable(text ? `items:${debouncedText}` : null, () => loadItems(debouncedText));
  // loading and error

  React.useEffect(() => {
    if (items?.length) setOpenDropdown(true);
  }, [items]);

  React.useEffect(() => {
    if (!text) setOpenDropdown(false);
  }, [text]);

  const onCloseByClick = React.useCallback(() => {
    setOpenDropdown(false);
    setText('');
  }, []);

  return (
    <form className="relative w-full">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        {/* <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
          </svg> */}
      </div>
      <input //
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
        placeholder="Search"
        required
        value={text}
        onChange={e => setText(e.target.value)}
        onFocus={() => setOpenDropdown(true)}
        autoComplete="off"
      />
      {!!items?.length && (
        <Dropdown open={isOpenDropdown} setOpen={setOpenDropdown}>
          <div className="bg-white rounded divide-y divide-gray-100 shadow my-1">
            <Scrollbars autoHeight>
              <ul className="py-1 text-sm text-gray-700" onClick={onCloseByClick}>
                {items.map((item, index) => (
                  <li key={index}>{renderItem(item)}</li>
                ))}
              </ul>
            </Scrollbars>
          </div>
        </Dropdown>
      )}
    </form>
  );
};

export default Search;
