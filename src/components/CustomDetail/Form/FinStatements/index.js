import React from 'react';
import cx from 'classnames';

import Dropdown from '../../../Dropdown';

const FinStatementsForm = () => (
  <div className={cx('block_item row align-items-stretch')}>
    <div className={cx('block_head col-12')}>
      Название
    </div>
    <div className={cx('col-6 col-md-3')}>
      <label>
        За какой год баланс
      </label>
      <Dropdown
        toggleClassName={cx('task-dropdown')}
        name="whatYear"
        list={[
          {
            id: '1',
            name: 'Пункт 1'
          },
          {
            id: '2',
            name: 'Пункт 2'
          },
          {
            id: '3',
            name: 'Пункт 3'
          },
          {
            id: '4',
            name: 'Пункт 4'
          },
        ]}
        onSelectItem={(...rest) => console.log(rest)}
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <label>
        Форма отчёта
      </label>
      <Dropdown
        toggleClassName={cx('task-dropdown')}
        name="formType"
        list={[
          {
            id: '1',
            name: 'Пункт 1'
          },
          {
            id: '2',
            name: 'Пункт 2'
          },
          {
            id: '3',
            name: 'Пункт 3'
          },
          {
            id: '4',
            name: 'Пункт 4'
          },
        ]}
        onSelectItem={(...rest) => console.log(rest)}
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <label>
        Последний квартал
      </label>
      <Dropdown
        toggleClassName={cx('task-dropdown')}
        name="lastSection"
        list={[
          {
            id: '1',
            name: 'Пункт 1'
          },
          {
            id: '2',
            name: 'Пункт 2'
          },
          {
            id: '3',
            name: 'Пункт 3'
          },
          {
            id: '4',
            name: 'Пункт 4'
          },
        ]}
        onSelectItem={(...rest) => console.log(rest)}
      />
    </div>
    <div className={cx('col-6 col-md-3')} />
    <div className={cx('col-6 col-md-3')}>
      <label>
        Форма налогооблажения
      </label>
      <Dropdown
        toggleClassName={cx('task-dropdown')}
        name="taxForm"
        list={[
          {
            id: '1',
            name: 'Пункт 1'
          },
          {
            id: '2',
            name: 'Пункт 2'
          },
          {
            id: '3',
            name: 'Пункт 3'
          },
          {
            id: '4',
            name: 'Пункт 4'
          },
        ]}
        onSelectItem={(...rest) => console.log(rest)}
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <label>
        Объект налогооблажения
      </label>
      <Dropdown
        toggleClassName={cx('task-dropdown')}
        name="taxObject"
        list={[
          {
            id: '1',
            name: 'Пункт 1'
          },
          {
            id: '2',
            name: 'Пункт 2'
          },
          {
            id: '3',
            name: 'Пункт 3'
          },
          {
            id: '4',
            name: 'Пункт 4'
          },
        ]}
        onSelectItem={(...rest) => console.log(rest)}
      />
    </div>

    <hr/>

    <div className={cx('task-header__title col-12')}>Актив</div>

    <div className={cx('block_head col-12')}>
      Внеоборотные активы
    </div>

    <table>
      <thead>
        <tr>
          <td/>
          <td>
            Код
          </td>
          <td>
            2 кв. 2016
          </td>
          <td>
            3 кв. 2016
          </td>
          <td>
            4 кв. 2016
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Нематериальные активы
          </td>
          <td>
            1110
          </td>
          <td>
            <input type="text"/>
          </td>
          <td>
            <input type="text"/>
          </td>
          <td>
            <input type="text"/>
          </td>
        </tr>
        <tr>
          <td>
            Результаты исследований и разработок
          </td>
          <td>
            1110
          </td>
          <td>
            <input type="text"/>
          </td>
          <td>
            <input type="text"/>
          </td>
          <td>
            <input type="text"/>
          </td>
        </tr>
        <tr>
          <td>
            Нематериальные поисковые активы
          </td>
          <td>
            1110
          </td>
          <td>
            <input type="text"/>
          </td>
          <td>
            <input type="text"/>
          </td>
          <td>
            <input type="text"/>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            Итого по разделу
          </td>
          <td>
            1110
          </td>
          <td/>
          <td/>
          <td/>
        </tr>
      </tfoot>
    </table>
  </div>
);

export default FinStatementsForm;
