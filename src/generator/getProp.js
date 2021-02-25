/* eslint-disable sort-keys */

// function to find
// match props recursively
const getProp = ({ list, key, units }) => {
  // breaks if there's
  // no key provided
  // it's the only
  // required arg
  if (!key) {
    return null;
  }

  // if the key is a number,
  // just returns it back,
  // with the units, if
  // there's one
  if (typeof key === 'number') {
    return `${key}${units && typeof +key === 'number' ? units : ''}`;
  }

  // splits key into
  // arr of keys if any
  // dot separator.
  const keys = key.split('.');

  // check if it's an iterateble
  // prop testing if the array
  // have more than 1 value
  const shouldIterate = keys.length > 1;

  // first, try to fetch value
  // using the keys[0]
  // from the list (if exists)
  const val = !!list && list[keys] ? list[keys[0]] : undefined;

  // if there's a value and should not
  // iterate, returns it.
  //
  // checking only if val is not undefined
  // because we want 0 to pass it too
  if (val !== undefined && !shouldIterate) {
    // check if there's any passed units
    // and if the value is a number. If
    // it is, apply the units
    return `${val}${units && typeof +val === 'number' ? units : ''}`;
  }

  // if val is undefined and if should
  // not iterate, just returns the
  // key as it was received
  if (!shouldIterate) {
    return key;
    // else
    // just iterates all over again
  }

  return getProp({
    // passes the same list
    list: list[keys[0]],

    // removes the first key and
    // passes the rest to the next
    // iteration as a dot string again
    key: keys.slice(1).join('.'),

    // passes the same units
    units
  });
};

export default getProp;
