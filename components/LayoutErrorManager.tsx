import React from 'react';
import { Alert } from 'flowbite-react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

type LayoutErrorManager = {
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const LayoutErrorManagerContext = React.createContext<LayoutErrorManager>({ setError: () => {} });

export const ProvideLayoutErrorManager = ({ children }: { children: JSX.Element }) => {
  const [error, setError] = React.useState<string>();
  const context = { setError };
  return (
    <LayoutErrorManagerContext.Provider value={context}>
      {error && (
        <Alert //
          onDismiss={() => setError(undefined)}
          icon={InformationCircleIcon}
          color="failure"
          rounded={false}
          withBorderAccent>
          {error}
        </Alert>
      )}
      {children}
    </LayoutErrorManagerContext.Provider>
  );
};

export const useLayoutErrorManager = () => React.useContext(LayoutErrorManagerContext);
