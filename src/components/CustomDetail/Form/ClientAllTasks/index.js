import React from 'react';
import cx from 'classnames';

import CustomDetailMenu from "../../Menu";
import CustomDetailHeader from "../../Header";

const sections = [{
  title: 'Принципал',
  items: [
    {
      slug: 'financial-statements',
      name: 'Бух отчётность'
    },
    {
      slug: 'direction',
      name: 'Адреса',
      readonly: true
    },
    {
      slug: 'account-information',
      name: 'Сведения о счетах',
      readonly: true
    },
    {
      slug: 'management-structure',
      name: 'Структура органов управления',
      readonly: true
    },
    {
      slug: 'physical-person',
      name: 'Физлица',
      readonly: true
    }
  ]
}];

const headerProps = {
  principalDisplayName: 'ЗАО "РОСТА"',
  principalInn: '7723538234',
  principalKpp: '772301001',
  principalOgrn: '1057746795864',
  orderNumber: 'ЭБГ-00199/19'
};

const ClientAllTasksForm = () => (
  <div className={cx('task-form')}>
    <div className={cx('container p-0')}>
      <div className={cx('row no-gutters flex-nowrap')}>
        <CustomDetailMenu
          title="Заявки"
          sections={sections}
        />
        <form className={cx('task-form__wrap')}>
          <div className={cx('block block--readonly')}>
            <div className={cx('container')}>
              <CustomDetailHeader
                section="Принципал"
                title="Все заявки"
                name={headerProps.principalDisplayName}
                inn={headerProps.principalInn}
                kpp={headerProps.principalKpp}
                ogrn={headerProps.principalOgrn}
                withoutHr
              />
              <div className="table__title">Действующие БГ клиента</div>
              <table>
                <thead>
                <tr>
                  <td>Признак учета</td>
                  <td>№ заявки</td>
                  <td>ИНН</td>
                  <td>РНТ</td>
                  <td>Тип заявки</td>
                  <td>Сумма</td>
                  <td>ПЦК</td>
                  <td>Дата нач./окон.</td>
                  <td>Андеррайтер</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>-</td>
                  <td>24124</td>
                  <td>И12124НН</td>
                  <td>12412414</td>
                  <td>Банковская гарантия</td>
                  <td>3 000 000 Р</td>
                  <td>01.05.2019 - 01.05.2020</td>
                  <td>Дата нач./окон.</td>
                  <td>ООО “Василек”</td>
                </tr>
                </tbody>
              </table>
              <div className="table__title">Действующие БГ клиента</div>
              <table>
                <thead>
                <tr>
                  <td>Признак учета</td>
                  <td>№ заявки</td>
                  <td>ИНН</td>
                  <td>РНТ</td>
                  <td>Тип заявки</td>
                  <td>Сумма</td>
                  <td>ПЦК</td>
                  <td>Дата нач./ окон.</td>
                  <td>Андеррайтер</td>
                  <td>принятие решения</td>
                  <td>Статус</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>-</td>
                  <td>24124</td>
                  <td>И12124НН</td>
                  <td>12412414</td>
                  <td>Банковская гарантия</td>
                  <td>3 000 000 Р</td>
                  <td>01.05.2019 - 01.05.2020</td>
                  <td>Дата нач./окон.</td>
                  <td>ООО “Василек”</td>
                  <td>ООО “Василек”</td>
                  <td>
                    <div className="table__status">
                      123
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <div className="table__title">Действующие БГ клиента</div>
              <table className="no-margin">
                <thead>
                <tr>
                  <td>Признак учета</td>
                  <td>№ заявки</td>
                  <td>ИНН</td>
                  <td>РНТ</td>
                  <td>Тип заявки</td>
                  <td>Сумма</td>
                  <td>ПЦК</td>
                  <td>Дата нач./ окон.</td>
                  <td>Андеррайтер</td>
                  <td>принятие решения</td>
                  <td>Статус</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>-</td>
                  <td>24124</td>
                  <td>И12124НН</td>
                  <td>12412414</td>
                  <td>Банковская гарантия</td>
                  <td>3 000 000 Р</td>
                  <td>01.05.2019 - 01.05.2020</td>
                  <td>Дата нач./окон.</td>
                  <td>ООО “Василек”</td>
                  <td>ООО “Василек”</td>
                  <td>
                    <div className="table__status">
                      123
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>-</td>
                  <td>24124</td>
                  <td>И12124НН</td>
                  <td>12412414</td>
                  <td>Банковская гарантия</td>
                  <td>3 000 000 Р</td>
                  <td>01.05.2019 - 01.05.2020</td>
                  <td>Дата нач./окон.</td>
                  <td>ООО “Василек”</td>
                  <td>ООО “Василек”</td>
                  <td>
                    <div className="table__status">
                      123
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>-</td>
                  <td>24124</td>
                  <td>И12124НН</td>
                  <td>12412414</td>
                  <td>Банковская гарантия</td>
                  <td>3 000 000 Р</td>
                  <td>01.05.2019 - 01.05.2020</td>
                  <td>Дата нач./окон.</td>
                  <td>ООО “Василек”</td>
                  <td>ООО “Василек”</td>
                  <td>
                    <div className="table__status">
                      123
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>-</td>
                  <td>24124</td>
                  <td>И12124НН</td>
                  <td>12412414</td>
                  <td>Банковская гарантия</td>
                  <td>3 000 000 Р</td>
                  <td>01.05.2019 - 01.05.2020</td>
                  <td>Дата нач./окон.</td>
                  <td>ООО “Василек”</td>
                  <td>ООО “Василек”</td>
                  <td>
                    <div className="table__status">
                      123
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <div className="btn-all">Посмотреть все</div>
              <table>
                <thead>
                <tr>
                  <td>Признак учета</td>
                  <td>№ заявки</td>
                  <td>ИНН</td>
                  <td>РНТ</td>
                  <td>Тип заявки</td>
                  <td>Сумма</td>
                  <td>ПЦК</td>
                  <td>Дата нач./ окон.</td>
                  <td>Андеррайтер</td>
                  <td>принятие решения</td>
                  <td>Статус</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>-</td>
                  <td>24124</td>
                  <td>И12124НН</td>
                  <td>12412414</td>
                  <td>Банковская гарантия</td>
                  <td>3 000 000 Р</td>
                  <td>01.05.2019 - 01.05.2020</td>
                  <td>Дата нач./окон.</td>
                  <td>ООО “Василек”</td>
                  <td>ООО “Василек”</td>
                  <td>
                    <div className="table__status">
                      123
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <table>
                <thead>
                <tr>
                  <td>Номер заявки</td>
                  <td>Ежемесячная нагрузка (тыс.руб.)</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>112131</td>
                  <td>3 000 000 Р</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default ClientAllTasksForm;
