import React from 'react';
import cx from 'classnames';

const FinStatementsForm = () => (
  <div className={cx('block_item-out')}>
    <div className={cx('block_item row align-items-stretch')}>
      <div className={cx('block_head col-12')}>
        Название
      </div>
      <div className={cx('col-6 col-md-3')}>
        <label>
          За какой год баланс
        </label>
        <div className={cx('select')}>
          <div className={cx('jq-selectbox jqselect')}>
            <select>
              <option>пункт 1</option>
              <option>пункт 2</option>
              <option>пункт 3</option>
              <option>пункт 4</option>
              <option>пункт 5</option>
              <option>пункт 6</option>
              <option>пункт 7</option>
            </select>
            <div className={cx('jq-selectbox__select')}>
              <div className={cx('jq-selectbox__select-text')}>пункт 1</div>
              <div className={cx('jq-selectbox__trigger')}>
                <div className={cx('jq-selectbox__trigger-arrow')}/>
              </div>
            </div>
            <div className={cx('jq-selectbox__dropdown')} style={{left: '0px', display: 'none'}}>
              <ul>
                <li className={cx('selected sel')}>пункт 1</li>
                <li>пункт 2</li>
                <li>пункт 3</li>
                <li>пункт 4</li>
                <li>пункт 5</li>
                <li>пункт 6</li>
                <li>пункт 7</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('col-6 col-md-3')}>
        <label>
          Форма отчёта
        </label>
        <div className={cx('filter-dropdown')}>
          <div className={cx('filter-dropdown__title')}/>
          <div className={cx('filter-dropdown__list')}>
            <input type="hidden"/>
            <ul>
              <li>Lorem ipsum 1</li>
              <li>Lorem ipsum 2</li>
              <li>Lorem ipsum 3</li>
              <li>Lorem ipsum 4</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cx('col-6 col-md-3')}>
        <label>
          Последний квартал
        </label>
        <div className={cx('filter-dropdown')}>
          <div className={cx('filter-dropdown__title')}/>
          <div className={cx('filter-dropdown__list')}>
            <input type="hidden"/>
            <ul>
              <li>Lorem ipsum 1</li>
              <li>Lorem ipsum 2</li>
              <li>Lorem ipsum 3</li>
              <li>Lorem ipsum 4</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cx('col-6 col-md-3')}/>
      <div className={cx('col-6 col-md-3')}>
        <label>
          Форма налогооблажения
        </label>
        <div className={cx('filter-dropdown')}>
          <div className={cx('filter-dropdown__title')}/>
          <div className={cx('filter-dropdown__list')}>
            <input type="hidden"/>
            <ul>
              <li>Lorem ipsum 1</li>
              <li>Lorem ipsum 2</li>
              <li>Lorem ipsum 3</li>
              <li>Lorem ipsum 4</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cx('col-6 col-md-3')}>
        <label>Объект налогооблажения</label>
        <div className={cx('filter-dropdown')}>
          <div className={cx('filter-dropdown__title')}/>
          <div className={cx('filter-dropdown__list')}>
            <input type="hidden"/>
            <ul>
              <li>Lorem ipsum 1</li>
              <li>Lorem ipsum 2</li>
              <li>Lorem ipsum 3</li>
              <li>Lorem ipsum 4</li>
            </ul>
          </div>
        </div>
      </div>

      <hr/>

      <div className={cx('block_header col-12')}>Актив</div>

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
  </div>
);

export default FinStatementsForm;
