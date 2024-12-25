import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LANGTH = 'langth';

interface Filter<T> {
  sortField: keyof T | '';
  reversed: boolean;
}

function gooods<T>(
  items: string[],
  { sortField, reversed }: Filter<T>,
): string[] {
  let goods = [...items];

  if (sortField) {
    goods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);
        case SORT_FIELD_LANGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    goods = goods.reverse();
  }

  return goods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const sortGoods: string[] = gooods(goodsFromServer, {
    sortField,
    reversed,
  });

  const reset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_NAME)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LANGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LANGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {sortGoods.toString() !== goodsFromServer.toString() && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul className="GoodList">
        {sortGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
