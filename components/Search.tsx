import React from 'react';
import { useDebounce } from '@utils/hooks';
import { Scrollbars } from 'react-custom-scrollbars';
import Dropdown from './Dropdown';
import useSWRImmutable from 'swr/immutable';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Alert, Spinner } from 'flowbite-react';

type SearchProps = {
  loadItems: (text: string) => Promise<any[]>;
  renderItem: (item: any) => JSX.Element;
};

const Search: React.FC<SearchProps> = ({ loadItems, renderItem }) => {
  const [text, setText] = React.useState<string>('');

  const [isOpenDropdown, setOpenDropdown] = React.useState(false);

  const debouncedText = useDebounce(text, 800);

  const { data: items, error } = useSWRImmutable(text ? `items:${debouncedText}` : null, () => loadItems(debouncedText));

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
      <div className="relative">
        <div className="flex absolute inset-y-0 left-3 items-center pointer-events-none w-6 text-gray-500">
          <MagnifyingGlassIcon />
        </div>
        {text && !items && (
          <div className="flex absolute inset-y-0 right-1 items-center pointer-events-none w-8 text-gray-500">
            <Spinner />
          </div>
        )}
        <input //
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-10 p-2.5"
          placeholder="Search"
          required
          value={text}
          onChange={e => setText(e.target.value)}
          onFocus={() => setOpenDropdown(true)}
          autoComplete="off"
        />
      </div>

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

      {error && (
        <div className="mt-2 mb-5">
          <Alert color="failure" withBorderAccent>
            {error.message}
          </Alert>
        </div>
      )}
    </form>
  );
};

export default Search;
