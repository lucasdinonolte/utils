import { useEffect, useMemo, useState } from 'react';

const serializer = {
  string: {
    encode: (value) => value,
    decode: (value) => value,
  },
  number: {
    encode: (value) => value.toString(),
    decode: (value) => parseFloat(value),
  },
  boolean: {
    encode: (value) => value.toString(),
    decode: (value) => value === 'true',
  },
  object: {
    encode: (value) => JSON.stringify(value),
    decode: (value) => JSON.parse(value),
  },
};

const supportedTypes = Object.keys(serializer);

const getValue = (search, param, type) => {
  const { decode } = serializer[type];
  return decode(new URLSearchParams(search).get(param));
};

const setValue = (param, newValue, type) => {
  const { encode } = serializer[type];
  const search = new URLSearchParams(window.location.search);
  search.set(param, encode(newValue));

  window.history.pushState(null, null, `?${search.toString()}`);
  window.dispatchEvent(new Event('pushstate'));
};

const useParamState = (name, initialValue) => {
  const type = useMemo(() => {
    const type = typeof initialValue;

    if (!supportedTypes.includes(type)) {
      throw new Error(
        `Unsupported type ${type} passed to useParamState. Supported types are ${supportedTypes.join(
          ', '
        )}`
      );
    }

    return type;
  }, [initialValue]);
  const [state, setState] = useState(
    getValue(window.location.search, name, type) || initialValue
  );

  const set = (newValue) => {
    setValue(name, newValue, type);
  };

  useEffect(() => {
    const onChange = () => {
      setState(getValue(window.location.search, name, type));
    };

    window.addEventListener('popstate', onChange);
    window.addEventListener('pushstate', onChange);
    window.addEventListener('replacestate', onChange);

    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('pushstate', onChange);
      window.removeEventListener('replacestate', onChange);
    };
  }, [name, type]);

  return [state, set];
};

export default useParamState;
